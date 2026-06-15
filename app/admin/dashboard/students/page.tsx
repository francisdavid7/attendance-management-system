"use client";

import { StudentsPageHeader } from "@/components/dashboard/admin/students-page-header";
import { StudentsSearchFilters } from "@/components/dashboard/admin/students-search-filter";
import ErrorState from "@/components/dashboard/error/data-error";
import Loading from "@/components/dashboard/loaders/dashboard-content-loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStudents } from "@/lib/actions/actions";
import { ChangeEvent, useState } from "react";

export interface StudentType {
  student: string;
  email: string;
  course: string[] | string;
  tutor: string[] | string;
}

const studentHeadRow = ["Student", "Email", "Course", "Tutor"];

const page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { students, isLoading, error, mutate } = getStudents();

  if (isLoading) return <Loading />;

  if (error) return <ErrorState onRetry={() => mutate()} />;

  const filterStudents = students.filter((student: StudentType) => {
    if (!searchQuery) return true;

    const searchTerm = searchQuery.toLocaleLowerCase().trim();

    return (
      student.student.toLowerCase().includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm)
    );
  });

  const handleChage = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="p-6 space-y-4">
      <StudentsPageHeader />
      <StudentsSearchFilters onChange={handleChage as () => any} />

      <div className="bg-card px-6 py-4 border rounded-2xl">
        {students?.length === 0 ? (
          <>
            <p className="text-center m-7">No data to display</p>
          </>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                {studentHeadRow.map((data) => (
                  <TableHead key={data}>{data}</TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {filterStudents.map((student: StudentType) => (
                <TableRow key={student.email}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="" />

                        <AvatarFallback>
                          {student.student
                            .split(" ")
                            .map((name) => name[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="font-medium">{student.student}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">{student?.email}</TableCell>
                  <TableCell className="py-4">
                    {student?.course ?? "N/A"}
                  </TableCell>
                  <TableCell className="py-4">
                    {student?.tutor ?? "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default page;
