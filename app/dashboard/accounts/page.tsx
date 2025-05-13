"use client";

import React, { useState, useEffect } from "react";
import { Accounts } from "@/components/accounts";
import { getAllUsers } from "@/actions/user.actions";
import Error from "@/components/error";
import { IMeta, IUser } from "@/types/index.types";

const defaultMeta: IMeta = {
  current_page: 1,
  page_items: 0,
  total_items: 0,
  total_pages: 1,
};

const AccountsPage = ({
  searchParams,
}: {
  searchParams: { page?: number; limit?: number; query?: string };
}) => {
  const [data, setData] = useState<IUser[]>([]);
  const [meta, setMeta] = useState<IMeta>(defaultMeta);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async (params: {
    page?: number;
    limit?: number;
    query?: string;
    search?: string;
  }) => {
    setLoading(true);
    const {
      error,
      data: usersData,
      meta: usersMeta,
    } = await getAllUsers(params);
    if (error) {
      setData([]);
      setMeta(defaultMeta);
    } else {
      setData(usersData || []);
      setMeta(usersMeta || defaultMeta);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers({
      page: searchParams.page,
      limit: searchParams.limit,
      search: searchTerm || "",
    });
  }, [searchParams.page, searchParams.limit, searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  if (!meta) return <Error error={"No Data Found"} />;

  return (
    <Accounts
      data={data}
      meta={meta}
      loading={loading}
      onSearch={handleSearch}
      fetchFreshData={fetchUsers}
      searchTerm={searchTerm}
    />
  );
};

export default AccountsPage;
