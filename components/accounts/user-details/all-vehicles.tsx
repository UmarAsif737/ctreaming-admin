import React from "react";
import { Vehicle } from "@/helpers/types";
import Link from "next/link";
import { Tooltip } from "@heroui/react";
import { FileSearch2, Trash2 } from "lucide-react";
import VehicleModal from "@/components/vehicles/vehicle-modal";

interface VehiclesCardProps {
  vehicles: Vehicle[];
  userId: number;
}

const VehiclesCard: React.FC<VehiclesCardProps> = ({ vehicles, userId }) => {
  return (
    <div className="bg-[#c4e9c9] text-black p-6 rounded-3xl shadow-custom-black dark:shadow-custom-green border border-black  mt-8">
      <div className="w-full h-full flex justify-between items-center mb-4">
        <h2 className="text-2xl font-medium">Vehicles</h2>
        {vehicles.length > 0 ? (
          <Link
            href={`/dashboard/accounts/${userId}/vehicles`}
            className="px-2 py-1 rounded-full bg-white border border-black shadow-custom-black text-sm"
          >
            See All Vehicles
          </Link>
        ) : null}
      </div>
      {vehicles.length > 0 ? (
        vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="border-t border-black border-opacity-50 py-4 first:border-t-0"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {vehicle.make} {vehicle.model} ({vehicle.year})
                </h3>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">VIN:</span>{" "}
                  {vehicle.vehicle_identification_number}
                </p>
              </div>
              <div className="flex justify-center items-center gap-x-4">
                <Tooltip content="Vehicle Details">
                  <Link href={`/dashboard/vehicles/${vehicle.id}`}>
                    <FileSearch2
                      size={24}
                      className="text-gray-800 cursor-pointer"
                    />
                  </Link>
                </Tooltip>
              </div>
            </div>

            {vehicle.vehicle_documents.length > 0 && (
              <div className="mt-2">
                <h4 className="font-semibold text-gray-800">Documents:</h4>
                <ul className="list-disc ml-6 text-sm text-gray-600">
                  {vehicle.vehicle_documents.map((doc) => (
                    <li key={doc.id}>
                      <span className="capitalize font-medium">
                        {doc.type}:
                      </span>{" "}
                      <Link
                        href={doc.document}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View Document
                      </Link>{" "}
                      - Expiry: {new Date(doc.expiry_date).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-600">No vehicles registered.</p>
      )}
    </div>
  );
};

export default VehiclesCard;
