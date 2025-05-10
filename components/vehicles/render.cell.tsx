import { IVehicle } from "@/helpers/types";
import { Chip, Tooltip } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import UserModal from "./vehicle-modal";
import { toast } from "sonner";
import { deleteVehicle } from "@/actions/vehicle-action";
import VehicleModal from "./vehicle-modal";

interface Props {
  item: IVehicle;
  columnKey: string | React.Key;
}

export const RenderCell = ({ item, columnKey }: Props) => {
  console.log("🚀 ~ RenderCell ~ item:", item);
  console.log("🚀 ~ RenderCell ~ columnKey:", columnKey);
  const cellValue = item[columnKey as keyof IVehicle];
  console.log("🚀 ~ RenderCell ~ cellValue:", cellValue);

  const handleDeleteVehicle = async () => {
    toast.promise(
      deleteVehicle(item.id).then((result) => {
        if (result.error) {
          throw new Error(result.error);
        }
        return result;
      }),
      {
        loading: "Deleting vehicle...",
        success: "Vehicle deleted successfully!",
        error: "Error deleting vehicle.",
      }
    );
  };

  switch (columnKey) {
    case "make":
      return <div className="">{cellValue}</div>;

    case "model":
      return <div className="">{cellValue}</div>;
    case "createdAt":
      return (
        <div className="">
          {" "}
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
              <Link href={`/dashboard/vehicles/${item.id}`}>
                <EyeIcon size={20} fill="#979797" />
              </Link>
            </Tooltip>
          </div>
          {/* <div>
            <Tooltip content="Edit user" color="secondary">
              <UserModal
                button={<EditIcon size={20} fill="#1a740e" />}
                mode="Edit"
                // data={item}
                //     onConfirm={handleEditUser}
              />
            </Tooltip>
          </div> */}
          <div>
            <Tooltip content="Delete user" color="danger">
              <VehicleModal
                button={<DeleteIcon size={20} fill="#FF0080" />}
                mode="Delete"
                data={item}
                onConfirm={handleDeleteVehicle}
              />
            </Tooltip>
          </div>
        </div>
      );

    default:
      return <div>{cellValue}</div>;
  }
};
