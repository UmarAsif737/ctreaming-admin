"use client";

import React, { useEffect, useState } from "react";
import { getUserDrivers } from "@/actions/user.action";
import { ArrowLeft, Loader2, Trash2 } from "lucide-react";
import Error from "@/components/error";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { deleteDriver } from "@/actions/driver-action";
import { toast } from "sonner";
import { Tooltip } from "@heroui/react";
import { IMAGES } from "@/public";

const AllDrivers = () => {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const pathname = usePathname();
  const router = useRouter();
  const userId = pathname.split("/")[3];
  console.log("🚀 ~ AllVehicles ~ userId:", userId);

  useEffect(() => {
    if (userId) {
      (async () => {
        try {
          const result = await getUserDrivers(userId);
          if (result.error) {
            setError(result.error);
          } else {
            setDrivers(result.data);
          }
        } catch (err) {
          setError("An error occurred while fetching user details.");
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [userId]);

  const handleDeleteDriver = async (id: string) => {
    toast.promise(
      deleteDriver(id).then((res) => {
        if (res.error) {
          throw Error(res.error);
        }
        router.refresh();
        return res;
      }),
      {
        loading: "Deleting driver...",
        success: "Driver deleted successfully.",
        error: "Failed to delete driver.",
      }
    );
  };

  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <Loader2 size={28} className="animate-spin" />
          <p>Loading User Drivers...</p>
        </div>
      </div>
    );
  if (error)
    return (
      <Error
        error={error || "An error occurred while fetching user vehicles."}
      />
    );
  return (
    <div className="p-6 bg-white dark:bg-black min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100 text-left">
        <p className="flex justify-start items-center gap-x-2">
          <Link href={`/dashboard/accounts/${userId}`}>
            <ArrowLeft size={24} />
          </Link>
          <span>All User Drivers</span>
        </p>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
        {drivers.map((driver: any) => (
          <div
            key={driver.id}
            className="bg-[#f3f3f3] dark:bg-[#18181b] rounded-3xl shadow-custom-black dark:shadow-custom-white p-6 border border-black dark:border-white"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  {driver.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Created At: {new Date(driver.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Image
                  src={driver.photo ?? IMAGES.DEFAULT_USER}
                  alt={driver.name}
                  width={60}
                  height={60}
                  className="w-14 h-14 rounded-lg border border-gray-300 object-cover"
                />
                <div>
                  <Tooltip content="Delete Vehicle">
                    <Trash2
                      size={24}
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDeleteDriver(driver.id)}
                    />
                  </Tooltip>
                </div>
              </div>
            </div>

            {/* Driver Documents */}
            <div>
              <h3 className="text-lg font-medium mb-2">Documents:</h3>
              <ul className="list-disc list-inside text-sm">
                {driver.driver_documents.map((doc: any) => (
                  <li key={doc.id}>
                    <span className="font-medium capitalize">{doc.type}:</span>{" "}
                    <Link
                      href={doc.document}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Document
                    </Link>{" "}
                    - Expiry: {new Date(doc.expiry_date).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllDrivers;
