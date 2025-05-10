// components/home/content.tsx
"use client";
import React from "react";
import dynamic from "next/dynamic";
// import { TableWrapper } from "../table/table";
import { TaskCountCard } from "./card-balance1";
// import { CardBalance2 } from "./card-balance2";
// import { CardBalance3 } from "./card-balance3";
// import { CardAgents } from "./card-agents";
// import { Link } from "@heroui/react";
import NextLink from "next/link";

// Dynamically import charts
// const Chart = dynamic(() => import("../charts/steam"), { ssr: false });
// const PieChart = dynamic(
//   () => import("../charts/pieChart").then((mod) => mod.RadialBarChart),
//   { ssr: false }
// );
// const MixedChart = dynamic(
//   () => import("../charts/mixedChart").then((mod) => mod.MixedChart),
//   { ssr: false }
// );
// const TotalCountsChart = dynamic(
//   () => import("../charts/total-counts-charts"),
//   { ssr: false }
// );
// const RenewalRequestsChart = dynamic(
//   () => import("../charts/renewal-request"),
//   { ssr: false }
// );

export const Content = ({ stats }: { stats: any }) => (
  <div className="h-full lg:px-6">
    <div className="flex flex-col gap-2 mx-5 md:mx-0">
      <h3 className="text-xl font-semibold mt-5">All Stats</h3>

      {/* TOP MINIMAL STATS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 grid-cols-1 gap-5 justify-center w-full">
        <TaskCountCard
          title="Total Admins"
          count={stats?.total_admin_users + 1}
          subtitle=""
          color="white"
          chartColor="orange-500"
        />
        <TaskCountCard
          title="InActive Users"
          count={
            stats?.user_stats?.active_users?.find(
              (user: { status: string; count: number }) =>
                user.status === "inactive"
            )?.count || 0
          }
          subtitle=""
          color="white"
          chartColor="orange-500"
        />
        <TaskCountCard
          title="Total Messages"
          count={stats?.chat_stats?.total_messages || 0}
          subtitle=""
          color="white"
          chartColor="orange-500"
        />
        <TaskCountCard
          title="Total Chats Initiated"
          count={stats?.chat_stats?.total_chats || 0}
          subtitle=""
          color="white"
          chartColor="orange-500"
        />
      </div>

      {/* BOTTOM PART CHARTS / METRICS */}
      <div className="flex flex-col xl:flex-row  gap-4 mt-4">
        
      </div>
    </div>
  </div>
);
