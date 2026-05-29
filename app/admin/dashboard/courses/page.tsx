"use client";

import { BookOpen, MoreHorizontal, Search, User2, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCourses } from "@/lib/actions/actions";
import ErrorState from "@/components/dashboard/error/data-error";
import CreateCourse from "./components/create-course";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatsTableLoader from "@/components/dashboard/loaders/stats-table-loader";
import AssignTutor from "./components/assign-tutor";

interface CourseType {
  courseId: string;
  course: string;
  tutor: string;
  totalStudents: number;
  status: string;
}

const Courses = () => {
  const { courses, isLoading, error, mutate } = getCourses();

  if (isLoading) return <StatsTableLoader />;

  if (error) return <ErrorState onRetry={() => mutate()} />;

  const activeCourses = courses.filter(
    (course: any) => course.status === "Active",
  );

  const assignedCourses = courses.filter(
    (course: any) => course.tutor !== "No Tutor Assigned",
  );

  const stats = [
    {
      title: "Total Courses",
      value: courses.length,
      icon: BookOpen,
    },

    {
      title: "Active Courses",
      value: activeCourses.length,
      icon: BookOpen,
    },

    {
      title: "Assigned Tutors",
      value: assignedCourses.length,
      icon: User2,
    },

    {
      title: "Total Enrollments",
      value: "1,248",
      icon: Users,
    },
  ];

  return (
    <section className="space-y-6 p-6">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>

          <p className="text-sm text-muted-foreground">
            Manage all courses and tutor assignments
          </p>
        </div>

        <CreateCourse />
      </div>

      {/* STATS */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title} className="rounded-2xl border-0">
              <CardContent className="flex items-center justify-between p-6">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{item.title}</p>

                  <h2 className="text-3xl font-bold">{item.value}</h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* SEARCH + FILTERS */}
      <div className="flex flex-col gap-4 rounded-2xl border bg-card p-4 md:flex-row md:items-center md:justify-between">
        {/* SEARCH */}
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search courses..."
            className="h-10 rounded-xl pl-9"
          />
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap items-center gap-3">
          <Select defaultValue="All Tutors">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="All Tutors">All Tutors</SelectItem>
                <SelectItem value="Assigned">Assigned</SelectItem>
                <SelectItem value="Unassigned">Unassigned</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select defaultValue="All Status">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="All Status">All Status</SelectItem>
                <SelectItem value="Assigned">Active</SelectItem>
                <SelectItem value="Unassigned">Inactive</SelectItem>
                <SelectItem value="Unassigned">Pending</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* COURSES TABLE */}
      <Card className="rounded-2xl border-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>

                <TableHead>Tutor</TableHead>

                <TableHead>Students</TableHead>

                <TableHead>Status</TableHead>

                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {courses.map((course: CourseType) => (
                <TableRow className="hover:bg-muted/10" key={course.course}>
                  {/* COURSE */}
                  <TableCell>
                    <div>
                      <p className="font-medium">{course.course}</p>
                    </div>
                  </TableCell>

                  {/* TUTOR */}
                  <TableCell>{course.tutor}</TableCell>

                  {/* STUDENTS */}
                  <TableCell>{course.totalStudents}</TableCell>

                  {/* STATUS */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          course.status === "Active" ? "default" : "destructive"
                        }
                      >
                        {course.status}
                      </Badge>
                    </div>
                  </TableCell>

                  {/* ACTIONS */}
                  <TableCell>
                    <AssignTutor
                      tutor={course.tutor}
                      course={course.course}
                      courseId={course.courseId}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
};

export default Courses;
