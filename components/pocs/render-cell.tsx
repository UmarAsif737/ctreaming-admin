import { Tooltip } from "@heroui/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import UserModal from "./poc-modal";
import { toast } from "sonner";
import { deletePOC } from "@/actions/poc-actions";
import EditPoc from "./edit-poc-modal";

interface Props {
  item: any;
  columnKey: string | React.Key;
}

export const RenderCell = ({ item, columnKey }: Props) => {
  const cellValue = item[columnKey as keyof any];

  const handleDeleteUser = async () => {
    toast.promise(
      deletePOC(item.id).then((result) => {
        if (result.error) {
          throw new Error(result.error);
        }
        return result;
      }),
      {
        loading: "Deleting poc...",
        success: "poc deleted successfully!",
        error: "Error deleting poc.",
      }
    );
  };

  switch (columnKey) {
    case "name":
    case "phone_number":
      return <div>{String(cellValue)}</div>;

    case "actions":
      return (
        <div className="flex items-center gap-4">
          <Tooltip content="Edit">
            <EditPoc data={item}/>
          </Tooltip>
          <Tooltip content="Delete user" color="danger">
            <UserModal
              button={<DeleteIcon size={20} fill="#FF0080" />}
              mode="Delete"
              data={item}
              onConfirm={handleDeleteUser}
            />
          </Tooltip>
        </div>
      );

    default:
      return <div>{String(cellValue ?? "N/A")}</div>;
  }
};
