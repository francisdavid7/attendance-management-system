import {
  BookOpen,
  MoreHorizontal,
  Plus,
  Search,
  User2,
  Users,
} from "lucide-react";

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

const stats = [
  {
    title: "Total Courses",
    value: "24",
    icon: BookOpen,
  },

  {
    title: "Active Courses",
    value: "18",
    icon: BookOpen,
  },

  {
    title: "Assigned Tutors",
    value: "12",
    icon: User2,
  },

  {
    title: "Total Enrollments",
    value: "1,248",
    icon: Users,
  },
];

const courses = [
  {
    title: "Web Development",
    tutor: "John Doe",
    students: 120,
    attendance: "92%",
    status: "Active",
  },

  {
    title: "UI/UX Design",
    tutor: "Sarah James",
    students: 84,
    attendance: "88%",
    status: "Active",
  },

  {
    title: "Data Science",
    tutor: "Michael Smith",
    students: 63,
    attendance: "81%",
    status: "Inactive",
  },

  {
    title: "Cyber Security",
    tutor: "No Tutor Assigned",
    students: 40,
    attendance: "75%",
    status: "Pending",
  },
];

const Courses = () => {
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

        <Button className="h-10 rounded-xl px-5">
          <Plus className="h-4 w-4" />

          <span>Create Course</span>
        </Button>
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
          <select className="h-10 rounded-xl border bg-background px-3 text-sm outline-none">
            <option>All Tutors</option>
            <option>Assigned</option>
            <option>Unassigned</option>
          </select>

          <select className="h-10 rounded-xl border bg-background px-3 text-sm outline-none">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Pending</option>
          </select>
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

                <TableHead>Attendance</TableHead>

                <TableHead>Status</TableHead>

                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.title}>
                  {/* COURSE */}
                  <TableCell>
                    <div>
                      <p className="font-medium">{course.title}</p>
                    </div>
                  </TableCell>

                  {/* TUTOR */}
                  <TableCell>{course.tutor}</TableCell>

                  {/* STUDENTS */}
                  <TableCell>{course.students}</TableCell>

                  {/* ATTENDANCE */}
                  <TableCell>{course.attendance}</TableCell>

                  {/* STATUS */}
                  <TableCell>
                    <div
                      className={`inline-flex rounded-lg px-3 py-1 text-xs font-medium ${
                        course.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : course.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {course.status}
                    </div>
                  </TableCell>

                  {/* ACTIONS */}
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="rounded-xl">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
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
