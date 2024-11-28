"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Cell } from "recharts";

const data = [
  { name: "January", value1: 12, value2: 8, color1: "#ff3131", color2: "#ff8080" },
  { name: "February", value1: 15, value2: 10, color1: "#eb5345", color2: "#f59891" },
  { name: "March", value1: 10, value2: 5, color1: "#ffbd58", color2: "#ffd699" },
  { name: "April", value1: 20, value2: 12, color1: "#00be62", color2: "#80e1b1" },
  { name: "May", value1: 18, value2: 9, color1: "#004aac", color2: "#669ad4" },
  { name: "June", value1: 22, value2: 15, color1: "#ff69b4", color2: "#ffa6d2" },
  { name: "July", value1: 25, value2: 18, color1: "#9400d3", color2: "#d884ff" },
  { name: "August", value1: 30, value2: 20, color1: "#ffa500", color2: "#ffcc80" },
];

const MonthlyDocumentChart = () => {
  return (
    <BarChart
      width={550}
      height={400}
      data={data}
      barSize={20} // Controls the thickness of each bar
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      {/* First set of bars */}
      <Bar dataKey="value1" name="Primary" barSize={20}>
        {data.map((entry, index) => (
          <Cell key={`cell-primary-${index}`} fill={entry.color1} />
        ))}
      </Bar>
      {/* Second set of bars */}
      <Bar dataKey="value2" name="Secondary" barSize={20}>
        {data.map((entry, index) => (
          <Cell key={`cell-secondary-${index}`} fill={entry.color2} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default MonthlyDocumentChart;
