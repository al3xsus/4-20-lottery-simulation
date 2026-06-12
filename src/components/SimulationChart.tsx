import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DrawResult } from '../workers/simulation.worker';

interface Props {
  data: DrawResult[];
}

const SimulationChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="h-64 w-full bg-white p-4 rounded-xl shadow-sm border border-slate-100">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="drawIndex"
            hide
          />
          <YAxis
            fontSize={12}
            tickFormatter={(value) => `$${value}`}
            stroke="#64748b"
          />
          <Tooltip
            formatter={(value: any) => [`$${value.toLocaleString()}`, 'Net Balance']}
            labelFormatter={(label) => `Week ${label}`}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Line
            type="monotone"
            dataKey="netBalance"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimulationChart;
