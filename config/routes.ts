import {
  LayoutDashboard,
  User,
  ShieldPlus,
  Contact2Icon,
} from "lucide-react";

export const routes = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Users Management",
    icon: User,
    href: "/dashboard/accounts",
  },
  {
    title: "Manage Campaigns",
    icon: Contact2Icon,
    href: "/dashboard/campaigns",
  },

 
  {
    title: "Add New Admin",
    icon: ShieldPlus,
    href: "/dashboard/admin",
  },

];
