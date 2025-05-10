"use client";

import { MdCampaign } from "react-icons/md";

type Props = {
  total: number;
  active_campaigns: number;
  completed_campaigns: number;
  assigned_campaigns: number;
};

export default function UsersStatsByType({
  data: dynamicData,
}: {
  data: Props;
}) {
  const data = {
    total: dynamicData?.total || 13,
    active_campaigns: dynamicData?.active_campaigns || 8,
    completed_campaigns: dynamicData?.completed_campaigns || 1,
    assigned_campaigns: dynamicData?.assigned_campaigns || 4,
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow  flex-1 flex flex-col ">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Campaign Distribution by Status
        </h2>
      </div>

      <div className="flex flex-row gap-2 h-full flex-1">
        <div className="bg-gray-50/50 flex flex-col items-center justify-center border-[#FFDF88]/50 border-2 flex-1 gap-1 rounded-sm">
          <div className="w-14 h-14 border-2 border-red-500 flex items-center justify-center rounded-full">
            <MdCampaign color="red" size={40} />
          </div>

          <p className="text-black font-semibold text-md sm:text-lg">
            All Campaigns
          </p>

          <p className="text-2xl sm:text-4xl text-red-500 font-bold ">
            {data.total}
          </p>
        </div>

        <div className="flex-1 flex flex-col gap-2 text-black">
          <div className="bg-gray-50 flex flex-col items-center justify-center border-red-600 border-2 bg-red-100/40 rounded-sm flex-1 gap-1">
            <p className="text-black font-semibold text-md sm:text-lg">
              Active
            </p>

            <p className="text-2xl sm:text-4xl  font-bold">
              {data.active_campaigns}
            </p>
          </div>

          <div className="bg-gray-50 flex flex-col items-center justify-center border-2 border-[#FFD63A] bg-[#FFD63A]/15 rounded-sm flex-1 gap-1">
            <p className="text-black font-semibold text-md sm:text-lg">
              Assigned
            </p>

            <p className="text-2xl sm:text-4xl  font-bold">
              {data.assigned_campaigns}
            </p>
          </div>

          <div className="bg-gray-50 flex flex-col items-center justify-center border-2 border-[#FFF085] bg-[#FFF085]/15 rounded-sm flex-1 gap-1">
            <p className="text-black font-semibold text-md sm:text-lg">
              Completed
            </p>

            <p className="text-2xl sm:text-4xl  font-bold">
              {data.completed_campaigns}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
