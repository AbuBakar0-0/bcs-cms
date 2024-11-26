"use client";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "Pending", value: 12, color: "rgb(255, 189, 88)" },
  { name: "Accepted", value: 19, color: "rgb(0, 190, 98)" },
  { name: "Rejected", value: 3, color: "rgb(255, 49, 49)" },
  { name: "Terminated", value: 5, color: "rgb(115, 115, 115)" },
];

const CustomPieChart = () => {
  return (
    <PieChart width={400} height={350}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={120}
        fill="#8884d8"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default CustomPieChart;
