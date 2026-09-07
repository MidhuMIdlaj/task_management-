import { useEffect, useState } from "react";
import { TaskStats } from "../types";
import * as taskService from "../services/taskService";
import StatsCharts from "../components/StatsCharts";

export default function DashboardPage() {
  const [stats, setStats] = useState<TaskStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    taskService
      .getStats()
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center text-slate-500 py-10">Loading dashboard...</p>;
  }
  if (!stats) {
    return <p className="text-center text-slate-500 py-10">No data available.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          { label: "Total", value: stats.total },
          { label: "Pending", value: stats.pending },
          { label: "In progress", value: stats.inProgress },
          { label: "Completed", value: stats.completed },
          { label: "Overdue", value: stats.overdue },
        ].map((item) => (
          <div key={item.label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 text-center">
            <p className="text-2xl font-bold text-slate-800">{item.value}</p>
            <p className="text-xs text-slate-500 mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      <StatsCharts stats={stats} />
    </div>
  );
}
