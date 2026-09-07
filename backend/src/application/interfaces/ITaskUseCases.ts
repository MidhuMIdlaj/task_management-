import { CreateTaskDTO, TaskResponseDTO, UpdateTaskDTO } from "../../domain/dtos/TaskDTO";

export interface ICreateTaskUseCase {
  execute(data: CreateTaskDTO): Promise<TaskResponseDTO>;
}

export interface IGetTasksUseCase {
  execute(owner: string): Promise<TaskResponseDTO[]>;
}

export interface IUpdateTaskUseCase {
  execute(id: string, owner: string, data: UpdateTaskDTO): Promise<TaskResponseDTO | null>;
}

export interface IDeleteTaskUseCase {
  execute(id: string, owner: string): Promise<boolean>;
}
