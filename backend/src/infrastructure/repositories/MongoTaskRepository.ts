import { injectable } from "inversify";
import { ITaskRepository } from "../../domain/repositories/ITaskRepository";
import { Task } from "../../domain/entities/Task";
import { CreateTaskDTO, UpdateTaskDTO } from "../../domain/dtos/TaskDTO";
import { TaskModel, TaskDocument } from "../models/TaskModel";

function toEntity(doc: TaskDocument): Task {
  return new Task(
    doc.id,
    doc.title,
    doc.description,
    doc.status,
    doc.priority,
    doc.dueDate,
    doc.owner,
    doc.createdAt,
    doc.updatedAt
  );
}

@injectable()
export class MongoTaskRepository implements ITaskRepository {
  async create(data: CreateTaskDTO): Promise<Task> {
    const doc = await TaskModel.create({
      title: data.title,
      description: data.description,
      priority: data.priority || "medium",
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
      owner: data.owner,
    });
    return toEntity(doc);
  }

  async findById(id: string): Promise<Task | null> {
    const doc = await TaskModel.findById(id);
    return doc ? toEntity(doc) : null;
  }

  async findAllByOwner(owner: string): Promise<Task[]> {
    const docs = await TaskModel.find({ owner }).sort({ createdAt: -1 });
    return docs.map(toEntity);
  }

  async update(id: string, data: UpdateTaskDTO): Promise<Task | null> {
    const update: Record<string, unknown> = { ...data };
    if (data.dueDate !== undefined) {
      update.dueDate = data.dueDate ? new Date(data.dueDate) : null;
    }
    const doc = await TaskModel.findByIdAndUpdate(id, update, { new: true });
    return doc ? toEntity(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const res = await TaskModel.findByIdAndDelete(id);
    return !!res;
  }

  async getStatsByOwner(owner: string): Promise<Task[]> {
    const docs = await TaskModel.find({ owner });
    return docs.map(toEntity);
  }
}
