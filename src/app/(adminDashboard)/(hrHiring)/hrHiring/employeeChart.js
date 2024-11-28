"use client";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const genderData = [
  { name: "Male", value: 60, color: "rgb(0, 123, 255)" }, // Blue for Male
  { name: "Female", value: 40, color: "rgb(255, 99, 132)" }, // Pink for Female
];

const GenderChart = () => {
  return (
    <PieChart width={400} height={350}>
      <Pie
        data={genderData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={120}
        fill="#8884d8"
        label={({ name, value }) => `${name}: ${value}%`} // Optional: Show labels
      >
        {genderData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
      <Legend layout="horizontal" verticalAlign="bottom" align="center" />
    </PieChart>
  );
};

export default GenderChart;
