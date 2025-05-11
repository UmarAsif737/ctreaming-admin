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
import CampaignsByStatus from "./stats/campaigns-by-status";
import CampaignMetrics from "./stats/campaign-metrics";
import VerifiedAndUnVerifiedChart from "./stats/verified-unverified-chart";
import TotalCountsChartByUserType from "./stats/users-count-chart";

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
        <CampaignsByStatus
          data={{
            active_campaigns:
              stats?.campaign_stats?.campaigns_by_status?.find(
                (campWithStatus: { _id: string; count: number }) =>
                  campWithStatus._id === "active"
              )?.count || 0,
            assigned_campaigns:
              stats?.campaign_stats?.campaigns_by_status?.find(
                (campWithStatus: { _id: string; count: number }) =>
                  campWithStatus._id === "assigned"
              )?.count || 0,
            completed_campaigns:
              stats?.campaign_stats?.campaigns_by_status?.find(
                (campWithStatus: { _id: string; count: number }) =>
                  campWithStatus._id === "completed"
              )?.count || 0,
          }}
        />
        <CampaignMetrics
          data={{
            total_campaigns: stats?.campaign_stats?.total_campaigns || 0,
            avg_budget_per_campaign:
              stats?.campaign_stats?.avg_budget_per_campaign || 0,
            avg_campaigns_per_brand:
              stats?.campaign_stats?.avg_campaigns_per_brand || 0,
            total_budget: stats?.campaign_stats?.total_budget || 0,
          }}
        />
      </div>

      {/* Last Charts Part!! */}
      <div className="flex justify-center gap-4 xl:gap-6 pt-3 px-4 lg:px-0 flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
        <div className="mt-6 gap-6 flex flex-col w-full">
          {/* Right Chart */}
          <div className="h-full flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Users Count by Type</h3>
            <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6">
              <TotalCountsChartByUserType
                data={[
                  stats?.user_stats?.users_by_type?.find(
                    (user: { count: number; _id: string }) =>
                      user?._id === "brand"
                  )?.count || 0,
                  stats?.user_stats?.users_by_type?.find(
                    (user: { count: number; _id: string }) =>
                      user?._id === "creator"
                  )?.count,
                  stats?.user_stats?.users_by_type?.find(
                    (user: { count: number; _id: string }) =>
                      user?._id === "publisher"
                  )?.count,
                  stats?.user_stats?.users_by_type?.find(
                    (user: { count: number; _id: string }) =>
                      user?._id === "ctv"
                  )?.count,

                  stats?.user_stats?.users_by_type?.find(
                    (user: { count: number; _id: string }) =>
                      user?._id === "not set"
                  )?.count,
                ]}
              />
            </div>
          </div>
        </div>

        {/* Left Section */}
        <div className="mt-6 gap-2 flex flex-col xl:max-w-md w-full h-full">
          <h3 className="text-xl font-semibold">
            Verified & Non-Verified Users
          </h3>
          <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6">
            <VerifiedAndUnVerifiedChart verified={10} nonVerified={2} />
          </div>
        </div>
      </div>
    </div>
  </div>
);
