import { Input, Link, Navbar, NavbarContent } from "@heroui/react";
import React from "react";
import { BurguerButton } from "./burguer-button";
import { UserDropdown } from "./user-dropdown";
import { DarkModeSwitch } from "./darkmodeswitch";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden ">
      <Navbar
        isBordered
        className="w-full "
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>

        <NavbarContent
          justify="end"
          className="w-fit ml-auto data-[justify=end]:flex-grow-0"
        >
          <NavbarContent>
            <DarkModeSwitch />
            <UserDropdown />
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};
