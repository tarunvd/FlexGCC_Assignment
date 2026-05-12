import { useState, useEffect } from 'react';
import { getWorkRequestById, updateWorkRequestNotes, updateWorkRequestStatus } from '../api/workRequests';
import { PriorityEnum, StatusEnum, type WorkRequest } from '../models/workRequest';
import { format, parseISO } from 'date-fns';
import { useParams } from 'react-router';
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, type SelectChangeEvent } from '@mui/material';
import { toast } from 'react-toastify';

export const WorkRequestDetails = () => {
  const { workRequestId } = useParams<{ workRequestId: string }>();
  const [workRequest, setWorkRequest] = useState<WorkRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notesInput, setNotesInput] = useState<string>('');
  const [updatingNotes, setUpdatingNotes] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getWorkRequestById(parseInt(workRequestId!));
        setWorkRequest(data);
        setNotesInput(data.notes ?? '');
        setSelectedStatus(String(data.status));
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch work request details');
        setWorkRequest(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [workRequestId]);

  const handleUpdateNotes = async () => {
    if (!workRequest) return;
    
    try {
      setUpdatingNotes(true);
      const updated = await updateWorkRequestNotes(workRequest.id, notesInput);
      setWorkRequest(updated);
      setError(null);
      toast.success('Notes updated successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update notes');
      toast.error('Failed to update notes');
    } finally {
      setUpdatingNotes(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!workRequest) return;
    
    try {
      setUpdatingStatus(true);
      const updated = await updateWorkRequestStatus(workRequest.id, Number(selectedStatus));
      setWorkRequest(updated);
      setError(null);
      toast.success('Status updated successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status');
      toast.error('Failed to update status');
      setSelectedStatus(String(workRequest.status));
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setSelectedStatus(event.target.value);
  };

  const statusOptions = Object.entries(StatusEnum)
    .filter(([, value]) => typeof value === 'number' && value !== StatusEnum.Unknown)
    .sort(([, a], [, b]) => Number(a) - Number(b)) as [string, number][];

  const formatDate = (value: string | Date | undefined | null) => {
    if (!value) {
      return '-';
    }
    const date = typeof value === 'string' ? parseISO(value) : value;
    return format(date, 'dd/MM/yyyy hh:mm a');
  };

  if (loading) {
    return <div><h1>Work Request Details</h1><p>Loading...</p></div>;
  }

  if (error) {
    return <div><h1>Work Request Details</h1><p>Error: {error}</p></div>;
  }

  if (!workRequest) {
    return <div><h1>Work Request Details</h1><p>No work request found</p></div>;
  }

  return (
    <>
      <h1>Work Request Details</h1>
      <div style={{ maxWidth: '600px', marginTop: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '12px', borderBottom: '1px solid #ddd', paddingBottom: '8px', marginBottom: '8px' }}>
          <strong>Title:</strong>
          <span>{workRequest.title}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '12px', borderBottom: '1px solid #ddd', paddingBottom: '8px', marginBottom: '8px' }}>
          <strong>Client Name:</strong>
          <span>{workRequest.clientName}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '12px', borderBottom: '1px solid #ddd', paddingBottom: '8px', marginBottom: '8px' }}>
          <strong>Description:</strong>
          <span>{workRequest.description}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '12px', borderBottom: '1px solid #ddd', paddingBottom: '8px', marginBottom: '8px' }}>
          <strong>Priority:</strong>
          <span>{PriorityEnum[workRequest.priority]}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '12px', borderBottom: '1px solid #ddd', paddingBottom: '8px', marginBottom: '8px' }}>
          <strong>Status:</strong>
          <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                value={selectedStatus}
                label="Status"
                onChange={handleStatusChange}
              >
                {statusOptions.map(([label, value]) => (
                  <MenuItem key={value} value={String(value)}>{label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              onClick={handleUpdateStatus}
              disabled={updatingStatus || selectedStatus === String(workRequest.status)}
            >
              {updatingStatus ? 'Updating...' : 'Update'}
            </Button>
          </Box>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '12px', borderBottom: '1px solid #ddd', paddingBottom: '8px', marginBottom: '8px' }}>
          <strong>Due Date:</strong>
          <span>{formatDate(workRequest.dueDate)}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '12px' }}>
          <strong>Notes:</strong>
          <Box sx={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <TextField
              multiline
              rows={3}
              value={notesInput}
              onChange={(e) => setNotesInput(e.target.value)}
              sx={{ flex: 1 }}
            />
            <Button
              variant="contained"
              onClick={handleUpdateNotes}
              disabled={updatingNotes || notesInput === workRequest.notes}
              sx={{ marginTop: '8px' }}
            >
              {updatingNotes ? 'Updating...' : 'Update'}
            </Button>
          </Box>
        </div>
      </div>
    </>
  );
};
