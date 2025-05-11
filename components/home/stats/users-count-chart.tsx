"use client";

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TotalCountsChartByUserTypeProps {
  data: number[];
}

const TotalCountsChartByUserType: React.FC<TotalCountsChartByUserTypeProps> = ({
  data,
}) => {
  console.log("🚀 ~ data:", data);

  const barChartData = {
    labels: [
      "Brands",
      "Creators",
      "Audio Publishers",
      "Ctv Publishers",
      "UnCategorized",
    ],
    datasets: [
      {
        label: "Total Counts",
        data,
        backgroundColor: [
          "#1d4ed8", 
          "#ec4899", 
          "#10b981", 
          "#f97316", 
          "#6b7280", 
        ],
      },
    ],
  };

  return (
    <Bar
      data={barChartData}
      options={{
        responsive: true,
        plugins: { legend: { position: "top" } },
      }}
    />
  );
};

export default TotalCountsChartByUserType;
