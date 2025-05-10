import {
  LayoutDashboard,
  User,
  Car,
  CarFront,
  BookUser,
  FileText,
  ShieldPlus,
  Book,
  FileStack,
  Contact2Icon
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
    title: "Vehicles",
    icon: Car,
    href: "/dashboard/vehicles",
  },
  {
    title: "Drivers",
    icon: CarFront,
    href: "/dashboard/drivers",
  },
  {
    title: "Contact Forms",
    icon: BookUser,
    href: "/dashboard/contact",
  },
  {
    title: "Documents for Renewal",
    icon: FileStack,
    href: "/dashboard/renewal-documents",
  },
  {
    title: "Add New Admin",
    icon: ShieldPlus,
    href: "/dashboard/admin",
  },
  {
    title: "Manage POC",
    icon: Contact2Icon,
    href: "/dashboard/poc",
  },
];
