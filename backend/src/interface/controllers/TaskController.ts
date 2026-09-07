import { inject, injectable } from "inversify";
import { Response } from "express";
import TYPES from "../../infrastructure/di/types";
import { AuthRequest } from "../middlewares/authMiddleware";
import { ICreateTaskUseCase, IDeleteTaskUseCase, IGetTasksUseCase, IUpdateTaskUseCase } from "../../application/interfaces/ITaskUseCases";

@injectable()
export class TaskController {
  constructor(
    @inject(TYPES.ICreateTaskUseCase) private createTaskUseCase: ICreateTaskUseCase,
    @inject(TYPES.IGetTasksUseCase) private getTasksUseCase: IGetTasksUseCase,
    @inject(TYPES.IUpdateTaskUseCase) private updateTaskUseCase: IUpdateTaskUseCase,
    @inject(TYPES.IDeleteTaskUseCase) private deleteTaskUseCase: IDeleteTaskUseCase
  ) {}

  create = async (req: AuthRequest, res: Response): Promise<void> => {
    const owner = req.userId as string;
    const task = await this.createTaskUseCase.execute({ ...req.body, owner });
    res.status(201).json(task);
  };

  getAll = async (req: AuthRequest, res: Response): Promise<void> => {
    const owner = req.userId as string;
    const tasks = await this.getTasksUseCase.execute(owner);
    res.status(200).json(tasks);
  };

  update = async (req: AuthRequest, res: Response): Promise<void> => {
    const owner = req.userId as string;
    const { id } = req.params;
    const task = await this.updateTaskUseCase.execute(id, owner, req.body);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.status(200).json(task);
  };

  delete = async (req: AuthRequest, res: Response): Promise<void> => {
    const owner = req.userId as string;
    const { id } = req.params;
    const deleted = await this.deleteTaskUseCase.execute(id, owner);
    if (!deleted) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.status(204).send();
  };
}
