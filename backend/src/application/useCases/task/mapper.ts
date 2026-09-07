import { Task } from "../../../domain/entities/Task";
import { TaskResponseDTO } from "../../../domain/dtos/TaskDTO";

export function toTaskResponseDTO(task: Task): TaskResponseDTO {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate,
    owner: task.owner,
    isOverdue: task.isOverdue(),
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  };
}
