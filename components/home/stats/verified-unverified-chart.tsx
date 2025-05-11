// components/RenewalRequestsChart.tsx
"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface RenewalRequestsChartProps {
  data: number;
}

const VerifiedAndUnVerifiedChart: React.FC<RenewalRequestsChartProps> = ({
  data,
}) => {
  const doughnutData = {
    labels: ["Verified Users", "Non-Verified Users"],
    datasets: [
      {
        label: "Verified/UnVerified Users Count",
        data: [data],
        backgroundColor: ["#22c55e", "#ffaaaa"],
      },
    ],
  };

  return (
    <Doughnut
      data={doughnutData}
      options={{
        responsive: true,
        plugins: { legend: { position: "top" } },
      }}
    />
  );
};

export default VerifiedAndUnVerifiedChart;
