"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { name: "Not Verified", value: 12, fill: "#ff3131" }, // Red for Not Verified
  { name: "Verified", value: 19, fill: "#00be62" },     // Green for Verified
];

const VerifiedChart = () => {
  return (
    <BarChart
      width={400}
      height={150}
      data={data}
      layout="vertical" // Makes it horizontal
      barSize={20} // Controls bar thickness
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" hide />
      <YAxis dataKey="name" type="category" />
      <Tooltip />
      {/* Dynamically set the bar color using the fill property in the data */}
      <Bar dataKey="value" name="Verifications">
        {data.map((entry, index) => (
          <cell key={`cell-${index}`} fill={entry.fill} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default VerifiedChart;
