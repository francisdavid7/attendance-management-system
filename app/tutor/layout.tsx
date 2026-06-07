"use client";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import type { ItemsTypes } from "@/components/dashboard/dashboard-sidebar";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { CalendarCheck, CalendarDays, LayoutDashboard, Settings, Users } from "lucide-react";

const items: ItemsTypes[] = [
  {
    title: "Dashboard",
    url: "/tutor/dashboard",
    icon: LayoutDashboard as any,
  },
  {
    title: "Students",
    url: "/tutor/dashboard/students",
    icon: Users as any,
  },
  {
    title: "Attendance",
    url: "/tutor/dashboard/attendance",
    icon: CalendarCheck as any,
  },
  {
    title: "Schedule",
    url: "/tutor/dashboard/schedule",
    icon: CalendarDays as any,
  },
  {
    title: "Settings",
    url: "/tutor/dashboard/settings",
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
