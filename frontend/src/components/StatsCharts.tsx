import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { TaskStats } from "../types";

const STATUS_COLORS = ["#94a3b8", "#f59e0b", "#10b981"];
const PRIORITY_COLORS = ["#38bdf8", "#fb923c", "#fb7185"];

export default function StatsCharts({ stats }: { stats: TaskStats }) {
  const statusData = [
    { name: "Pending", value: stats.pending },
    { name: "In progress", value: stats.inProgress },
    { name: "Completed", value: stats.completed },
  ];
  const priorityData = [
    { name: "Low", value: stats.byPriority.low },
    { name: "Medium", value: stats.byPriority.medium },
    { name: "High", value: stats.byPriority.high },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <h3 className="font-semibold text-slate-700 mb-3">Tasks by status</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={statusData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {statusData.map((_, i) => (
                <Cell key={i} fill={STATUS_COLORS[i % STATUS_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <h3 className="font-semibold text-slate-700 mb-3">Tasks by priority</h3>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={priorityData} dataKey="value" nameKey="name" outerRadius={90} label>
              {priorityData.map((_, i) => (
                <Cell key={i} fill={PRIORITY_COLORS[i % PRIORITY_COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
