"use client";

import { DashboardAnalyticsSection } from "@/components/dashboard/admin/dashboard-analytics-section";
import {
  DashboardStatsCards,
  type StatsDataType,
} from "@/components/dashboard/dashboard-stats-card";
import ErrorState from "@/components/dashboard/error/data-error";
import Loading from "@/components/dashboard/loaders/dashboard-content-loader";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useDashboardStats from "@/hooks/use-dashboard-stats";
import { BookOpen, CalendarCheck, GraduationCap, Users } from "lucide-react";

const studentHeadRow = ["S/N", "Student", "Email", "Course", "Tutor"];

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
      <DashboardAnalyticsSection />

      {/* <div>
        <Table>
          <TableCaption>Recent students</TableCaption>
          <TableHeader>
            <TableRow>
              {studentHeadRow.map((data) => (
                <TableHead key={data}>{data}</TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {students.splice(0, 5).map((student, index) => (
              <TableRow key={student.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{student.fullName}</TableCell>
                <TableCell>{student?.email}</TableCell>
                <TableCell>{student?.course ?? "N/A"}</TableCell>
                <TableCell>{student?.tutor ?? "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div> */}
    </div>
  );
};

export default page;
