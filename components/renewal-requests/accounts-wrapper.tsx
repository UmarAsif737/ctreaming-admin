"use client";

import React, { useState } from "react";
import { RenewalRequests } from "@/components/renewal-requests";
import { DriverRenewalRequests } from "@/components/renewal-requests/driver-renewal";
import { getAllRenewalRequests } from "@/actions/documents-action";
import { getDriverRenewalRequests } from "@/actions/driver-action";
import { IMeta, IRenewalRequest } from "@/helpers/types";

interface AccountsWrapperProps {
  data: IRenewalRequest[];
  meta: IMeta;
  driverData: any[];
  driverMeta: IMeta;
}

export const AccountsWrapper = ({
  data,
  meta,
  driverData,
  driverMeta,
}: AccountsWrapperProps) => {
  const [vehicleData, setVehicleData] = useState(data);
  const [vehicleMeta, setVehicleMeta] = useState(meta);
  const [driverRenewalData, setDriverRenewalData] = useState(driverData);
  const [driverRenewalMeta, setDriverRenewalMeta] = useState(driverMeta);
  const [refreshKey, setRefreshKey] = useState(0); // Force re-render key

  const handleRefresh = async () => {
    try {
      const { data: newData, meta: newMeta } = await getAllRenewalRequests({});
      const { DriverData: newDriverData, DriverMeta: newDriverMeta } =
        await getDriverRenewalRequests();

      setVehicleData(newData);
      setVehicleMeta(newMeta);
      setDriverRenewalData(newDriverData);
      setDriverRenewalMeta(newDriverMeta);

      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Failed to refresh data:", error);
    }
  };

  return (
    <div key={refreshKey}>
      <RenewalRequests
        data={vehicleData}
        meta={vehicleMeta}
        onRefresh={handleRefresh}
      />
      <DriverRenewalRequests
        data={driverRenewalData}
        meta={driverRenewalMeta}
        onRefresh={handleRefresh}
      />
    </div>
  );
};
