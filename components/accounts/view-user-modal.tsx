import {
  capitalize,
  decodeHtmlEntities,
  FormatBudgetValue,
} from "@/helper/utils";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaLink } from "react-icons/fa";
import { Modal } from "../shared/modal";

type Props = {
  user: any;
  open: boolean;
  onClose: () => void;
};

function PreviewUserModal({ user, onClose, open = false }: Props) {
  const [sectionSize, setSectionSize] = useState({ height: 0, width: 0 });
  const sectionRef = useRef<any>(null);

  useEffect(() => {
    if (sectionRef.current) {
      const { offsetHeight, offsetWidth } = sectionRef.current;
      setSectionSize({ height: offsetHeight, width: offsetWidth });
    }
  }, [open]);

  const createdDate = moment(new Date(user?.createdAt)).format("MMM D, YYYY");

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      className="!max-w-2xl h-[90%] overflow-y-scroll"
    >
      <header className="px-4 py-2 flex items-center justify-between border-b border-[#ECEFF2] ">
        <h2 className="text-lg font-[600] ">User Details</h2>
        <IoMdClose
          size={18}
          className="cursor-pointer text-black hover:text-red-500"
          onClick={onClose}
        />
      </header>

      <section className="px-4 py-2 flex flex-col gap-3" ref={sectionRef}>
        <div className="flex flex-col gap-1">
          <p className="text-[#A7B5BE] text-[0.87rem]">Name</p>
          <p className="text-black text-[0.95rem]">{user?.name}</p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#A7B5BE] text-[0.87rem]">Email</p>
          <p className="text-black text-[0.95rem]">{user?.email}</p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#A7B5BE] text-[0.87rem]">City</p>
          <p className="text-black text-[0.95rem]">{user?.city}</p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#A7B5BE] text-[0.87rem]">Type</p>
          <p className="text-black text-[0.95rem] capitalize">{user?.type}</p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#A7B5BE] text-[0.87rem]">Unique Audience</p>
          <p className="text-black text-[0.95rem]">
            {user?.unique_audience?.toLocaleString()}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#A7B5BE] text-[0.87rem]">
            Available Impressions
          </p>
          <p className="text-black text-[0.95rem]">
            {user?.available_impressions?.toLocaleString()}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#A7B5BE] text-[0.87rem]">Minimum Budget</p>
          <p className="text-black text-[0.95rem]">
            ${user?.minimum_budget?.toLocaleString()}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#A7B5BE] text-[0.87rem]">Financial Total</p>
          <p className="text-black text-[0.95rem]">
            ${user?.financial_total?.toLocaleString()}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#A7B5BE] text-[0.87rem]">Last Online</p>
          <p className="text-black text-[0.95rem]">
            {moment(user?.last_online).format("LLL")}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#A7B5BE] text-[0.87rem]">Created At</p>
          <p className="text-black text-[0.95rem]">
            {moment(user?.createdAt).format("LL")}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[#A7B5BE] text-[0.87rem]">Updated At</p>
          <p className="text-black text-[0.95rem]">
            {moment(user?.updatedAt).format("LL")}
          </p>
        </div>

        {user?.legal_requirements?.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-[#A7B5BE] text-[0.87rem]">Legal Requirements</p>
            <div className="flex flex-col gap-1">
              {user.legal_requirements.map((link: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-2 overflow-hidden"
                >
                  <FaLink
                    size={12}
                    className="text-[#A7B5BE] flex-shrink-0"
                  />
                  <Link
                    href={decodeHtmlEntities(link)}
                    target="_blank"
                    className="text-[0.95rem] text-[#22A5E9] hover:underline cursor-pointer truncate"
                    style={{ maxWidth: sectionSize.width }}
                  >
                    {decodeHtmlEntities(link)}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[#A7B5BE] text-[0.87rem]">Verified:</span>
            <span
              className={`text-sm font-medium ${
                user.is_verified ? "text-green-600" : "text-red-600"
              }`}
            >
              {user.is_verified ? "Yes" : "No"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#A7B5BE] text-[0.87rem]">Active:</span>
            <span
              className={`text-sm font-medium ${
                user.is_active ? "text-green-600" : "text-red-600"
              }`}
            >
              {user.is_active ? "Yes" : "No"}
            </span>
          </div>
        </div>

        <p className="text-[#A7B5BE] text-[0.87rem]">
          Added Date: {createdDate}
        </p>
      </section>
    </Modal>
  );
}

export default PreviewUserModal
