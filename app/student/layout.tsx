"use client";

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import type { ItemsTypes } from "@/components/dashboard/dashboard-sidebar";
import {
  BookOpen,
  CalendarCheck,
  CalendarDays,
  GraduationCap,
  LayoutDashboard,
  Settings,
} from "lucide-react";

const items: ItemsTypes[] = [
  {
    title: "Dashboard",
    url: "/student/dashboard",
    icon: LayoutDashboard as any,
  },
  {
    title: "Attendance",
    url: "/student/dashboard/attendance",
    icon: CalendarCheck as any,
  },
  {
    title: "Schedule",
    url: "/student/dashboard/schedule",
    icon: CalendarDays as any,
  },
  {
    title: "Settings",
    url: "/student/dashboard/settings",
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
