"use client";

import React, { ChangeEvent, useState } from "react";
import {
  BookOpen,
  MoreHorizontal,
  Search,
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
import { getTutors } from "@/lib/actions/actions";
import AddTutor from "./components/add-tutor";
import ErrorState from "@/components/dashboard/error/data-error";
import { Badge } from "@/components/ui/badge";
import StatsTableLoader from "@/components/dashboard/loaders/stats-table-loader";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loading from "@/components/dashboard/loaders/dashboard-table-data-loader";

interface StatItem {
  title: string;
  value: string;
  icon: React.ComponentType<any>;
}

export interface Tutor {
  fullName: string;
  email: string;
  assignedCourses: string | string[];
  totalStudents: number;
  status?: "Active" | "Inactive" | "Pending";
}

const Tutors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { tutors, coursesAssigned, isLoading, error, mutate } = getTutors();

  if (isLoading) return <StatsTableLoader />;

  if (error) return <ErrorState onRetry={() => mutate()} />;

  const activeTutors =
    tutors?.filter((tutor: any) => tutor.assignedCourses.length > 0) || [];

  const stats: StatItem[] = [
    {
      title: "Total Tutors",
      value: tutors?.length,
      icon: Users,
    },

    {
      title: "Active Tutors",
      value: activeTutors?.length,
      icon: UserCheck,
    },

    {
      title: "Assigned Courses",
      value: coursesAssigned,
      icon: BookOpen,
    },
  ];

  const filteredTutored = tutors?.filter((tutor: Tutor) => {
    if (!searchQuery.trim()) return true;

    const term = searchQuery.toLowerCase().trim();

    return (
      tutor.email.toLowerCase().includes(term) ||
      tutor.fullName.toLowerCase().includes(term)
    );
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

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

        <AddTutor />
      </div>

      {/* STATS */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
            onChange={handleSearch}
          />
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap items-center gap-3">
          <Select defaultValue="All Courses">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="All Courses">All Tutors</SelectItem>
                <SelectItem value="Assigned">Assigned</SelectItem>
                <SelectItem value="Unassigned">Unassigned</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* TUTORS TABLE */}
      <Card className="rounded-2xl border-0">
        <CardContent className="p-0">
          {filteredTutored?.length === 0 ? (
            <>
              <p className="text-center m-7">No data to display</p>
            </>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tutor</TableHead>

                  <TableHead>Assigned Course</TableHead>

                  <TableHead>Students</TableHead>

                  <TableHead>Status</TableHead>

                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {error || !tutors ? (
                  <ErrorState onRetry={() => mutate()} />
                ) : (
                  <>
                    {!filteredTutored ? (
                      <Loading />
                    ) : (
                      <>
                        {filteredTutored.map((tutor: Tutor) => (
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
                                  <p className="font-medium">
                                    {tutor.fullName}
                                  </p>

                                  <p className="text-sm text-muted-foreground">
                                    {tutor.email}
                                  </p>
                                </div>
                              </div>
                            </TableCell>

                            {/* COURSE */}
                            <TableCell>
                              {tutor.assignedCourses[0] ??
                                "No course assigned yet"}
                            </TableCell>

                            {/* STUDENTS */}
                            <TableCell>{tutor.totalStudents}</TableCell>

                            {/* STATUS */}
                            <TableCell>
                              <Badge
                                variant={
                                  tutor.status === "Active"
                                    ? "default"
                                    : "destructive"
                                }
                              >
                                {tutor.status}
                              </Badge>
                            </TableCell>

                            {/* ACTIONS */}
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-xl"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    )}
                  </>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default Tutors;
