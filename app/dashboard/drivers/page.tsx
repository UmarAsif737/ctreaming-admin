"use client";

import React, { useState, useEffect } from "react";
import { Drivers } from "@/components/drivers";
import { getAllDrivers } from "@/actions/driver-action";
import Error from "@/components/error";
import { IMeta, IDriver } from "@/helpers/types";

const defaultMeta: IMeta = {
  current_page: 1,
  page_items: 0,
  total_items: 0,
  total_pages: 1,
};

const DriversPage = ({
  searchParams,
}: {
  searchParams: { page?: number; limit?: number; query?: string };
}) => {
  const [data, setData] = useState<IDriver[]>([]);
  const [meta, setMeta] = useState<IMeta>(defaultMeta);
  const [loading, setLoading] = useState(true);
  const [isRenewalDrivers, setIsRenewalDrivers] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchDrivers = async (params: {
    page?: number;
    limit?: number;
    query?: string;
    search?: string;
    is_document_assistance_enabled?: boolean;
  }) => {
    setLoading(true);
    const {
      error,
      data: driversData,
      meta: driversMeta,
    } = await getAllDrivers(params);
    if (error) {
      setData([]);
      setMeta(defaultMeta);
    } else {
      setData(driversData || []);
      setMeta(driversMeta || defaultMeta);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDrivers({
      page: searchParams.page,
      limit: searchParams.limit,
      search: searchTerm || "",
      is_document_assistance_enabled: isRenewalDrivers,
    });
  }, [searchParams.page, searchParams.limit, searchTerm, isRenewalDrivers]);

  const handleToggleDrivers = () => {
    setIsRenewalDrivers((prev) => !prev);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  if (!meta) return <Error error={"No Data Found"} />;

  return (
    <Drivers
      data={data}
      meta={meta}
      loading={loading}
      isRenewalDrivers={isRenewalDrivers}
      onToggleDrivers={handleToggleDrivers}
      onSearch={handleSearch}
    />
  );
};

export default DriversPage;
