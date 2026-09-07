export interface ISocketService {
  emitTaskCreated(owner: string, payload: unknown): void;
  emitTaskUpdated(owner: string, payload: unknown): void;
  emitTaskDeleted(owner: string, payload: unknown): void;
}
