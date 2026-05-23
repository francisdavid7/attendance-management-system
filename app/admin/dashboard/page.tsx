"use client";

import {
  DashboardStatsCards,
  type StatsDataType,
} from "@/components/dashboard/dashboard-stats-card";
import Loading from "@/components/dashboard/loaders/dashboard-content-loader";
import useDashboardStats from "@/hooks/use-dashboard-stats";
import { BookOpen, CalendarCheck, GraduationCap, Users } from "lucide-react";

const page = () => {
  const { stats, isLoading, isError } = useDashboardStats();

  if (isLoading) return <Loading />;

  if (isError) return <div>Error</div>;

  console.log(stats);
  const statsData: StatsDataType[] = [
    {
      title: "Total Students",
      value: "1,248",
      icon: GraduationCap,
      description: "+12 added this week",
    },
    {
      title: "Total Tutors",
      value: "48",
      icon: Users,
      description: "5 active today",
    },
    {
      title: "Total Courses",
      value: "26",
      icon: BookOpen,
      description: "3 new this semester",
    },
    {
      title: "Attendance Records",
      value: "18,420",
      icon: CalendarCheck,
      description: "92% attendance rate",
    },
  ];

  return (
    <div className="p-6 space-y-4">
      <header>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          </div>
        </div>
      </header>

      {/* Top cards */}
      <DashboardStatsCards stats={statsData} />
    </div>
  );
};

export default page;
