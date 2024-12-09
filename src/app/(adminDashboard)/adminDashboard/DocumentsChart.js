"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Function to get colors for each status
const getStatusColor = (status) => {
  switch (status) {
    case "Expiring":
      return "#eb5345"; // Red for Expiring
    case "Missing":
      return "#ffbd58"; // Yellow for Missing
    case "Expired":
      return "#ff3131"; // Dark red for Expired
    case "On File":
      return "#004aac"; // Blue for On File
    case "Active":
      return "#00be62"; // Green for Active
    case "Requested Provider":
      return "#FF6347"; // Tomato color for Requested Provider
    default:
      return "#000000"; // Default color (black)
  }
};

function DocumentChart({ data }) {
  // Map the data to the format required by the BarChart
  const renderData = data.map((item) => ({
    name: item.status,   // The status (e.g., "Expiring", "Missing")
    value: item.total_count, // The total count for the status
    color: getStatusColor(item.status), // Color for the bar based on status
  }));

  return (
    <BarChart
      width={500}
      height={348}
      data={renderData}
      barSize={30} // Controls the thickness of the bars
    >
      <CartesianGrid strokeDasharray="4 4" />
      
      {/* Set intervals for X-Axis */}
      <XAxis
        dataKey="name"
        interval={0} // Show all ticks (you can change this for intervals)
      />
      
      {/* Set intervals for Y-Axis */}
      <YAxis
        ticks={[0, 3, 6, 9, 12]} // Manually set the tick intervals
      />

      <Tooltip />
      <Bar dataKey="value" name="Documents">
        {renderData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Bar>
    </BarChart>
  );
}

export default DocumentChart;
