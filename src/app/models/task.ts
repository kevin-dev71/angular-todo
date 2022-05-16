export interface Task {
  id: string;
  text: string;
  day: string;
  completed: boolean;
  sortedPosition: number;
}

export type TasksType = 'COMPLETED' | 'PENDING';
