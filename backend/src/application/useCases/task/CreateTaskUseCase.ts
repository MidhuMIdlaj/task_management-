import { inject, injectable } from "inversify";
import TYPES from "../../../infrastructure/di/types";
import { ITaskRepository } from "../../../domain/repositories/ITaskRepository";
import { CreateTaskDTO, TaskResponseDTO } from "../../../domain/dtos/TaskDTO";
import { ICreateTaskUseCase } from "../../interfaces/ITaskUseCases";
import { ISocketService } from "../../../infrastructure/services/ISocketService";
import { toTaskResponseDTO } from "./mapper";

@injectable()
export class CreateTaskUseCase implements ICreateTaskUseCase {
  constructor(
    @inject(TYPES.ITaskRepository) private taskRepository: ITaskRepository,
    @inject(TYPES.ISocketService) private socketService: ISocketService
  ) {}

  async execute(data: CreateTaskDTO): Promise<TaskResponseDTO> {
    if (!data.title || !data.title.trim()) {
      throw new Error("Title is required");
    }
    const task = await this.taskRepository.create(data);
    const dto = toTaskResponseDTO(task);
    this.socketService.emitTaskCreated(data.owner, dto);
    return dto;
  }
}
