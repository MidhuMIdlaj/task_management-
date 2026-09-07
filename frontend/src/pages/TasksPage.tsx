import { useTasks } from "../hooks/useTasks";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import * as taskService from "../services/taskService";
import { Task } from "../types";

export default function TasksPage() {
  const { tasks, loading, error, setTasks } = useTasks();

  async function handleCreate(data: Partial<Task>) {
    const created = await taskService.createTask(data);
    setTasks((prev) => {
      if (prev.some((t) => t.id === created.id)) return prev;
      return [created, ...prev];
    });
  }

  async function handleUpdate(id: string, payload: Partial<Task>) {
    const updated = await taskService.updateTask(id, payload);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }

  async function handleDelete(id: string) {
    await taskService.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 mb-4">My Tasks</h1>
        <TaskForm onSubmit={handleCreate} />
      </div>

      {error && <p className="text-rose-600 text-sm">{error}</p>}
      {loading ? (
        <p className="text-center text-slate-500 py-10">Loading tasks...</p>
      ) : (
        <TaskList tasks={tasks} onUpdate={handleUpdate} onDelete={handleDelete} />
      )}
    </div>
  );
}
