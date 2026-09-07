import { injectable } from "inversify";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import { UserModel, UserDocument } from "../models/UserModel";

function toEntity(doc: UserDocument): User {
  return new User(doc.id, doc.name, doc.email, doc.password, doc.createdAt);
}

@injectable()
export class MongoUserRepository implements IUserRepository {
  async create(name: string, email: string, hashedPassword: string): Promise<User> {
    const doc = await UserModel.create({ name, email, password: hashedPassword });
    return toEntity(doc);
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await UserModel.findOne({ email: email.toLowerCase() });
    return doc ? toEntity(doc) : null;
  }

  async findById(id: string): Promise<User | null> {
    const doc = await UserModel.findById(id);
    return doc ? toEntity(doc) : null;
  }
}
