import { Task } from "../types";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  onUpdate: (id: string, payload: Partial<Task>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function TaskList({ tasks, onUpdate, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="text-center text-slate-500 py-10">No tasks yet. Add your first task above.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
}
