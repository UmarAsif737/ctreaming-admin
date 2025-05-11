"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface VerifiedAndUnVerifiedChartProps {
  verified: number;
  nonVerified: number;
}

const VerifiedAndUnVerifiedChart: React.FC<VerifiedAndUnVerifiedChartProps> = ({
  verified,
  nonVerified,
}) => {
  const doughnutData = {
    labels: ["Verified Users", "Non-Verified Users"],
    datasets: [
      {
        label: "Verified/Unverified Users Count",
        data: [verified, nonVerified],
        backgroundColor: [
          "#22c55e", 
          "#ef4444", 
        ],
      },
    ],
  };

  return (
    <Doughnut
      data={doughnutData}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
      }}
    />
  );
};

export default VerifiedAndUnVerifiedChart;
