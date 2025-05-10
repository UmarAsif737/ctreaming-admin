"use client";

import React, { useState } from "react";
import { Input, Button } from "@heroui/react";
import { TableWrapper } from "@/components/table/table";
import { IDriver, IMeta } from "@/helpers/types";
import { RenderCell } from "./render-cell";
import { Loader2 } from "lucide-react";

export const Drivers = ({
  data,
  meta,
  loading,
  isRenewalDrivers,
  onToggleDrivers,
  onSearch,
}: {
  data: IDriver[];
  meta: IMeta;
  loading: boolean;
  isRenewalDrivers: boolean;
  onToggleDrivers: () => void;
  onSearch: (term: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const columns = [
    { name: "DRIVER NAME", uid: "name" },
    { name: "DRIVER PHOTO", uid: "photo" },
    { name: "COMPANY ID", uid: "company_id" },
    { name: "CREATED AT", uid: "createdAt" },
    { name: "ACTIONS", uid: "actions" },
  ];

  return (
    <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <h3 className="text-xl font-semibold">
            {isRenewalDrivers ? "Drivers with Renewal Requests" : "All Drivers"}
          </h3>
        </div>
        <div className="flex gap-x-4">
          <Button variant="solid" color="primary" onClick={onToggleDrivers}>
            {isRenewalDrivers
              ? "View All Drivers"
              : "View Drivers with Renewal"}
          </Button>
          <div className="flex flex-wrap gap-4 items-center mb-4">
            <Input
              placeholder="Search by name..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ width: "100%", maxWidth: "300px" }}
            />
          </div>
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        {loading ? (
          <div className="h-full w-full mt-10 flex flex-col justify-center items-center">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p>Loading...</p>
          </div>
        ) : (
          <TableWrapper
            meta={meta}
            RenderCell={RenderCell}
            data={data}
            columns={columns}
          />
        )}
      </div>
    </div>
  );
};
