"use client";

import React, { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  getVehicleDetails,
  getVehicleDocuments,
} from "@/actions/vehicle-action";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import DocumentUpdateModal from "@/components/renewal-requests/renewal-modal";
import { EditIcon } from "@/components/icons/table/edit-icon";
import { toast } from "sonner";
import { updateRenewalRequest } from "@/actions/documents-action";

const InfoBlock = ({
  title,
  data,
}: {
  title: string;
  data: Record<string, string | number | boolean>;
}) => (
  <div className="bg-gray-100 dark:bg-[#18181b] p-6 rounded-3xl shadow-custom-black dark:shadow-custom-white border border-black dark:border-white">
    <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
      {title}
    </h2>
    {Object.entries(data).map(([key, value]) => (
      <p key={key} className="text-gray-600 dark:text-gray-300">
        <span className="font-medium">
          {key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}:
        </span>{" "}
        <span className={`${key === "VIN" ? "uppercase" : ""}`}>
          {String(value)}
        </span>
      </p>
    ))}
  </div>
);

const VehicleDetails = () => {
  const pathname = usePathname();
  const vehicleId = pathname.split("/").pop();
  const router = useRouter();

  const [vehicleData, setVehicleData] = useState<any | null>(null);
  const [vehicleDocuments, setVehicleDocuments] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchVehicleData = useCallback(async () => {
    setLoading(true);
    try {
      const [vehicleDetailsResult, vehicleDocumentsResult] = await Promise.all([
        getVehicleDetails(vehicleId!),
        getVehicleDocuments(vehicleId!),
      ]);

      if (vehicleDetailsResult.error) {
        setError(vehicleDetailsResult.error);
      } else {
        setVehicleData(vehicleDetailsResult.data);
      }

      if (vehicleDocumentsResult.error) {
        setError(vehicleDocumentsResult.error);
      } else {
        setVehicleDocuments(vehicleDocumentsResult.data);
      }
    } catch (err) {
      setError("An error occurred while fetching vehicle data.");
    } finally {
      setLoading(false);
    }
  }, [vehicleId]);

  const handleDocumentUpdate = async (id: string, formData: FormData) => {
    try {
      const result = await updateRenewalRequest(id, formData);
      if (result.error) {
        throw new Error(result.error);
      }
      toast.success("Document updated successfully!");

      await fetchVehicleData();
    } catch (error) {
      console.error("Error updating document:", error);
      toast.error("An error occurred while updating the document.");
    }
  };

  useEffect(() => {
    if (vehicleId) {
      fetchVehicleData();
    }
  }, [vehicleId, fetchVehicleData]);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <Loader2 size={28} className="animate-spin" />
          <p>Loading Vehicle Details...</p>
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

  if (!vehicleData) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-red-500">No vehicle data found.</p>
      </div>
    );
  }

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
          <span>Vehicle Details</span>
        </div>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mb-8">
        <InfoBlock
          title="Vehicle Information"
          data={{
            Make: vehicleData.make,
            Model: vehicleData.model,
            Year: vehicleData.year,
            VIN: vehicleData.vehicle_identification_number,
          }}
        />

        <InfoBlock
          title="Associated User"
          data={{
            Name: vehicleData.user.name,
            Email: vehicleData.user.email,
            Phone: vehicleData.user.phone_number,
            City: vehicleData.user.city,
            Address: vehicleData.user.address,
          }}
        />

        <InfoBlock
          title="Summary"
          data={{
            "Reminder Preference": vehicleData.user.reminder_preference,
            "Document Assistance": vehicleData.user
              .is_document_assistance_enabled
              ? "Enabled"
              : "Disabled",
            "Onboarding Steps": vehicleData.user.completed_onboarding_steps,
          }}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-100">
          Vehicle Documents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vehicleDocuments?.map((doc: any) => (
            <div
              key={doc.id}
              className={`relative p-4 rounded-3xl text-gray-800 shadow-custom-black border ${
                doc.is_being_renewed
                  ? "bg-yellow-100 border-black dark:shadow-custom-black"
                  : "bg-[#c4e9c9] border-black"
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
                    id={doc?.document_renewal_request?.id}
                    modalFor="vehicle"
                    data={{
                      status: doc.document_renewal_request?.status,
                      issueDate: doc.document_renewal_request?.issue_date,
                    }}
                    onUpdate={handleDocumentUpdate}
                    button={
                      <button className="absolute top-6 right-6">
                        <EditIcon fill="#000000" />
                      </button>
                    }
                  />
                  <div className="p-2 bg-yellow-200 text-yellow-800 rounded-lg">
                    <p className="font-semibold text-sm capitalize">
                      Renewal Status: {doc?.document_renewal_request?.status}
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

export default VehicleDetails;
