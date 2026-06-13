"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { tutorStudent } from "@/lib/actions/actions";

export function StudentsTable() {
  const { data, isLoading } = tutorStudent();
  console.log(data)
  return (

    <div className="p-5">
      <div className="rounded-md border p-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Enrolled</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data ? (
              data[0]?.students?.map((student: any) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">
                    {student.student.fullName}
                  </TableCell>

                  <TableCell>{student.student.email}</TableCell>

                  <TableCell>
                    <span
                      className="rounded-[5px] px-2 py-1 text-xs bg-primary/20 text-(--color-primary)"
                    >
                      Enrolled
                    </span>
                  </TableCell>

                  <TableCell>
                    {new Date(
                      student.student.createdAt
                    ).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric"
                    })}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center"
                >
                  No students found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

    </div>
  );
}