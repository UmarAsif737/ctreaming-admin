import { IDriverRenwal } from "@/helpers/types";
import { Chip, Tooltip } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { EyeIcon } from "@/components/icons/table/eye-icon";
import { EditIcon } from "@/components/icons/table/edit-icon";
import DocumentUpdateModal from "../renewal-modal";
import { updateDriverRenewalRequest } from "@/actions/documents-action";
import { toast } from "sonner";

interface Props {
  item: IDriverRenwal;
  columnKey: string | React.Key;
  onRefresh: () => Promise<void>;
}

export const RenderCell = ({ item, columnKey, onRefresh }: Props) => {
  const handleDriverDocumentUpdate = async (id: string, formData: FormData) => {
    try {
      const result = await updateDriverRenewalRequest(id, formData);
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

  let cellValue: React.ReactNode;
  if (columnKey === "driver_document.driver.name") {
    cellValue = item.driver_document?.driver?.name || "N/A";
  } else if (columnKey === "driver_document.type") {
    cellValue = item.driver_document?.type || "N/A";
  } else if (columnKey === "driver_document.document") {
    cellValue = item.driver_document?.document || "N/A";
  } else if (columnKey === "driver_document.driver.user.email") {
    cellValue = item.driver_document?.driver?.user?.email || "N/A";
  } else if (columnKey === "driver_document.driver.id") {
    cellValue = item.driver_document?.driver?.id || "N/A";
  } else {
    const value = item[columnKey as keyof IDriverRenwal];
    cellValue =
      typeof value === "object" && value !== null
        ? JSON.stringify(value)
        : value || "N/A";
  }

  switch (columnKey) {
    case "driver_document.type":
      return <div className="capitalize">{cellValue}</div>;

    case "driver_document.document":
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
            <Link href={`/dashboard/drivers/${item.driver_document.driver.id}`}>
              <EyeIcon size={20} fill="#979797" />
            </Link>
          </Tooltip>
          <Tooltip content="Update Document Status">
            <DocumentUpdateModal
              id={item.id}
              modalFor="driver"
              button={<EditIcon size={20} fill="#39b54a" />}
              data={{
                status: item?.status,
                issueDate: item.driver_document?.issue_date,
              }}
              onUpdate={handleDriverDocumentUpdate}
            />
          </Tooltip>
        </div>
      );

    default:
      return <div>{cellValue}</div>;
  }
};
