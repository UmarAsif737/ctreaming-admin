"use client";

import React, { useState, useEffect } from "react";
import { Vehicles } from "@/components/vehicles";
import { getAllVehicles } from "@/actions/vehicle-action";
import Error from "@/components/error";
import { IMeta, IVehicle } from "@/helpers/types";

const defaultMeta: IMeta = {
  current_page: 1,
  page_items: 0,
  total_items: 0,
  total_pages: 1,
};

const VehiclesPage = ({
  searchParams,
}: {
  searchParams: { page?: number; limit?: number; query?: string };
}) => {
  const [data, setData] = useState<IVehicle[]>([]);
  const [meta, setMeta] = useState<IMeta>(defaultMeta);
  const [loading, setLoading] = useState(true);
  const [isRenewalVehicles, setIsRenewalVehicles] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchVehicles = async (params: {
    page?: number;
    limit?: number;
    query?: string;
    search?: string;
    is_document_assistance_enabled?: boolean;
  }) => {
    setLoading(true);
    const {
      error,
      data: vehiclesData,
      meta: vehiclesMeta,
    } = await getAllVehicles(params);
    if (error) {
      setData([]);
      setMeta(defaultMeta);
    } else {
      setData(vehiclesData || []);
      setMeta(vehiclesMeta || defaultMeta);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVehicles({
      page: searchParams.page,
      limit: searchParams.limit,
      search: searchTerm || "",
      is_document_assistance_enabled: isRenewalVehicles,
    });
  }, [searchParams.page, searchParams.limit, searchTerm, isRenewalVehicles]);

  const handleToggleVehicles = () => {
    setIsRenewalVehicles((prev) => !prev);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  if (!meta) return <Error error={"No Data Found"} />;

  return (
    <Vehicles
      data={data}
      meta={meta}
      loading={loading}
      isRenewalVehicles={isRenewalVehicles}
      onToggleVehicles={handleToggleVehicles}
      onSearch={handleSearch}
    />
  );
};

export default VehiclesPage;
