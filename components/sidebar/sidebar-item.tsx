import NextLink from "next/link";
import React from "react";
import { useSidebarContext } from "../layout/layout-context";
import clsx from "clsx";

interface Props {
  title: string;
  icon: React.ReactNode;
  isActive?: boolean;
  href?: string;
}

export const SidebarItem = ({ icon, title, isActive, href = "" }: Props) => {
  const { setCollapsed } = useSidebarContext();

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setCollapsed();
    }
  };
  return (
    <NextLink
      href={href}
      className="text-default-900 active:bg-none max-w-full group"
    >
      <div
        className={clsx(
          isActive
            ? "bg-primary2/90 !text-white"
            : "hover:bg-primary2/90 hover:!text-green-500",
          "flex gap-2 w-full min-h-[44px] text-white h-full items-center px-3.5 rounded-md cursor-pointer transition-all duration-150 active:scale-[0.98]"
        )}
        onClick={handleClick}
      >
        <span
          className={clsx(
            isActive ? "text-[#fff]" : "text-black group-hover:text-[#fff]",
            "transition-all duration-150"
          )}
        >
          {icon}
        </span>
        <span
          className={clsx(
            isActive ? "text-[#fff]" : "text-black group-hover:text-[#fff]",
            "transition-all duration-150"
          )}
        >
          {title}
        </span>
      </div>
    </NextLink>
  );
};
