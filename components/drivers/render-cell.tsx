import React from "react";
import { IDriver, IVehicle } from "@/helpers/types";
import { Chip, Tooltip } from "@heroui/react";
import Link from "next/link";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import Image from "next/image";
import DriverModal from "./driver-modal";
import { deleteDriver } from "@/actions/driver-action";
import { toast } from "sonner";

interface Props {
  item: IDriver;
  columnKey: string | React.Key;
}

export const RenderCell = ({ item, columnKey }: Props) => {
  const cellValue = item[columnKey as keyof IDriver];

  const handleDeleteDriver = async () => {
    toast.promise(
      deleteDriver(item.id).then((result) => {
        if (result.error) {
          throw new Error(result.error);
        }
        return result;
      }),
      {
        loading: "Deleting driver...",
        success: "Driver deleted successfully!",
        error: "Error deleting driver.",
      }
    );
  };

  switch (columnKey) {
    case "name":
      return <div className="">{cellValue}</div>;

    case "photo":
      return (
        <div className="flex items-center">
          <Chip
            size="sm"
            variant="flat"
            color={cellValue ? "success" : "warning"}
          >
            {cellValue ? (
              <Link
                href={`/dashboard/drivers/${item.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-75"
              >
                Uploaded Photo
              </Link>
            ) : (
              <span>No Photo</span>
            )}
          </Chip>
        </div>
      );

    case "createdAt":
      return (
        <div className="">
          {new Date(cellValue).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </div>
      );

    case "vehicle_identification_number":
      return (
        <Chip size="sm" variant="flat" color="success">
          <span className="tracking-wider uppercase">{cellValue || "N/A"}</span>
        </Chip>
      );

    case "actions":
      return (
        <div className="flex items-center gap-4">
          <div>
            <Tooltip content="Details">
              <Link href={`/dashboard/drivers/${item.id}`}>
                <EyeIcon size={20} fill="#979797" />
              </Link>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Delete user" color="danger">
              <DriverModal
                button={<DeleteIcon size={20} fill="#FF0080" />}
                mode="Delete"
                data={item}
                onConfirm={handleDeleteDriver}
              />
            </Tooltip>
          </div>
        </div>
      );

    default:
      return <div>{cellValue}</div>;
  }
};
