"use client";

import React, { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getDriverDetails, getDriverDocuments } from "@/actions/driver-action";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import DocumentUpdateModal from "@/components/renewal-requests/renewal-modal";
import { EditIcon } from "@/components/icons/table/edit-icon";
import { toast } from "sonner";
import {
  updateDriverRenewalRequest,
  updateRenewalRequest,
} from "@/actions/documents-action";
import Image from "next/image";
import { IMAGES } from "@/public";

const DriverDetails = () => {
  const pathname = usePathname();
  const driverId = pathname.split("/").pop();
  const router = useRouter();

  const [driverData, setDriverData] = useState<any | null>(null);
  const [driverDocuments, setDriverDocuments] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDriverData = useCallback(async () => {
    setLoading(true);
    try {
      const [driverDetailsResult, driverDocumentsResult] = await Promise.all([
        getDriverDetails(driverId!),
        getDriverDocuments(driverId!),
      ]);

      if (driverDetailsResult.error) {
        setError(driverDetailsResult.error);
      } else {
        setDriverData(driverDetailsResult.data);
      }

      if (driverDocumentsResult.error) {
        setError(driverDocumentsResult.error);
      } else {
        setDriverDocuments(driverDocumentsResult.data);
      }
    } catch (err) {
      setError("An error occurred while fetching driver data.");
    } finally {
      setLoading(false);
    }
  }, [driverId]);

  const handleDocumentUpdate = async (id: string, formData: FormData) => {
    try {
      const result = await updateDriverRenewalRequest(id, formData);
      if (result.error) {
        throw new Error(result.error);
      }
      toast.success("Document updated successfully!");

      await fetchDriverData();
    } catch (error) {
      console.error("Error updating document:", error);
      toast.error("An error occurred while updating the document.");
    }
  };

  useEffect(() => {
    if (driverId) {
      fetchDriverData();
    }
  }, [driverId, fetchDriverData]);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <Loader2 size={28} className="animate-spin" />
          <p>Loading Driver Details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!driverData) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-red-500">No driver data found.</p>
      </div>
    );
  }

  const { user } = driverData;

  return (
    <div className="p-6 md:p-8 min-h-screen bg-white dark:bg-black">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
        <div className="flex items-center gap-x-2">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-800 dark:text-gray-100"
          >
            <ArrowLeft size={24} />
          </button>
          <span>Driver Details</span>
        </div>
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-3/5 flex flex-col bg-gray-100 dark:bg-[#18181b] p-6 rounded-3xl shadow-custom-black dark:shadow-custom-white border border-black dark:border-white">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-100">
            Driver Information
          </h2>
          <div className="flex justify-start items-center gap-x-8">
            {driverData.photo ? (
              <Link
                href={driverData.photo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={driverData.photo}
                  alt={driverData.name}
                  width={120}
                  height={120}
                  className="object-cover rounded-lg border border-gray-300"
                />
              </Link>
            ) : (
              <Image
                src={IMAGES.DEFAULT_USER}
                alt="default"
                width={120}
                height={120}
                className="object-cover rounded-lg border border-gray-300"
              />
            )}
            <div className="text-gray-600 dark:text-gray-300">
              <p>
                <span className="font-medium">Name:</span> {driverData.name}
              </p>
              <p>
                <span className="font-medium">Company ID:</span>{" "}
                {driverData.company_id}
              </p>
              <p>
                <span className="font-medium">Created At:</span>{" "}
                {new Date(driverData.createdAt).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Updated At:</span>{" "}
                {new Date(driverData.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="md:w-2/5 bg-gray-100 dark:bg-[#18181b] p-6 rounded-3xl shadow-custom-black dark:shadow-custom-white border border-black dark:border-white">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-100">
            Associated User
          </h2>
          <div className="text-gray-600 dark:text-gray-300">
            <p>
              <span className="font-medium">Name:</span> {user.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {user.phone_number}
            </p>
            <p>
              <span className="font-medium">City:</span> {user.city}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-100">
          Driver Documents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {driverDocuments?.map((doc: any) => (
            <div
              key={doc.id}
              className={`relative p-6 rounded-3xl text-gray-800 shadow-custom-black dark:shadow-custom-black border ${
                doc.is_being_renewed
                  ? "bg-yellow-100 border-yellow-600"
                  : "bg-[#c4e9c9] shadow-custom-black dark:shadow-custom-green border-black"
              }`}
            >
              <p className="text-xl font-semibold capitalize mb-2">
                {doc.type}
              </p>
              <p>
                <span className="font-medium">Issue Date:</span>{" "}
                {doc.issue_date}
              </p>
              <p>
                <span className="font-medium">Expiry Date:</span>{" "}
                {doc.expiry_date}
              </p>
              <Link
                href={doc.document}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Document
              </Link>

              {doc.is_being_renewed && (
                <div>
                  <DocumentUpdateModal
                    id={doc?.driver_document_renewal_request?.id}
                    modalFor="driver"
                    data={{
                      status: doc.driver_document_renewal_request?.status,
                      issueDate:
                        doc.driver_document_renewal_request?.issue_date,
                    }}
                    onUpdate={handleDocumentUpdate}
                    button={
                      <button className="absolute top-8 right-8">
                        <EditIcon fill="#000000" />
                      </button>
                    }
                  />
                  <div className="p-2 bg-yellow-200 text-yellow-800 rounded-lg">
                    <p className="font-semibold text-sm capitalize">
                      Renewal Status:{" "}
                      {doc?.driver_document_renewal_request?.status ||
                        "Pending"}
                    </p>
                    <p className="text-xs">
                      Once the renewal is complete, the status will be updated
                      here.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DriverDetails;
