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

const DocumentChart = () => {
  const data = {
    labels: ["Expired", "Expiring", "Missing", "Active", "On FIle"],
    datasets: [
      {
        data: [12, 19, 3, 5, 2, 8],
        backgroundColor: [
          "#ff3131",
          "#eb5345",
          "#ffbd58",
          "#00be62",
          "#004aac"
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display:false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default DocumentChart;
