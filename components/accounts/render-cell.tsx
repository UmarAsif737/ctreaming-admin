import { Tooltip, Chip } from "@heroui/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import { IUser } from "@/types/index.types";
import Link from "next/link";
import UserModal from "./user-modal";
import { deleteUser } from "@/actions/user.actions";
import { toast } from "sonner";
import { FaCheckCircle, FaPowerOff } from "react-icons/fa";
import ActivateDeActivateModal from "./active-deactive-user";

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
  const cellValue = item[columnKey as keyof IUser];

  const handleActiveDeActiveUser = async () => {
    toast.promise(
      deleteUser(item?._id).then((result: any) => {
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
          {String(cellValue) === undefined ? (
            <span className="italic text-[#727D73]">Not Selected</span>
          ) : (
            <>{String(cellValue)}</>
          )}
        </div>
      );

    case "is_active":
      return (
        <div>
          {cellValue === undefined ? (
            <span className="text-[#727D73]">In-active</span>
          ) : (
            <>
              {String(cellValue) === "true" ? (
                <>
                  <span className="text-[#079455]">Active</span>
                </>
              ) : (
                <>
                  <span className="text-[#727D73]">In-active</span>
                </>
              )}
            </>
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

          <Tooltip
            content={item?.is_active ? "Deactivate user" : "Activate user"}
          >
            <ActivateDeActivateModal
              button={
                item?.is_active ? (
                  <FaPowerOff
                    size={16}
                    className="text-[#FFA500] hover:text-[#FF8C00]"
                  />
                ) : (
                  <FaCheckCircle
                    size={16}
                    className="text-[#28A745] hover:text-[#218838]"
                  />
                )
              }
              mode={item?.is_active ? "De Activate" : "Activate"}
              data={item}
              onConfirm={handleActiveDeActiveUser}
            />
            {/* <button
              onClick={() => {}}
              className="p-1 rounded-md hover:bg-[#f5f5f5] transition-colors"
            >
              {item?.is_active ? (
                <FaPowerOff
                  size={16}
                  className="text-[#FFA500] hover:text-[#FF8C00]"
                />
              ) : (
                <FaCheckCircle
                  size={16}
                  className="text-[#28A745] hover:text-[#218838]"
                />
              )}
            </button> */}
          </Tooltip>
        </div>
      );

    default:
      return <div>{String(cellValue ?? "N/A")}</div>;
  }
};
