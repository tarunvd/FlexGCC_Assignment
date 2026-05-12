export enum PriorityEnum {
  'Unknown' = 0,
  'Low' = 1,
  'Medium' = 2,
  'High' = 3
}

export enum StatusEnum {
  'Unknown' = 0,
  'New' = 10,
  'In Progress' = 20,
  'Blocked' = 30,
  'Completed' = 40
}

export interface WorkRequest {
  id: number;
  title: string;
  clientName: string;
  description: string;
  priority: PriorityEnum;
  status: StatusEnum;
  dueDate: string;
  notes?: string | null;
}

