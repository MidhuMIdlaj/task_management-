import { injectable } from "inversify";
import jwt from "jsonwebtoken";
import { ITokenService, TokenPayload } from "./ITokenService";

@injectable()
export class TokenService implements ITokenService {
  private readonly secret = process.env.JWT_SECRET || "dev_secret";
  private readonly expiresIn = process.env.JWT_EXPIRES_IN || "7d";

  sign(payload: TokenPayload): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn } as jwt.SignOptions);
  }

  verify(token: string): TokenPayload {
    return jwt.verify(token, this.secret) as TokenPayload;
  }
}
