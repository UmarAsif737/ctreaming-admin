import { Tooltip, Chip } from "@heroui/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import { IUser } from "@/types/index.types";
import Link from "next/link";
import UserModal from "./user-modal";
import { deleteUser } from "@/actions/user.actions";
import { toast } from "sonner";

interface Props {
  item: IUser;
  columnKey: string | React.Key;
  fetchFreshData?: () => void;
  isAssistedUsers?: boolean;
  search?: string;
}

export const RenderCell = ({
  item,
  columnKey,
  fetchFreshData = () => {},
  isAssistedUsers,
  search,
}: Props) => {
  console.log({
    item,
    columnKey,
  });
  const cellValue = item[columnKey as keyof any];

  const handleDeleteUser = async () => {
    toast.promise(
      deleteUser(item?.id).then((result: any) => {
        if (result.error) {
          throw new Error(result.error);
        }

        return result;
      }),
      {
        loading: "Deleting user...",
        success: "User deleted successfully!",
        error: "Error deleting user.",
      }
    );
  };

  switch (columnKey) {
    case "email":
    case "name":
    case "is_verified":
      return <div>{String(cellValue)}</div>;

    case "category":
      return (
        <div>
          {String(cellValue) === "undefined" ? (
            <span className="italic text-[#727D73]">Not Selected</span>
          ) : (
            <>{String(cellValue)}</>
          )}
        </div>
      );

    case "city":
      return (
        <div>
          {String(cellValue) === "undefined" ? (
            <span className="italic text-[#727D73]">Not Selected</span>
          ) : (
            <>{String(cellValue)}</>
          )}
        </div>
      );

    case "type":
      return (
        <div>
          {String(cellValue) === "not set" ? (
            <span className="italic text-[#727D73]">Not Selected</span>
          ) : (
            <>{String(cellValue)}</>
          )}
        </div>
      );

    case "createdAt":
      return (
        <div>
          {typeof cellValue === "string"
            ? new Date(cellValue).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            : "Invalid date"}
        </div>
      );

    case "type":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={
            cellValue === "admin"
              ? "primary"
              : cellValue === "individual"
              ? "success"
              : cellValue === "company"
              ? "warning"
              : "default"
          }
        >
          <span className="capitalize text-xs">
            {String(cellValue ?? "N/A")}
          </span>
        </Chip>
      );

    case "actions":
      return (
        <div className="flex items-center gap-4">
          <Tooltip content="Details">
            <Link href={`/dashboard/accounts/${item?._id}`}>
              <EyeIcon size={20} fill="#979797" />
            </Link>
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
