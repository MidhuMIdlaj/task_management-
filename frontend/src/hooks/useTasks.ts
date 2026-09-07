import { useCallback, useEffect, useState } from "react";
import { Task } from "../types";
import * as taskService from "../services/taskService";
import { getSocket } from "../services/socket";
import { useAuth } from "../context/AuthContext";

export function useTasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const data = await taskService.getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Real-time updates via Socket.io
  useEffect(() => {
    if (!user) return;
    const socket = getSocket();
    socket.connect();
    socket.emit("join", user.id);

    const onCreated = (task: Task) => setTasks((prev) => [task, ...prev]);
    const onUpdated = (task: Task) =>
      setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
    const onDeleted = ({ id }: { id: string }) =>
      setTasks((prev) => prev.filter((t) => t.id !== id));

    socket.on("task:created", onCreated);
    socket.on("task:updated", onUpdated);
    socket.on("task:deleted", onDeleted);

    return () => {
      socket.off("task:created", onCreated);
      socket.off("task:updated", onUpdated);
      socket.off("task:deleted", onDeleted);
      socket.disconnect();
    };
  }, [user]);

  return { tasks, loading, error, refresh, setTasks };
}
