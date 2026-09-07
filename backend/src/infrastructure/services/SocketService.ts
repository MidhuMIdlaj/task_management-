import { injectable } from "inversify";
import { Server } from "socket.io";
import { ISocketService } from "./ISocketService";

@injectable()
export class SocketService implements ISocketService {
  private io: Server | null = null;

  setIO(io: Server): void {
    this.io = io;
  }

  emitTaskCreated(owner: string, payload: unknown): void {
    this.io?.to(owner).emit("task:created", payload);
  }

  emitTaskUpdated(owner: string, payload: unknown): void {
    this.io?.to(owner).emit("task:updated", payload);
  }

  emitTaskDeleted(owner: string, payload: unknown): void {
    this.io?.to(owner).emit("task:deleted", payload);
  }
}
