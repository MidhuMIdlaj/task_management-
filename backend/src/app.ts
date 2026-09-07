import "reflect-metadata";
import express, { Application } from "express";
import cors from "cors";
import taskRouter from "./interface/routes/task_management.router";
import authRouter from "./interface/routes/auth.router";
import statsRouter from "./interface/routes/stats.router";
import { errorHandler } from "./interface/middlewares/errorHandler";

export function createApp(): Application {
  const app = express();

  app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "task-management-api" });
  });

  app.use("/api/auth", authRouter);
  app.use("/api/tasks", taskRouter);
  app.use("/api/stats", statsRouter);

  app.use(errorHandler);

  return app;
}
