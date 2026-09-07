import { AuthResponseDTO, LoginDTO, RegisterDTO } from "../../domain/dtos/AuthDTO";

export interface IRegisterUseCase {
  execute(data: RegisterDTO): Promise<AuthResponseDTO>;
}

export interface ILoginUseCase {
  execute(data: LoginDTO): Promise<AuthResponseDTO>;
}
