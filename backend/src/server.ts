import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";
import { createApp } from "./app";
import { connectDatabase } from "./infrastructure/database/connection";
import container from "./infrastructure/di/container";
import TYPES from "./infrastructure/di/types";
import { SocketService } from "./infrastructure/services/SocketService";

async function bootstrap(): Promise<void> {
  await connectDatabase();

  const app = createApp();
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: { origin: process.env.CLIENT_URL || "*", credentials: true },
  });

  // Rooms are keyed by userId so real-time updates only reach the owning user
  io.on("connection", (socket) => {
    socket.on("join", (userId: string) => {
      socket.join(userId);
    });
    socket.on("disconnect", () => {
      // no-op, room membership is cleaned up automatically
    });
  });

  const socketService = container.get<SocketService>(TYPES.ISocketService);
  socketService.setIO(io);

  const port = process.env.PORT || 5000;
  server.listen(port, () => {
    console.log(`[server] Task Management API listening on port ${port}`);
  });
}

bootstrap().catch((err) => {
  console.error("[server] Failed to start:", err);
  process.exit(1);
});
