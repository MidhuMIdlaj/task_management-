import { TaskPriority, TaskStatus } from "../entities/Task";

export interface CreateTaskDTO {
  title: string;
  description: string;
  priority?: TaskPriority;
  dueDate?: string | null;
  owner: string;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string | null;
}

export interface TaskResponseDTO {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date | null;
  owner: string;
  isOverdue: boolean;
  createdAt: Date;
  updatedAt: Date;
}
