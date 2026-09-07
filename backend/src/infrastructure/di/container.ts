import "reflect-metadata";
import { Container } from "inversify";
import TYPES from "./types";

import { ITaskRepository } from "../../domain/repositories/ITaskRepository";
import { MongoTaskRepository } from "../repositories/MongoTaskRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { MongoUserRepository } from "../repositories/MongoUserRepository";

import { IPasswordService } from "../services/IPasswordService";
import { PasswordService } from "../services/PasswordService";
import { ITokenService } from "../services/ITokenService";
import { TokenService } from "../services/TokenService";
import { ISocketService } from "../services/ISocketService";
import { SocketService } from "../services/SocketService";

import { ICreateTaskUseCase, IDeleteTaskUseCase, IGetTasksUseCase, IUpdateTaskUseCase } from "../../application/interfaces/ITaskUseCases";
import { CreateTaskUseCase } from "../../application/useCases/task/CreateTaskUseCase";
import { GetTasksUseCase } from "../../application/useCases/task/GetTasksUseCase";
import { UpdateTaskUseCase } from "../../application/useCases/task/UpdateTaskUseCase";
import { DeleteTaskUseCase } from "../../application/useCases/task/DeleteTaskUseCase";

import { ILoginUseCase, IRegisterUseCase } from "../../application/interfaces/IAuthUseCases";
import { RegisterUseCase } from "../../application/useCases/auth/RegisterUseCase";
import { LoginUseCase } from "../../application/useCases/auth/LoginUseCase";

import { IGetTaskStatsUseCase } from "../../application/interfaces/IStatsUseCases";
import { GetTaskStatsUseCase } from "../../application/useCases/stats/GetTaskStatsUseCase";

import { TaskController } from "../../interface/controllers/TaskController";
import { AuthController } from "../../interface/controllers/AuthController";
import { StatsController } from "../../interface/controllers/StatsController";

const container = new Container();

// Repositories
container.bind<ITaskRepository>(TYPES.ITaskRepository).to(MongoTaskRepository).inSingletonScope();
container.bind<IUserRepository>(TYPES.IUserRepository).to(MongoUserRepository).inSingletonScope();

// Services
container.bind<IPasswordService>(TYPES.IPasswordService).to(PasswordService).inSingletonScope();
container.bind<ITokenService>(TYPES.ITokenService).to(TokenService).inSingletonScope();
container.bind<ISocketService>(TYPES.ISocketService).to(SocketService).inSingletonScope();

// Task Use Cases
container.bind<ICreateTaskUseCase>(TYPES.ICreateTaskUseCase).to(CreateTaskUseCase);
container.bind<IGetTasksUseCase>(TYPES.IGetTasksUseCase).to(GetTasksUseCase);
container.bind<IUpdateTaskUseCase>(TYPES.IUpdateTaskUseCase).to(UpdateTaskUseCase);
container.bind<IDeleteTaskUseCase>(TYPES.IDeleteTaskUseCase).to(DeleteTaskUseCase);

// Auth Use Cases
container.bind<IRegisterUseCase>(TYPES.IRegisterUseCase).to(RegisterUseCase);
container.bind<ILoginUseCase>(TYPES.ILoginUseCase).to(LoginUseCase);

// Stats Use Cases
container.bind<IGetTaskStatsUseCase>(TYPES.IGetTaskStatsUseCase).to(GetTaskStatsUseCase);

// Controllers
container.bind<TaskController>(TYPES.TaskController).to(TaskController);
container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container.bind<StatsController>(TYPES.StatsController).to(StatsController);

export default container;
