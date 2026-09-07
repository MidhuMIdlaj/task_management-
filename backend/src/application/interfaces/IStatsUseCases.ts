import { TaskStatsDTO } from "../../domain/dtos/StatsDTO";

export interface IGetTaskStatsUseCase {
  execute(owner: string): Promise<TaskStatsDTO>;
}
