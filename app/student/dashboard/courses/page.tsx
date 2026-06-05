"use client";
import { useState } from "react";
import { Search, MoreHorizontal } from "lucide-react";
import { getAllCourses } from "@/lib/actions/actions";
import Loading from "@/components/dashboard/loaders/dashboard-table-data-loader";
import ErrorState from "@/components/dashboard/error/data-error";


import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function Courses() {
  const { courses, isLoading, error } = getAllCourses();

  if (isLoading) return <Loading />;

  if (error) return <ErrorState />;



  return (
    <section className="space-y-6 p-6">

      <div>

      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight">Courses</h1>

          <p className="text-xl text-muted-foreground">Browse available courses</p>
        </div>

      </div>

      <div className=" flex flex-col gap-5 rounded-2xl border bg-card p-4 md:flex-row md:items-center md:justify-between">
        <div className=" relative w-full ">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input placeholder="Search courses..." className="h-10 rounded-xl pl-9" />
        </div>
      </div>


      <Card className="rounded-2xl border-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader >
              <TableRow className="text-2xl font-bold">
                <TableHead>Course</TableHead>

                <TableHead>Tutor</TableHead>

                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {courses?.map((course: any) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{course.name}</p>
                    </div>
                  </TableCell>

                  <TableCell>{course.tutor?.fullName ?? "No Tutor Assigned"}</TableCell>

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
