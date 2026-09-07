import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import TYPES from "../../infrastructure/di/types";
import { ILoginUseCase, IRegisterUseCase } from "../../application/interfaces/IAuthUseCases";

@injectable()
export class AuthController {
  constructor(
    @inject(TYPES.IRegisterUseCase) private registerUseCase: IRegisterUseCase,
    @inject(TYPES.ILoginUseCase) private loginUseCase: ILoginUseCase
  ) {}

  register = async (req: Request, res: Response): Promise<void> => {
    const result = await this.registerUseCase.execute(req.body);
    res.status(201).json(result);
  };

  login = async (req: Request, res: Response): Promise<void> => {
    const result = await this.loginUseCase.execute(req.body);
    res.status(200).json(result);
  };
}
