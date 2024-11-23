// components/PieChart.js
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ['Rending', 'Accepted', 'Rejected', 'Terminated'],
    datasets: [
      {
        label: 'Votes',
        data: [12, 19, 3, 5],
        backgroundColor: [
          'rgb(255, 189, 88)',
          'rgb(0, 190, 98)',
          'rgb(255, 49, 49)',
          'rgb(115, 115, 115)',
          
        ],
        borderColor: [
          'rgb(255, 189, 88)',
          'rgb(0, 190, 98)',
          'rgb(255, 49, 49)',
          'rgb(115, 115, 115)',
          
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} width={350} height={350}/>;
};

export default PieChart;
