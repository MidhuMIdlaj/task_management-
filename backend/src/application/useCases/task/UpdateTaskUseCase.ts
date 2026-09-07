import { inject, injectable } from "inversify";
import TYPES from "../../../infrastructure/di/types";
import { ITaskRepository } from "../../../domain/repositories/ITaskRepository";
import { TaskResponseDTO, UpdateTaskDTO } from "../../../domain/dtos/TaskDTO";
import { IUpdateTaskUseCase } from "../../interfaces/ITaskUseCases";
import { ISocketService } from "../../../infrastructure/services/ISocketService";
import { toTaskResponseDTO } from "./mapper";

@injectable()
export class UpdateTaskUseCase implements IUpdateTaskUseCase {
  constructor(
    @inject(TYPES.ITaskRepository) private taskRepository: ITaskRepository,
    @inject(TYPES.ISocketService) private socketService: ISocketService
  ) {}

  async execute(id: string, owner: string, data: UpdateTaskDTO): Promise<TaskResponseDTO | null> {
    const existing = await this.taskRepository.findById(id);
    if (!existing || existing.owner !== owner) {
      return null;
    }
    const updated = await this.taskRepository.update(id, data);
    if (!updated) return null;
    const dto = toTaskResponseDTO(updated);
    this.socketService.emitTaskUpdated(owner, dto);
    return dto;
  }
}
