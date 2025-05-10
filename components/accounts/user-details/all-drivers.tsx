import React from "react";
import { Driver } from "@/helpers/types";
import Link from "next/link";

interface DriversCardProps {
  drivers: Driver[];
  userId: number;
}

const DriversCard: React.FC<DriversCardProps> = ({ drivers, userId }) => {
  return (
    <div className="bg-[#f3f3f3] dark:bg-[#18181b] text-black dark:text-gray-200 p-6 rounded-3xl shadow-custom-black dark:shadow-custom-white border border-black dark:border-white mt-8">
      <div className="w-full h-full flex justify-between items-center mb-4">
        <h2 className="text-2xl font-medium">Drivers</h2>
        {drivers.length > 0 ? (
          <Link
            href={`/dashboard/accounts/${userId}/drivers`}
            className="px-2 py-1 rounded-full bg-white dark:bg-black  border border-black dark:border-white shadow-custom-black dark:shadow-custom-white text-sm"
          >
            See All Drivers
          </Link>
        ) : null}
      </div>
      {drivers.length > 0 ? (
        drivers.map((driver) => (
          <div
            key={driver.id}
            className="border-t border-black dark:border-white text-gray-600 dark:text-gray-300 border-opacity-50 py-4 first:border-t-0"
          >
            <p className="text-sm ">
              <span className="font-semibold">Name:</span> {driver.name}
            </p>
            <p className="text-sm ">
              <span className="font-semibold">License Number:</span>{" "}
              {driver.license_number}
            </p>
            <p className="text-sm ">
              <span className="font-semibold">Phone:</span>{" "}
              {driver.phone_number}
            </p>
            <p className="text-sm ">
              <span className="font-semibold">Added On:</span>{" "}
              {new Date(driver.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No drivers assigned.</p>
      )}
    </div>
  );
};

export default DriversCard;
