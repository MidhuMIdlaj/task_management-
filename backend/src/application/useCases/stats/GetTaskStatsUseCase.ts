import { inject, injectable } from "inversify";
import TYPES from "../../../infrastructure/di/types";
import { ITaskRepository } from "../../../domain/repositories/ITaskRepository";
import { TaskStatsDTO } from "../../../domain/dtos/StatsDTO";
import { IGetTaskStatsUseCase } from "../../interfaces/IStatsUseCases";

@injectable()
export class GetTaskStatsUseCase implements IGetTaskStatsUseCase {
  constructor(@inject(TYPES.ITaskRepository) private taskRepository: ITaskRepository) {}

  async execute(owner: string): Promise<TaskStatsDTO> {
    const tasks = await this.taskRepository.getStatsByOwner(owner);

    const stats: TaskStatsDTO = {
      total: tasks.length,
      completed: 0,
      pending: 0,
      inProgress: 0,
      overdue: 0,
      byPriority: { low: 0, medium: 0, high: 0 },
    };

    for (const task of tasks) {
      if (task.status === "completed") stats.completed++;
      else if (task.status === "in-progress") stats.inProgress++;
      else stats.pending++;

      if (task.isOverdue()) stats.overdue++;

      stats.byPriority[task.priority]++;
    }

    return stats;
  }
}
