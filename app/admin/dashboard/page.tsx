"use client";

import {
  DashboardStatsCards,
  type StatsDataType,
} from "@/components/dashboard/dashboard-stats-card";
import ErrorState from "@/components/dashboard/error/data-error";
import Loading from "@/components/dashboard/loaders/dashboard-content-loader";
import useDashboardStats from "@/hooks/use-dashboard-stats";
import { BookOpen, CalendarCheck, GraduationCap, Users } from "lucide-react";

const page = () => {
  const { stats, isLoading, isError, mutate } = useDashboardStats();

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <div>
        <ErrorState onRetry={() => mutate()} />
      </div>
    );

  const statsData: StatsDataType[] = [
    {
      title: "Total Students",
      value: stats.totalStudents,
      icon: GraduationCap,
      description: "+12 added this week",
    },
    {
      title: "Total Tutors",
      value: stats.totalTutors,
      icon: Users,
      description: "5 active today",
    },
    {
      title: "Total Courses",
      value: stats.totalCourses,
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
