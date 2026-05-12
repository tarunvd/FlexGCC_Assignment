import axios from 'axios';
import type { WorkRequest } from '../models/workRequest';

const baseUrl = 'https://localhost:7144/api/work-requests';

export const getWorkRequests = async (status: number | undefined, search: string | undefined) => {
  const response = await axios.get(baseUrl, { params: { status, search } });
  return response.data as WorkRequest[];
};

export const getWorkRequestById = async (id: number) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data as WorkRequest;
};

export const createWorkRequest = async (workRequest: Omit<WorkRequest, 'id'>) => {
  const response = await axios.post(baseUrl, workRequest);
  return response.data as WorkRequest;
};

export const updateWorkRequestStatus = async (id: number, status: number) => {
  const response = await axios.patch(`${baseUrl}/${id}/status`, { status });
  return response.data as WorkRequest;
};

export const updateWorkRequestNotes = async (id: number, notes: string) => {
  const response = await axios.patch(`${baseUrl}/${id}/notes`, { notes });
  return response.data as WorkRequest;
};
