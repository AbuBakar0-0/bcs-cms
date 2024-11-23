import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VerifiedChart = () => {
  const data = {
    labels: ["Not Verified", "Verified"],
    datasets: [
      {
        label: "Monthly Sales",
        data: [12, 19], // Data points for Not Verified and Verified
        backgroundColor: [
          "#ff3131", // Red for Not Verified
          "#00be62", // Green for Verified
        ],
        barThickness: 30, // Set the thickness of the bars (in pixels)
      },
    ],
  };

  const options = {
    responsive: true,
    indexAxis: "y", // This makes the chart horizontal
    plugins: {
      legend: {
        position: "top",
        display: false, // Hides the legend
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hides grid lines on the x-axis
        },
        beginAtZero: true,
      },
      y: {
        grid: {
          display: false, // Hides grid lines on the y-axis
        },
        // These properties control the gap between bars
        ticks: {
          beginAtZero: true,
        },
        // Adjust category spacing and bar width
        barPercentage: 0.8, // This still reduces the gap but isn't the only key property for horizontal charts
        categoryPercentage: 0.9, // This helps in reducing space between categories
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default VerifiedChart;
