"use client";

import { StudentsPageHeader } from "@/components/dashboard/admin/students-page-header";
import { StudentsSearchFilters } from "@/components/dashboard/admin/students-search-filter";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStudents } from "@/lib/actions/students";
import { useEffect, useState } from "react";

const studentHeadRow = ["ID", "Student", "Email", "Course", "Tutor"];

const page = () => {
  const [students, setStudents] = useState<
    Awaited<ReturnType<typeof getStudents>>
  >([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const st = await getStudents();
      setStudents(st);
    };
    fetchStudents();
  }, []);

  if (!students) console.log("loading...");

  return (
    <div className="p-6 space-y-4">
      <StudentsPageHeader />
      <StudentsSearchFilters />

      <div className="bg-card px-6 py-4 border rounded-2xl">
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
            {students.splice(0, 5).map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id?.split("-")[0]}</TableCell>
                <TableCell>{student.fullName}</TableCell>
                <TableCell>{student?.email}</TableCell>
                <TableCell>{student?.course ?? "N/A"}</TableCell>
                <TableCell>{student?.tutor ?? "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default page;
