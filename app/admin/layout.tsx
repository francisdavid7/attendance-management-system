"use client";

import {
  Calendar,
  LayoutDashboard,
  Settings,
  Users,
  BookOpen,
} from "lucide-react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import type { ItemsTypes } from "@/components/dashboard-sidebar";

const items: ItemsTypes[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard as any,
  },
  {
    title: "Students",
    url: "/dashboard/students",
    icon: Users as any,
  },
  {
    title: "Courses",
    url: "/dashboard/courses",
    icon: BookOpen as any,
  },
  {
    title: "Attendance",
    url: "/dashboard/attendance",
    icon: Calendar as any,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings as any,
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar items={items} />

      <SidebarInset>
        <DashboardHeader />
        <main className="w-full">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
