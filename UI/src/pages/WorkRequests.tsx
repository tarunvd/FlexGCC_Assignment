import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { getWorkRequests } from '../api/workRequests';
import { PriorityEnum, StatusEnum, type WorkRequest } from '../models/workRequest';
import { format, parseISO } from 'date-fns';
import { FormControl, InputLabel, Select, MenuItem, TextField, type SelectChangeEvent } from '@mui/material';

export const WorkRequests = () => {
  const [workRequests, setWorkRequests] = useState<WorkRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => {
      window.clearTimeout(timer);
    };
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getWorkRequests(selectedStatus === 'All' ? undefined : Number(selectedStatus), debouncedSearch);
        setWorkRequests(response);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch work requests');
        setWorkRequests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedStatus, debouncedSearch]);

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setSelectedStatus(event.target.value);
  };

  const statusOptions = Object.entries(StatusEnum)
    .filter(([, value]) => typeof value === 'number' && value !== StatusEnum.Unknown)
    .sort(([, a], [, b]) => Number(a) - Number(b)) as [string, number][];

  if (loading) {
    return <div><h1>Work Requests</h1><p>Loading...</p></div>;
  }

  if (error) {
    return <div><h1>Work Requests</h1><p>Error: {error}</p></div>;
  }

  return (
    <>
      <h1>Work Requests</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '16px 0' }}>
        <FormControl sx={{ minWidth: 220 }}>
          <InputLabel id="status-filter-label">Status</InputLabel>
          <Select
            labelId="status-filter-label"
            value={selectedStatus}
            label="Status"
            onChange={handleStatusChange}
          >
            <MenuItem value="All">All</MenuItem>
            {statusOptions.map(([label, value]) => (
              <MenuItem key={value} value={String(value)}>{label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          sx={{ minWidth: 320 }}
        />
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Title</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Client Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Priority</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Status</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {workRequests.map((request: WorkRequest) => (
            <tr key={request.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}><Link to={`/WorkRequest/${request.id}`}>{request.title}</Link></td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{request.clientName}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{PriorityEnum[request.priority]}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{StatusEnum[request.status]}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{format(parseISO(request.dueDate), 'dd/MM/yyyy hh:mm a')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
