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
    </div>
    <div className="flex justify-center gap-4 xl:gap-6 pt-3 px-4 lg:px-0 flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
      {/* <div className="mt-6 gap-6 flex flex-col w-full">
        <div className="h-full flex flex-col gap-2">
          <h3 className="text-xl font-semibold">Total Counts</h3>
          <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6">
            <TotalCountsChart
              data={[
                stats.total_users,
                stats.total_vehicles,
                stats.total_vehicle_documents,
                stats.total_driver_documents,
                stats.total_drivers,
                stats.total_forms,
              ]}
            />
          </div>
        </div>
      </div> */}

      {/* Left Section */}
      <div className="mt-4 gap-2 flex flex-col xl:max-w-md w-full">
        {/* <h3 className="text-xl font-semibold">Renewal Requests by Status</h3> */}
        {/* <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6">
          <RenewalRequestsChart
            data={Number(stats.renewal_requests_by_status.request_initiated)}
          />
        </div> */}

        {/* Pie Chart */}
        {/* <div className="h-full flex flex-col gap-2">
          <h3 className="text-xl font-semibold">Statistics</h3>
          <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6">
            <PieChart />
          </div>
        </div> */}
      </div>
    </div>

    {/* Mixed Statistics Chart */}
    {/* <div className="flex flex-col justify-center w-full py-5 px-4 lg:px-0 max-w-[90rem] mx-auto gap-3">
      <div className="h-full flex flex-col gap-2">
        <h3 className="text-xl font-semibold">Mixed Statistics</h3>
        <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6">
          <MixedChart />
        </div>
      </div>
    </div> */}
  </div>
);
