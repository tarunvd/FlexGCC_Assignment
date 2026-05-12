import { useState } from 'react';
import { useNavigate } from 'react-router';
import { createWorkRequest } from '../api/workRequests';
import { PriorityEnum, StatusEnum } from '../models/workRequest';
import {
  TextField,
  Button,
  Box,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from '@mui/material';
import { toast } from 'react-toastify';

export const CreateWorkRequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    clientName: '',
    description: '',
    priority: String(PriorityEnum.Medium),
    status: String(StatusEnum.New),
    dueDate: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);

  const priorityOptions = Object.entries(PriorityEnum)
    .filter(([, value]) => typeof value === 'number' && value !== PriorityEnum.Unknown)
    .sort(([, a], [, b]) => Number(a) - Number(b)) as [string, number][];

  const statusOptions = Object.entries(StatusEnum)
    .filter(([, value]) => typeof value === 'number' && value !== StatusEnum.Unknown)
    .sort(([, a], [, b]) => Number(a) - Number(b)) as [string, number][];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.clientName.trim() || !formData.description.trim() || !formData.dueDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      const workRequestData = {
        title: formData.title,
        clientName: formData.clientName,
        description: formData.description,
        priority: Number(formData.priority),
        status: Number(formData.status),
        dueDate: formData.dueDate,
        notes: formData.notes || null,
      };

      const result = await createWorkRequest(workRequestData);
      toast.success('Work request created successfully');
      navigate(`/WorkRequest/${result.id}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to create work request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <h1>Create Work Request</h1>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Client Name"
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          fullWidth
          multiline
          rows={4}
        />

        <FormControl fullWidth required>
          <InputLabel id="priority-label">Priority</InputLabel>
          <Select
            labelId="priority-label"
            name="priority"
            value={formData.priority}
            label="Priority"
            onChange={handleSelectChange}
          >
            {priorityOptions.map(([label, value]) => (
              <MenuItem key={value} value={String(value)}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth required>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            name="status"
            value={formData.status}
            label="Status"
            onChange={handleSelectChange}
          >
            {statusOptions.map(([label, value]) => (
              <MenuItem key={value} value={String(value)}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Due Date"
          name="dueDate"
          type="datetime-local"
          value={formData.dueDate}
          onChange={handleChange}
          required
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          label="Notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
        />

        <Box sx={{ display: 'flex', gap: '8px' }}>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ flex: 1 }}
          >
            {loading ? 'Creating...' : 'Create Work Request'}
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/')}
            disabled={loading}
            sx={{ flex: 1 }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
