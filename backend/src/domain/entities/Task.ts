export type TaskStatus = "pending" | "in-progress" | "completed";
export type TaskPriority = "low" | "medium" | "high";

export class Task {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public status: TaskStatus,
    public priority: TaskPriority,
    public dueDate: Date | null,
    public owner: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  isOverdue(): boolean {
    if (!this.dueDate) return false;
    return this.status !== "completed" && this.dueDate.getTime() < Date.now();
  }
}
