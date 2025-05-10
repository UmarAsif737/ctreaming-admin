"use client";

import { useTheme } from "next-themes";
import {
  MdAttachMoney,
  MdBarChart,
  MdCampaign,
  MdBusinessCenter,
} from "react-icons/md";

type Props = {
  avg_budget_per_campaign?: number;
  avg_campaigns_per_brand?: number;
  total_campaigns?: number;
  total_budget?: number;
};

export default function CampaignStats({ data }: { data: Props }) {
  const { theme } = useTheme();

  const safeData = {
    avg_budget_per_campaign: data?.avg_budget_per_campaign ?? 19040.6,
    avg_campaigns_per_brand: data?.avg_campaigns_per_brand ?? 1.55,
    total_campaigns: data?.total_campaigns ?? 62,
    total_budget: data?.total_budget ?? 1180517,
  };

  const cards = [
    {
      label: "Avg. Budget / Campaign",
      value: `$${safeData.avg_budget_per_campaign.toLocaleString()}`,
      icon: <MdAttachMoney size={32} />,
    },
    {
      label: "Avg. Campaigns / Brand",
      value: safeData.avg_campaigns_per_brand.toFixed(2),
      icon: <MdBarChart size={32} />,
    },
    {
      label: "Total Campaigns",
      value: safeData.total_campaigns,
      icon: <MdCampaign size={32} />,
    },
    {
      label: "Total Budget",
      value: `$${safeData.total_budget.toLocaleString()}`,
      icon: <MdBusinessCenter size={32} />,
    },
  ];

  return (
    <div className="flex-1 h-full p-4 rounded-xl shadow bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Heading */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Campaign Financial & Performance Metrics
        </h2>
      </div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-4 flex-1">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-center items-center text-center rounded-lg border p-6 bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200"
          >
            <div className="mb-2 text-indigo-600 dark:text-indigo-300 border rounded-full p-2">
              {card.icon}
            </div>
            <p className="text-sm font-medium mb-1">{card.label}</p>
            <p className="text-xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
