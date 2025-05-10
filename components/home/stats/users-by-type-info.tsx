"use client";

import { useTheme } from "next-themes";
import {
  MdTrendingUp,
  MdWorkOutline,
  MdCheckCircleOutline,
} from "react-icons/md";

type Props = {
  avg_campaigns_per_brand?: number;
  total_campaigns?: number;
  total_budget?: number;
};

export default function CampaignsByStatus({ data }: { data: Props }) {
  const { theme } = useTheme();

  const safeData = {
    avg_campaigns_per_brand: data?.avg_campaigns_per_brand ?? 1.55,
    total_campaigns: data?.total_campaigns ?? 62,
    total_budget: data?.total_budget ?? 1180517,
  };

const cards = [
  {
    label: "Active Campaigns",
    value: safeData.avg_campaigns_per_brand.toFixed(2),
    icon: <MdTrendingUp size={32} style={{ color: theme === "dark" ? "#6EE7B7" : "#059669" }} />,
    lightBg: "#ECFDF5",
    lightBorder: "#6EE7B7",
    darkBg: "#064E3B",
    darkBorder: "#10B981",
    textColor: "#059669",
  },
  {
    label: "Assigned Campaigns",
    value: safeData.total_campaigns,
    icon: <MdWorkOutline size={32} style={{ color: theme === "dark" ? "#FCD34D" : "#D97706" }} />,
    lightBg: "#FEF3C7",
    lightBorder: "#FCD34D",
    darkBg: "#78350F",
    darkBorder: "#FBBF24",
    textColor: "#D97706",
  },
  {
    label: "Completed Campaigns",
    value: `$${safeData.total_budget.toLocaleString()}`,
    icon: <MdCheckCircleOutline size={32} style={{ color: theme === "dark" ? "#60A5FA" : "#2563EB" }} />,
    lightBg: "#EFF6FF",
    lightBorder: "#60A5FA",
    darkBg: "#1E3A8A",
    darkBorder: "#3B82F6",
    textColor: "#2563EB",
  },
];


  return (
    <div className="flex-1 h-full p-4 rounded-xl shadow bg-white dark:bg-[#0f172a] border border-borderGray dark:border-gray-700 flex flex-col">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Campaign By status
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row w-full gap-4">
        {/* Left Column - One Box (on small screens it takes full width) */}
        <div className="w-full sm:w-1/2 flex flex-col justify-between ">
          <div
            className="flex flex-col justify-center items-center text-center rounded-lg border-2 p-6 shadow transition-colors duration-300 h-full"
            style={{
              backgroundColor: theme === "dark" ? cards[0].darkBg : cards[0].lightBg,
              borderColor: theme === "dark" ? cards[0].darkBorder : cards[0].lightBorder,
              color: theme === "dark" ? "#F1F5F9" : cards[0].textColor,
            }}
          >
            <div
              className="mb-2 border rounded-full p-2 bg-white dark:bg-[#0f172a] shadow"
              style={{
                borderColor: theme === "dark" ? "#475569" : "#D1D5DB",
              }}
            >
              {cards[0].icon}
            </div>
            <p className="text-sm font-medium mb-1">{cards[0].label}</p>
            <p className="text-xl font-bold">{cards[0].value}</p>
          </div>
        </div>

        {/* Right Column - Two Boxes (on small screens they take full width) */}
        <div className="w-full sm:w-1/2 flex flex-col gap-4">
          {cards.slice(1).map((card, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-center items-center text-center rounded-lg border-2 p-6 shadow transition-colors duration-300"
              style={{
                backgroundColor: theme === "dark" ? card.darkBg : card.lightBg,
                borderColor: theme === "dark" ? card.darkBorder : card.lightBorder,
                color: theme === "dark" ? "#F1F5F9" : card.textColor,
              }}
            >
              <div
                className="mb-2 border rounded-full p-2 bg-white dark:bg-[#0f172a] shadow"
                style={{
                  borderColor: theme === "dark" ? "#475569" : "#D1D5DB",
                }}
              >
                {card.icon}
              </div>
              <p className="text-sm font-medium mb-1">{card.label}</p>
              <p className="text-xl font-bold">{card.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
