import { inject, injectable } from "inversify";
import TYPES from "../../../infrastructure/di/types";
import { ITaskRepository } from "../../../domain/repositories/ITaskRepository";
import { IDeleteTaskUseCase } from "../../interfaces/ITaskUseCases";
import { ISocketService } from "../../../infrastructure/services/ISocketService";

@injectable()
export class DeleteTaskUseCase implements IDeleteTaskUseCase {
  constructor(
    @inject(TYPES.ITaskRepository) private taskRepository: ITaskRepository,
    @inject(TYPES.ISocketService) private socketService: ISocketService
  ) {}

  async execute(id: string, owner: string): Promise<boolean> {
    const existing = await this.taskRepository.findById(id);
    if (!existing || existing.owner !== owner) {
      return false;
    }
    const deleted = await this.taskRepository.delete(id);
    if (deleted) {
      this.socketService.emitTaskDeleted(owner, { id });
    }
    return deleted;
  }
}
