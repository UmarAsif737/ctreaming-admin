"use client";
import { Tooltip, Checkbox } from "@heroui/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import { IContactForm } from "@/helpers/types";
import UserModal from "./user-modal";
import { toast } from "sonner";
import { markFormAsRead } from "@/actions/contact-form/mark-as-read";
import { fetchMessageById } from "@/actions/contact-form/fetch-message";
import { deleteMessage } from "@/actions/contact-form/handle-delete";

interface Props {
  item: IContactForm;
  columnKey: string | React.Key;
}

export const RenderCell = ({ item, columnKey }: Props) => {
  const cellValue = item[columnKey as keyof IContactForm] ?? "N/A";

  const handleEyeIconClick = async (event: React.MouseEvent) => {
    try {
      await markFormAsRead({ id: item.id });

      item.is_read = true;

      const parentRow = (event.target as HTMLElement).closest(".table-row");
      if (parentRow) {
        parentRow.classList.remove("font-bold");
      }
    } catch (error) {
      toast.error("Unable to mark as read. Please try again.");
    }
  };

  const handleDeleteIconClick = async () => {
    try {
      await deleteMessage({ id: item.id });
      console.log("🚀 ~ handleDeleteIconClick ~ item:", item);
    } catch (error) {
      toast.error("Unable to delete message. Please try again.");
    }
  };

  const cellClass = item.is_read ? "" : "font-bold";

  return (
    <div className={`table-row ${cellClass}`}>
      {(() => {
        switch (columnKey) {
          case "email":
            return <div>{cellValue}</div>;

          case "full_name":
            return <div>{cellValue}</div>;

          case "createdAt":
            return (
              <div>
                {typeof cellValue === "string"
                  ? new Date(cellValue).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : "N/A"}
              </div>
            );

          case "message":
            return (
              <p className="truncate max-w-[5ch] overflow-hidden">
                {typeof cellValue === "string" ? cellValue : String(cellValue)}
              </p>
            );

          case "actions":
            return (
              <div className="flex items-center gap-4">
                <Tooltip content="Details">
                  <UserModal
                    button={<EyeIcon size={20} fill="#979797" />}
                    mode="View"
                    data={item}
                    onClick={(event) => handleEyeIconClick(event)}
                  />
                </Tooltip>
                <Tooltip content="Delete user" color="danger">
                  <UserModal
                    button={<DeleteIcon size={20} fill="#FF0080" />}
                    mode="Delete"
                    data={item}
                    onConfirm={handleDeleteIconClick}
                  />
                </Tooltip>
              </div>
            );

          default:
            return <div>{cellValue}</div>;
        }
      })()}
    </div>
  );
};
