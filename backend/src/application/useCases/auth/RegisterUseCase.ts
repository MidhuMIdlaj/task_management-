import { inject, injectable } from "inversify";
import TYPES from "../../../infrastructure/di/types";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { AuthResponseDTO, RegisterDTO } from "../../../domain/dtos/AuthDTO";
import { IRegisterUseCase } from "../../interfaces/IAuthUseCases";
import { IPasswordService } from "../../../infrastructure/services/IPasswordService";
import { ITokenService } from "../../../infrastructure/services/ITokenService";

@injectable()
export class RegisterUseCase implements IRegisterUseCase {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(TYPES.IPasswordService) private passwordService: IPasswordService,
    @inject(TYPES.ITokenService) private tokenService: ITokenService
  ) {}

  async execute(data: RegisterDTO): Promise<AuthResponseDTO> {
    if (!data.email || !data.password || !data.name) {
      throw new Error("Name, email and password are required");
    }
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) {
      throw new Error("Email already registered");
    }
    const hashed = await this.passwordService.hash(data.password);
    const user = await this.userRepository.create(data.name, data.email, hashed);
    const token = this.tokenService.sign({ userId: user.id, email: user.email });
    return {
      token,
      user: { id: user.id, name: user.name, email: user.email },
    };
  }
}
