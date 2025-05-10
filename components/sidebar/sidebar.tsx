import React, { useState } from "react";
import { Sidebar } from "./sidebar.styles";
import CompanyCard from "./app-logo";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../layout/layout-context";
import { usePathname } from "next/navigation";
import { routes } from "@/config/routes";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Route {
  title: string;
  icon?: React.ElementType;
  href?: string;
  children?: Route[];
}

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (groupTitle: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupTitle]: !prev[groupTitle],
    }));
  };

  const renderRoutes = (routes: Route[]) => {
    return routes.map((route) => {
      if (route.title === "Forms") {
        return (
          <div key={route.title}>
            <button
              onClick={() => toggleGroup(route.title)}
              className="flex items-center justify-between w-full px-3.5 text-left text-white hover:bg-[#39B54A] hover:text-black rounded-xl min-h-[44px]"
            >
              <div className="flex items-center gap-2">
                {route.icon &&
                  React.createElement(route.icon, { className: "w-5 h-5" })}
                <span>{route.title}</span>
              </div>
              {openGroups[route.title] ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openGroups[route.title] && (
              <div className="ml-4 mt-2 space-y-2">
                {route.children?.map((child: Route) => (
                  <SidebarItem
                    key={child.href}
                    title={child.title}
                    icon={
                      child.icon
                        ? React.createElement(child.icon, {
                            className: "w-4 h-4",
                          })
                        : null
                    }
                    isActive={pathname === child.href}
                    href={child.href}
                  />
                ))}
              </div>
            )}
          </div>
        );
      }

      return (
        <SidebarItem
          key={route.href}
          title={route.title}
          icon={
            route.icon
              ? React.createElement(route.icon, { className: "w-5 h-5" })
              : null
          }
          isActive={pathname === route.href}
          href={route.href}
        />
      );
    });
  };

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div className={Sidebar({ collapsed: collapsed })}>
        <div className={Sidebar.Header()}>
          <CompanyCard />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarMenu title={""}>{renderRoutes(routes)}</SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};
