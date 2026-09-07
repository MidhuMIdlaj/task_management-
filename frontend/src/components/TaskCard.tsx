import { useState } from "react";
import { Task, TaskStatus } from "../types";
import TaskForm from "./TaskForm";

interface TaskCardProps {
  task: Task;
  onUpdate: (id: string, payload: Partial<Task>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const statusStyles: Record<TaskStatus, string> = {
  pending: "bg-slate-100 text-slate-700",
  "in-progress": "bg-amber-100 text-amber-700",
  completed: "bg-emerald-100 text-emerald-700",
};

const priorityStyles: Record<string, string> = {
  low: "bg-sky-50 text-sky-600 border-sky-200",
  medium: "bg-orange-50 text-orange-600 border-orange-200",
  high: "bg-rose-50 text-rose-600 border-rose-200",
};

export default function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleStatusChange(status: TaskStatus) {
    setBusy(true);
    try {
      await onUpdate(task.id, { status });
    } finally {
      setBusy(false);
    }
  }

  if (editing) {
    return (
      <TaskForm
        initial={task}
        onCancel={() => setEditing(false)}
        onSubmit={async (data) => {
          await onUpdate(task.id, data);
          setEditing(false);
        }}
      />
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-slate-800 break-words">{task.title}</h3>
        <span className={`text-xs px-2 py-0.5 rounded-full border ${priorityStyles[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      {task.description && <p className="text-sm text-slate-600 break-words">{task.description}</p>}

      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
        <span className={`px-2 py-0.5 rounded-full font-medium ${statusStyles[task.status]}`}>
          {task.status}
        </span>
        {task.dueDate && (
          <span className={task.isOverdue ? "text-rose-600 font-medium" : ""}>
            Due {new Date(task.dueDate).toLocaleDateString()}
            {task.isOverdue ? " · overdue" : ""}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 mt-1">
        <select
          value={task.status}
          disabled={busy}
          onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
          className="text-xs rounded-md border border-slate-300 px-2 py-1"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In progress</option>
          <option value="completed">Completed</option>
        </select>
        <button
          onClick={() => setEditing(true)}
          className="text-xs px-2 py-1 rounded-md border border-slate-300 hover:bg-slate-50"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-xs px-2 py-1 rounded-md border border-rose-200 text-rose-600 hover:bg-rose-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
