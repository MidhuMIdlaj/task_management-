import { injectable } from "inversify";
import bcrypt from "bcryptjs";
import { IPasswordService } from "./IPasswordService";

@injectable()
export class PasswordService implements IPasswordService {
  private readonly saltRounds = 10;

  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, this.saltRounds);
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
