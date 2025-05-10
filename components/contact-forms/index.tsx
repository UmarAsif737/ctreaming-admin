"use client";
import { Button, Input } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { UsersIcon } from "@/components/icons/breadcrumb/users-icon";
import { TableWrapper } from "@/components/table/table";
import { IContactForm, IMeta, IUser } from "@/helpers/types";
import { RenderCell } from "./render-cell";
import UserModal from "./user-modal";
import { createUser } from "@/actions/user.action";
import { toast } from "sonner";
import SearchInput from "../search-input";
import useUpdateSearchParams from "../hooks/useUpdateSearchParams";
import { markAllRead } from "@/actions/contact-form/mark-all-read";
import { useRouter } from "next/navigation";

export const Contact = ({
  data,
  meta,
}: {
  data: IContactForm[];
  meta: IMeta;
}) => {
  const { updateSearchParams } = useUpdateSearchParams();
  const router = useRouter();
  const columns = [
    { name: "Email", uid: "email" },
    { name: "FULL NAME", uid: "name" },
    { name: "RECEIVED AT", uid: "createdAt" },
    { name: "MESSAGE", uid: "message" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const handleMarkAllAsRead = async () => {
    toast.promise(
      markAllRead().then((res) => {
        router.refresh();
        if (res.error) {
          return;
        }
      }),
      {
        loading: "Marking all as read...",
        success: "All marked as read!",
        error: "Error marking all as read!",
      }
    );
  };

  return (
    <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <h3 className="text-xl font-semibold">Contact Forms</h3>
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <Button color="primary" onClick={handleMarkAllAsRead}>
            Mark All as Read
          </Button>
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper
          meta={meta}
          RenderCell={RenderCell}
          data={data}
          columns={columns}
        />
      </div>
    </div>
  );
};
