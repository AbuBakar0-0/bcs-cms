"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Cell } from "recharts";

const data = [
  { name: "Expired", value: 12, color: "#ff3131" },
  { name: "Expiring", value: 19, color: "#eb5345" },
  { name: "Missing", value: 3, color: "#ffbd58" },
  { name: "Active", value: 5, color: "#00be62" },
  { name: "On File", value: 2, color: "#004aac" },
];

const DocumentChart = () => {
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      barSize={30} // Controls the thickness of the bars
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" name="Documents">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default DocumentChart;
