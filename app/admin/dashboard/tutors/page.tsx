import {
  BookOpen,
  MoreHorizontal,
  Plus,
  Search,
  ShieldCheck,
  UserCheck,
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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const stats = [
  {
    title: "Total Tutors",
    value: "24",
    icon: Users,
  },

  {
    title: "Active Tutors",
    value: "18",
    icon: UserCheck,
  },

  {
    title: "Assigned Courses",
    value: "32",
    icon: BookOpen,
  },

  {
    title: "Verified Tutors",
    value: "20",
    icon: ShieldCheck,
  },
];

const tutors = [
  {
    fullName: "John Doe",
    email: "john@example.com",
    course: "Web Development",
    students: 120,
    attendance: "92%",
    status: "Active",
  },

  {
    fullName: "Sarah James",
    email: "sarah@example.com",
    course: "UI/UX Design",
    students: 84,
    attendance: "88%",
    status: "Active",
  },

  {
    fullName: "Michael Smith",
    email: "michael@example.com",
    course: "Cyber Security",
    students: 63,
    attendance: "81%",
    status: "Pending",
  },

  {
    fullName: "David Wilson",
    email: "david@example.com",
    course: "Data Science",
    students: 41,
    attendance: "74%",
    status: "Inactive",
  },
];

const Tutors = () => {
  return (
    <section className="space-y-6 p-6">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Tutors</h1>

          <p className="text-sm text-muted-foreground">
            Manage tutors, assigned courses and performance
          </p>
        </div>

        <Button className="h-10 rounded-xl px-5">
          <Plus className="h-4 w-4" />

          <span>Add Tutor</span>
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
            placeholder="Search tutors..."
            className="h-10 rounded-xl pl-9"
          />
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap items-center gap-3">
          <select className="h-10 rounded-xl border bg-background px-3 text-sm outline-none">
            <option>All Courses</option>
            <option>Web Development</option>
            <option>UI/UX Design</option>
            <option>Cyber Security</option>
          </select>

          <select className="h-10 rounded-xl border bg-background px-3 text-sm outline-none">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Pending</option>
          </select>
        </div>
      </div>

      {/* TUTORS TABLE */}
      <Card className="rounded-2xl border-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tutor</TableHead>

                <TableHead>Assigned Course</TableHead>

                <TableHead>Students</TableHead>

                <TableHead>Attendance</TableHead>

                <TableHead>Status</TableHead>

                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {tutors.map((tutor) => (
                <TableRow key={tutor.email}>
                  {/* TUTOR */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="" />

                        <AvatarFallback>
                          {tutor.fullName
                            .split(" ")
                            .map((name) => name[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="font-medium">{tutor.fullName}</p>

                        <p className="text-sm text-muted-foreground">
                          {tutor.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* COURSE */}
                  <TableCell>{tutor.course}</TableCell>

                  {/* STUDENTS */}
                  <TableCell>{tutor.students}</TableCell>

                  {/* ATTENDANCE */}
                  <TableCell>{tutor.attendance}</TableCell>

                  {/* STATUS */}
                  <TableCell>
                    <div
                      className={`inline-flex rounded-lg px-3 py-1 text-xs font-medium ${
                        tutor.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : tutor.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {tutor.status}
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

export default Tutors;
