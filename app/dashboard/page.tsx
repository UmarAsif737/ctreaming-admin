// pages/index.tsx
import { getDashboardStats } from "@/actions/dashboard-stats.actions";
import { Content } from "@/components/home/content";
import dynamic from "next/dynamic";

// const TotalCountsChart = dynamic(
//   () => import("@/components/charts/total-counts-charts"),
//   { ssr: false }
// );
// const RenewalRequestsChart = dynamic(
//   () => import("@/components/charts/renewal-request"),
//   { ssr: false }
// );

const Home = async () => {
  const { data, error } = await getDashboardStats();

  if (!data || error) {
    return <div>Error loading data</div>;
  }

  return <Content stats={data} />;
};

export default Home;
