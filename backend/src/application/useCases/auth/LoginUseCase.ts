import { inject, injectable } from "inversify";
import TYPES from "../../../infrastructure/di/types";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { AuthResponseDTO, LoginDTO } from "../../../domain/dtos/AuthDTO";
import { ILoginUseCase } from "../../interfaces/IAuthUseCases";
import { IPasswordService } from "../../../infrastructure/services/IPasswordService";
import { ITokenService } from "../../../infrastructure/services/ITokenService";

@injectable()
export class LoginUseCase implements ILoginUseCase {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(TYPES.IPasswordService) private passwordService: IPasswordService,
    @inject(TYPES.ITokenService) private tokenService: ITokenService
  ) { }

  async execute(data: LoginDTO): Promise<AuthResponseDTO> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const valid = await this.passwordService.compare(data.password, user.password);
    if (!valid) {
      throw new Error("Invalid credentials");
    }
    const token = this.tokenService.sign({ userId: user.id, email: user.email });
    return {
      token,
      user: { id: user.id, name: user.name, email: user.email },
    };
  }
}
