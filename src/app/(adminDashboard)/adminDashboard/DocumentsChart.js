"use client";
import { useRouter } from 'next/navigation'; // Import useRouter from next/router
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
    case "Requested":
      return "#FF6347"; // Tomato color for Requested
    default:
      return "#000000"; // Default color (black)
  }
};

function DocumentChart({ data }) {
  const router = useRouter(); // Initialize the useRouter hook

  const allStatuses = [
    "Expiring",
    "Missing",
    "Expired",
    "On File",
    "Active",
    "Requested Provider",
  ];

  const renderData = allStatuses.map((status) => {
    const foundItem = data.find((item) => item.status === status);
    return {
      name: status === "Requested Provider" ? "Requested" : status, // Trim name
      value: foundItem ? foundItem.total_count : 0, // Use 0 if no data is found
      color: getStatusColor(status === "Requested Provider" ? "Requested" : status), // Match color for trimmed name
    };
  });

  // Handle click event for a cell to navigate
  const handleClick = (status) => {
    console.log("CALLED");
    if(status=="Requested"){
      router.push(`/documentCenter?type=Requested Provider`); // Use router.push for navigation

    }else{
      router.push(`/documentCenter?type=${status}`); // Use router.push for navigation

    }
  };

  return (
    <BarChart
      className="-ml-8"
      width={650}
      height={348}
      data={renderData}
      barSize={30}
    >
      <CartesianGrid strokeDasharray="10 10" />

      {/* Set intervals for X-Axis */}
      <XAxis
        dataKey="name"
        interval={0} // Show all ticks (you can change this for intervals)
      />

      {/* Set intervals for Y-Axis */}
      <YAxis ticks={[0, 3, 6, 9, 12]} /> {/* Manually set the tick intervals */}

      <Tooltip />
      <Bar dataKey="value" name="Documents">
        {renderData.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={entry.color}
            onClick={() => handleClick(entry.name)} // Add click event
          />
        ))}
      </Bar>
    </BarChart>
  );
}

export default DocumentChart;
