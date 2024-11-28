"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell,
} from "recharts";

const data = [
  { name: "Total Employee", value: 12, fill: "#01bf61" }, // Red for Not Verified
  { name: "Department", value: 19, fill: "#fe924c" }, // Green for Verified
  { name: "Job Views", value: 12, fill: "#008fc4" }, // Red for Not Verified
  { name: "Job Applied", value: 19, fill: "#fede59" }, // Green for Verified
  { name: "Resigned Employee", value: 19, fill: "#fe3132" }, // Green for Verified
];

const HrChart = () => {
  return (
    <BarChart
      width={500} // Increase chart width
      height={200} // Increase chart height
      data={data}
      layout="vertical" // Makes it horizontal
      barSize={20} // Controls bar thickness
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" hide />
      <YAxis
        dataKey="name"
        type="category"
        width={150} // Increase width of Y-axis to prevent cutoff
        tick={{ fontSize: 12 }} // Adjust label font size
      />
      <Tooltip />
      <Bar dataKey="value" name="Verifications">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.fill} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default HrChart;
