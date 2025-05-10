// components/RenewalRequestsChart.tsx
"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface RenewalRequestsChartProps {
  data: number;
}

const RenewalRequestsChart: React.FC<RenewalRequestsChartProps> = ({
  data,
}) => {
  const doughnutData = {
    labels: ["Request Initiated"],
    datasets: [
      {
        label: "Renewal Requests",
        data: [data],
        backgroundColor: ["#22c55e"],
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

export default RenewalRequestsChart;
