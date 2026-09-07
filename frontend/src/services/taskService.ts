import api from "./api";
import { Task, TaskStats } from "../types";

export async function getTasks(): Promise<Task[]> {
  const { data } = await api.get<Task[]>("/tasks");
  return data;
}

export async function createTask(payload: Partial<Task>): Promise<Task> {
  const { data } = await api.post<Task>("/tasks", payload);
  return data;
}

export async function updateTask(id: string, payload: Partial<Task>): Promise<Task> {
  const { data } = await api.put<Task>(`/tasks/${id}`, payload);
  return data;
}

export async function deleteTask(id: string): Promise<void> {
  await api.delete(`/tasks/${id}`);
}

export async function getStats(): Promise<TaskStats> {
  const { data } = await api.get<TaskStats>("/stats");
  return data;
}
