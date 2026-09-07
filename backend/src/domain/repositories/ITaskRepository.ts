import { Task } from "../entities/Task";
import { CreateTaskDTO, UpdateTaskDTO } from "../dtos/TaskDTO";

export interface ITaskRepository {
  create(data: CreateTaskDTO): Promise<Task>;
  findById(id: string): Promise<Task | null>;
  findAllByOwner(owner: string): Promise<Task[]>;
  update(id: string, data: UpdateTaskDTO): Promise<Task | null>;
  delete(id: string): Promise<boolean>;
  getStatsByOwner(owner: string): Promise<Task[]>;
}
