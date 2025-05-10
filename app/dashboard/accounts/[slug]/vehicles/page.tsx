"use client";

import React, { useEffect, useState } from "react";
import { Pagination, Tooltip, Link } from "@heroui/react";
import { ArrowLeft, Trash2, Loader2, FileSearch2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { getUserVehicles } from "@/actions/user.action";
import { deleteVehicle } from "@/actions/vehicle-action";
import { toast } from "sonner";
import VehicleModal from "@/components/vehicles/vehicle-modal";

const AllVehicles = () => {
  const pathname = usePathname();
  const userId = pathname.split("/")[3];

  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    limit: 10,
    totalItems: 0,
  });

  const fetchVehicles = async (page: number) => {
    setLoading(true);
    try {
      const result = await getUserVehicles(userId, {
        limit: pagination.limit,
        page,
      });
      if (result.error) {
        setError(result.error);
      } else {
        setVehicles(result.data);
        setPagination({
          currentPage: page,
          totalPages: result.meta.total_pages,
          limit: pagination.limit,
          totalItems: result.meta.total_items,
        });
      }
    } catch (err) {
      setError("An error occurred while fetching user vehicles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchVehicles(pagination.currentPage);
    }
  }, [userId]);

  const handlePageChange = (page: number) => {
    fetchVehicles(page);
  };

  const handleDeleteVehicle = async (id: string) => {
    toast.promise(
      deleteVehicle(id).then((res) => {
        if (res.error) {
          throw Error(res.error);
        }
        fetchVehicles(pagination.currentPage);
        return res;
      }),
      {
        loading: "Deleting vehicle...",
        success: "Vehicle deleted successfully.",
        error: "Failed to delete vehicle.",
      }
    );
  };

  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <Loader2 size={28} className="animate-spin" />
          <p>Loading User Vehicles...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 text-center">
        {error || "An error occurred while fetching user vehicles."}
      </div>
    );

  return (
    <div className="p-6 bg-white dark:bg-black min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100text-left">
        <p className="flex justify-start items-center gap-x-2">
          <Link href={`/dashboard/accounts/${userId}`}>
            <ArrowLeft size={24} className="text-gray-800 dark:text-gray-100" />
          </Link>
          <span className="text-gray-800 dark:text-gray-100">
            All User Vehicles
          </span>
        </p>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {vehicles.map((vehicle: any) => (
          <div
            key={vehicle.vehicle.id}
            className="bg-[#c4e9c9] rounded-3xl shadow-custom-black dark:shadow-custom-green border border-black p-6"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {vehicle.vehicle.make} {vehicle.vehicle.model} (
                  {vehicle.vehicle.year})
                </h2>
                <p className="text-gray-600">
                  VIN: {vehicle.vehicle.vehicle_identification_number}
                </p>
              </div>
              <div className="flex justify-center items-start gap-x-4">
                <Tooltip content="Vehicle Details">
                  <Link href={`/dashboard/vehicles/${vehicle.vehicle.id}`}>
                    <FileSearch2
                      size={24}
                      className="text-gray-800 cursor-pointer"
                    />
                  </Link>
                </Tooltip>
                <Tooltip content="Delete Vehicle">
                  <VehicleModal
                    button={
                      <Trash2
                        size={24}
                        className="text-red-500 cursor-pointer"
                      />
                    }
                    mode="Delete"
                    data={vehicle}
                    onConfirm={handleDeleteVehicle}
                  />
                </Tooltip>
              </div>
            </div>
            <div className="mt-4 border-t border-black border-opacity-50 pt-4">
              <h3 className="text-sm font-semibold text-gray-700">
                Documents:
              </h3>
              <ul className="list-disc list-inside">
                {vehicle.vehicle.vehicle_documents.map((doc: any) => (
                  <li key={doc.id} className="text-sm text-gray-600">
                    {doc.type}:{" "}
                    <a
                      href={doc.document}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Document
                    </a>{" "}
                    - Expiry: {new Date(doc.expiry_date).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <Pagination
          total={pagination.totalPages}
          showControls
          onChange={(page) => handlePageChange(page)}
          initialPage={pagination.currentPage}
          variant="flat"
        />
      </div>
    </div>
  );
};

export default AllVehicles;
