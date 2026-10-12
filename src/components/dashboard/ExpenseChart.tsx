import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from 'recharts';

const monthlyData = [
  { month: 'May', expense: 1240, hours: 26, sessions: 6 },
  { month: 'Jun', expense: 1680, hours: 34, sessions: 8 },
  { month: 'Jul', expense: 980, hours: 19, sessions: 4 },
  { month: 'Aug', expense: 2150, hours: 42, sessions: 11 },
  { month: 'Sep', expense: 1890, hours: 38, sessions: 9 },
  { month: 'Oct (MTD)', expense: 1390, hours: 28, sessions: 7 },
];

export const ExpenseChart: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Monthly Parking & FASTag Spend */}
      <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-bold text-sm text-[var(--color-text)]">
              Monthly Transit Parking Spend
            </h4>
            <p className="text-xs text-[var(--color-text-muted)]">
              Includes Station Deck + FASTag Auto-Debits
            </p>
          </div>
          <span className="text-xs font-bold text-[var(--color-primary)] bg-[var(--color-accent-subtle)] px-2.5 py-1 rounded-lg">
            Total ₹9,330
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} opacity={0.6} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 11, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(val) => `₹${val}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  fontSize: '12px',
                }}
                formatter={(val: any) => [`₹${val}`, 'Monthly Spend']}
              />
              <Bar dataKey="expense" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Hours Parked & Transit Efficiency */}
      <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-bold text-sm text-[var(--color-text)]">
              Station Parking Hours & Utilization
            </h4>
            <p className="text-xs text-[var(--color-text-muted)]">
              Total hours vehicle safely stationed
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg">
            187 Hours Total
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="hoursGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} opacity={0.6} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 11, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(val) => `${val}h`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  fontSize: '12px',
                }}
                formatter={(val: any) => [`${val} hrs`, 'Parking Duration']}
              />
              <Area
                type="monotone"
                dataKey="hours"
                stroke="var(--color-primary)"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#hoursGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
