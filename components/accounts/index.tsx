"use client";

import React, { useState } from "react";
import { Button, Input } from "@heroui/react";
import { TableWrapper } from "@/components/table/table";
import { IMeta, IUser } from "@/types/index.types";
import { RenderCell } from "./render-cell";
import { Loader2 } from "lucide-react";

export const Accounts = ({
  data,
  meta,
  loading,
  isAssistedUsers,
  onToggleUsers,
  onSearch,
  searchTerm: search,
  fetchFreshData = (params: {
    page?: number;
    limit?: number;
    query?: string;
    search?: string;
  }) => {},
}: {
  data: IUser[];
  meta: IMeta;
  loading: boolean;
  isAssistedUsers: boolean;
  onToggleUsers: () => void;
  onSearch: (term: string) => void;
  fetchFreshData?: any;
  searchTerm: string;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  console.log({ data });
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const columns = [
    { name: "FULL NAME", uid: "name" },
    { name: "EMAIL", uid: "email" },

    { name: "TYPE", uid: "type" },
    { name: "CATEGORY", uid: "category" },
    { name: "CITY", uid: "city" },
    { name: "IS VERIFIED", uid: "is_verified" },

    { name: "CREATED AT", uid: "createdAt" },
    { name: "ACTIONS", uid: "actions" },
  ];

  return (
    <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <h3 className="text-xl font-semibold">All Users</h3>
        </div>
        <div className="flex gap-x-4">
          <div className="flex flex-wrap gap-4 items-center mb-4">
            <Input
              placeholder="Search by email..."
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
            fetchFreshData={fetchFreshData}
            isAssistedUsers={isAssistedUsers}
            search={search}
          />
        )}
      </div>
    </div>
  );
};
