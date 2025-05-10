import { IRenewalRequest } from "@/helpers/types";
import { Chip, Tooltip } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { EyeIcon } from "../icons/table/eye-icon";
import { EditIcon } from "../icons/table/edit-icon";
import DocumentUpdateModal from "./renewal-modal";
import { toast } from "sonner";
import { updateRenewalRequest } from "@/actions/documents-action";
import { useRouter } from "next/navigation";

interface Props {
  item: IRenewalRequest;
  columnKey: string | React.Key;
  onRefresh: () => Promise<void>;
}

export const RenderCell = ({ item, columnKey, onRefresh }: Props) => {
  let cellValue: React.ReactNode;

  if (columnKey === "vehicle_document.vehicle.user.name") {
    cellValue = item.vehicle_document?.vehicle?.user?.name || "N/A";
  } else if (columnKey === "vehicle_document.type") {
    cellValue = item.vehicle_document?.type || "N/A";
  } else if (columnKey === "vehicle_document.document") {
    cellValue = item.vehicle_document?.document || "N/A";
  } else if (
    columnKey === "vehicle_document.vehicle.vehicle_identification_number"
  ) {
    cellValue =
      item.vehicle_document?.vehicle?.vehicle_identification_number || "N/A";
  } else if (columnKey === "vehicle_document.vehicle.user.type") {
    cellValue = item.vehicle_document?.vehicle?.user?.type || "N/A";
  } else if (columnKey === "vehicle_document.vehicle.id") {
    cellValue = item.vehicle_document?.vehicle?.id || "N/A";
  } else {
    const value = item[columnKey as keyof IRenewalRequest];

    if (typeof value === "object" && value !== null) {
      cellValue = JSON.stringify(value);
    } else {
      cellValue = value || "N/A";
    }
  }

  const handleVehicleDocumentUpdate = async (
    id: string,
    formData: FormData
  ) => {
    try {
      const result = await updateRenewalRequest(id, formData);
      if (result.error) {
        throw new Error(result.error);
      }
      toast.success("Vehicle document updated successfully!");

      await onRefresh();
    } catch (error) {
      console.error("Error updating document:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  switch (columnKey) {
    case "vehicle_document.type":
      return <div className="capitalize">{cellValue}</div>;

    case "vehicle_document.vehicle.user.type":
      return <div className="capitalize font-bold">{cellValue}</div>;

    case "vehicle_document.document":
      return (
        <div className="capitalize text-blue-500 underline">
          {typeof cellValue === "string" ? (
            <Link href={cellValue} target="_blank" rel="noopener noreferrer">
              View Document
            </Link>
          ) : (
            "Invalid URL"
          )}
        </div>
      );

    case "createdAt":
      return (
        <div>
          {new Date(cellValue as string).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </div>
      );

    case "status":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={
            cellValue === "request initiated"
              ? "primary"
              : cellValue === "documents received"
              ? "warning"
              : cellValue === "documents verified"
              ? "secondary"
              : cellValue === "renewal initiated"
              ? "danger"
              : cellValue === "completed"
              ? "success"
              : "default"
          }
        >
          <span className="capitalize text-xs">{cellValue ?? "N/A"} </span>
        </Chip>
      );

    case "actions":
      return (
        <div className="flex items-center gap-4">
          <Tooltip content="Details">
            <Link
              href={`/dashboard/vehicles/${item.vehicle_document.vehicle.id}`}
            >
              <EyeIcon size={20} fill="#979797" />
            </Link>
          </Tooltip>
          <Tooltip content="Update Document Status">
            <DocumentUpdateModal
              id={item.id}
              modalFor="vehicle"
              button={<EditIcon size={20} fill="#39b54a" />}
              data={{
                status: item?.status,
                issueDate: item.vehicle_document?.issue_date,
              }}
              onUpdate={handleVehicleDocumentUpdate}
            />
          </Tooltip>
        </div>
      );

    default:
      return <div>{cellValue}</div>;
  }
};
