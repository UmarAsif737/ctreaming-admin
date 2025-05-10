"use client";
import { Input } from "@heroui/react";
import React, { useState, useEffect } from "react";
import { TableWrapper } from "@/components/table/table";
import { IMeta, IRenewalRequest, IUser } from "@/helpers/types";
import { RenderCell } from "./render-cell";
import { createUser, getAllUsers } from "@/actions/user.action";
import { toast } from "sonner";

export const RenewalRequests = ({
  data,
  meta,
  onRefresh,
}: {
  data: IRenewalRequest[];
  meta: IMeta;
  onRefresh: () => Promise<void>;
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [users, setUsers] = useState<IRenewalRequest[]>(data);
  const [pagination, setPagination] = useState<IMeta>(meta);

  const columns = [
    { name: "USERNAME", uid: "vehicle_document.vehicle.user.name" },
    { name: "DOCUMENT TYPE", uid: "vehicle_document.type" },
    { name: "DOCUMENT FILE", uid: "vehicle_document.document" },
    {
      name: "VIN",
      uid: "vehicle_document.vehicle.vehicle_identification_number",
    },
    { name: "USER TYPE", uid: "vehicle_document.vehicle.user.type" },
    { name: "CREATED AT", uid: "createdAt" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];

  return (
    <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <h3 className="text-xl font-semibold">Vehicle Renewal Request</h3>
        </div>
      </div>

      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper
          meta={isSearching ? undefined : pagination}
          RenderCell={(props) => (
            <RenderCell {...props} onRefresh={onRefresh} />
          )}
          data={users}
          columns={columns}
        />
      </div>
    </div>
  );
};
