"use client";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// Define color mapping for statuses
const statusColors = {
  "Submitted": "rgb(0, 123, 255)",  // Blue
  "In-Progress": "rgb(255, 189, 88)", // Yellow
  "Approved": "rgb(0, 190, 98)", // Green
  "Rejected": "rgb(255, 49, 49)", // Red
  "Panel Closed": "rgb(115, 115, 115)", // Gray
  "Missing Information": "rgb(255, 165, 0)", // Orange
};

const CustomPieChart = ({ data }) => {
  // Format the incoming data with colors
  const formattedData = data.map((entry) => ({
    name: entry.status,
    value: entry.count,
    color: statusColors[entry.status] || "rgb(0, 0, 0)", // Default to black if not found
  }));

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={formattedData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={120}
        fill="#8884d8"
      >
        {formattedData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default CustomPieChart;
