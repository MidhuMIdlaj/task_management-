import { inject, injectable } from "inversify";
import TYPES from "../../../infrastructure/di/types";
import { ITaskRepository } from "../../../domain/repositories/ITaskRepository";
import { TaskResponseDTO } from "../../../domain/dtos/TaskDTO";
import { IGetTasksUseCase } from "../../interfaces/ITaskUseCases";
import { toTaskResponseDTO } from "./mapper";

@injectable()
export class GetTasksUseCase implements IGetTasksUseCase {
  constructor(@inject(TYPES.ITaskRepository) private taskRepository: ITaskRepository) {}

  async execute(owner: string): Promise<TaskResponseDTO[]> {
    const tasks = await this.taskRepository.findAllByOwner(owner);
    return tasks.map(toTaskResponseDTO);
  }
}
