import React from "react";
import { getAllRenewalRequests } from "@/actions/documents-action";
import { getDriverRenewalRequests } from "@/actions/driver-action";
import Error from "@/components/error";
import { AccountsWrapper } from "@/components/renewal-requests/accounts-wrapper";

const accounts = async ({
  searchParams,
}: {
  searchParams: { page?: number; limit?: number; query?: string };
}) => {
  const { error, data, meta } = await getAllRenewalRequests({
    page: searchParams.page,
    limit: searchParams.limit,
    query: searchParams.query,
  });

  const { DriverError, DriverData, DriverMeta } =
    await getDriverRenewalRequests();

  if (!meta) return <Error error={error || "No Data found"} />;
  if (!DriverMeta) return <Error error={DriverError || "No Data found"} />;

  return (
    <AccountsWrapper
      data={data!}
      meta={meta}
      driverData={DriverData!}
      driverMeta={DriverMeta}
    />
  );
};

export default accounts;
