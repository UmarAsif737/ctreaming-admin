"use client";

import { MdCampaign } from "react-icons/md";
import { useTheme } from "next-themes";

type Props = {
  total: number;
  active_campaigns: number;
  completed_campaigns: number;
  assigned_campaigns: number;
};

export default function CampaignsByStatus({ data: dynamicData }: { data: Props }) {
  const { theme } = useTheme();

  const data = {
    total: dynamicData?.total || 13,
    active_campaigns: dynamicData?.active_campaigns || 8,
    completed_campaigns: dynamicData?.completed_campaigns || 1,
    assigned_campaigns: dynamicData?.assigned_campaigns || 4,
  };

  // Theme-based color utility
  const getStyles = (type: "active" | "assigned" | "completed") => {
    const themes = {
      active: {
        light: {
          bg: "#E0F2FE",
          border: "#38BDF8",
          text: "#0284C7",
        },
        dark: {
          bg: "#0C4A6E",
          border: "#38BDF8",
          text: "#E0F2FE",
        },
      },
      assigned: {
        light: {
          bg: "#FEF9C3",
          border: "#FACC15",
          text: "#CA8A04",
        },
        dark: {
          bg: "#3A3000",
          border: "#FACC15",
          text: "#FEF9C3",
        },
      },
      completed: {
        light: {
          bg: "#D1FAE5",
          border: "#34D399",
          text: "#059669",
        },
        dark: {
          bg: "#064E3B",
          border: "#34D399",
          text: "#D1FAE5",
        },
      },
    };

    return themes[type][theme === "dark" ? "dark" : "light"];
  };

  return (
    <div className="p-6 rounded-xl shadow flex-1 flex flex-col bg-white dark:bg-[#0f172a] border-1 border-borderGray transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Campaign Distribution by Status
        </h2>
      </div>

      <div className="flex flex-row gap-3 h-full">
        {/* All Campaigns */}
        <div
          className="flex flex-col items-center justify-center border-2 flex-1 gap-2 rounded-lg px-4 py-6"
          style={{
            backgroundColor: theme === "dark" ? "#1F2937" : "#F3F4F6",
            borderColor: theme === "dark" ? "#6B7280" : "#9CA3AF",
          }}
        >
          <div
            className="w-14 h-14 flex items-center justify-center rounded-full"
            style={{
              backgroundColor: theme === "dark" ? "#374151" : "#E5E7EB",
            }}
          >
            <MdCampaign color={theme === "dark" ? "#F9FAFB" : "#1F2937"} size={36} />
          </div>
          <p className="font-semibold text-sm text-gray-700 dark:text-gray-300">
            All Campaigns
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {data.total}
          </p>
        </div>

        {/* Status Section */}
        <div className="flex-1 flex flex-col gap-3">
          {/* Active */}
          <Card label="Active" count={data.active_campaigns} style={getStyles("active")} />
          <Card label="Assigned" count={data.assigned_campaigns} style={getStyles("assigned")} />
          <Card label="Completed" count={data.completed_campaigns} style={getStyles("completed")} />
        </div>
      </div>
    </div>
  );
}

function Card({
  label,
  count,
  style,
}: {
  label: string;
  count: number;
  style: { bg: string; border: string; text: string };
}) {
  return (
    <div
      className="flex flex-col items-center justify-center border-2 rounded-lg flex-1 py-4"
      style={{
        backgroundColor: style.bg,
        borderColor: style.border,
        color: style.text,
      }}
    >
      <p className="font-medium text-sm">{label}</p>
      <p className="text-3xl font-bold">{count}</p>
    </div>
  );
}
