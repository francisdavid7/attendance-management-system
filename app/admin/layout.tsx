"use client";

import {
  Calendar,
  LayoutDashboard,
  Settings,
  Users,
  BookOpen,
} from "lucide-react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import type { ItemsTypes } from "@/components/dashboard/dashboard-sidebar";
import getCurrentUser from "@/lib/get-current-user";
import ErrorState from "@/components/dashboard/error/error-state";

const items: ItemsTypes[] = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard as any,
  },
  {
    title: "Students",
    url: "/admin/dashboard/students",
    icon: Users as any,
  },
  {
    title: "Courses",
    url: "/admin/dashboard/courses",
    icon: BookOpen as any,
  },
  {
    title: "Attendance",
    url: "/admin/dashboard/attendance",
    icon: Calendar as any,
  },
  {
    title: "Settings",
    url: "/admin/dashboard/settings",
    icon: Settings as any,
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isLoading, error, mutate } = getCurrentUser();

  if (error) return <ErrorState onRetry={() => mutate()} />;

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
