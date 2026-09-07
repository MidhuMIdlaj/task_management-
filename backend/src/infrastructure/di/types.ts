const TYPES = {
  // Repositories
  ITaskRepository: Symbol.for("ITaskRepository"),
  IUserRepository: Symbol.for("IUserRepository"),

  // Services
  IPasswordService: Symbol.for("IPasswordService"),
  ITokenService: Symbol.for("ITokenService"),
  ISocketService: Symbol.for("ISocketService"),

  // Task Use Cases
  ICreateTaskUseCase: Symbol.for("ICreateTaskUseCase"),
  IGetTasksUseCase: Symbol.for("IGetTasksUseCase"),
  IUpdateTaskUseCase: Symbol.for("IUpdateTaskUseCase"),
  IDeleteTaskUseCase: Symbol.for("IDeleteTaskUseCase"),

  // Auth Use Cases
  IRegisterUseCase: Symbol.for("IRegisterUseCase"),
  ILoginUseCase: Symbol.for("ILoginUseCase"),

  // Stats Use Cases
  IGetTaskStatsUseCase: Symbol.for("IGetTaskStatsUseCase"),

  // Controllers
  TaskController: Symbol.for("TaskController"),
  AuthController: Symbol.for("AuthController"),
  StatsController: Symbol.for("StatsController"),
};

export default TYPES;
