export interface TaskStatsDTO {
  total: number;
  completed: number;
  pending: number;
  inProgress: number;
  overdue: number;
  byPriority: {
    low: number;
    medium: number;
    high: number;
  };
}
