import React from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const StatusPieChart = ({ statusSummary }) => {
  const { darkMode } = useSelector((state) => state.settings);
  
  const data = [
    { name: 'Working', value: statusSummary.Working, color: '#10b981' }, // green-500
    { name: 'Break', value: statusSummary.Break, color: '#eab308' }, // yellow-500
    { name: 'Meeting', value: statusSummary.Meeting, color: '#3b82f6' }, // blue-500
    { name: 'Offline', value: statusSummary.Offline, color: '#6b7280' }, // gray-500
  ].filter(item => item.value > 0); // Only show statuses with members

  const COLORS = data.reduce((acc, item) => {
    acc[item.name] = item.color;
    return acc;
  }, {});

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: darkMode ? '#1f2937' : '#ffffff',
              border: darkMode ? '1px solid #374151' : '1px solid #e5e7eb',
              borderRadius: '8px',
              color: darkMode ? '#f3f4f6' : '#111827',
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            wrapperStyle={{
              color: darkMode ? '#f3f4f6' : '#111827',
            }}
            formatter={(value, entry) => (
              <span style={{ color: darkMode ? '#f3f4f6' : '#111827' }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusPieChart;

