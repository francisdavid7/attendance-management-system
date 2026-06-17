import ErrorState from "@/components/dashboard/error/data-error";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, Search } from "lucide-react";
import Loading from "../loading";

const page = () => {
  const filteredTutored: any[] = [];

  return (
    <section className="space-y-6 p-6">
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
          <Select defaultValue="All Courses">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="All Courses">All Attendance</SelectItem>
                <SelectItem value="Assigned">PRESENT</SelectItem>
                <SelectItem value="Unassigned">ABSENT</SelectItem>
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
                {filteredTutored.map((tutor: any) => (
                  <TableRow key={tutor.email}>
                    {/* TUTOR */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="" />

                          <AvatarFallback>
                            {tutor.fullName
                              .split(" ")
                              .map((name: any) => name[0])
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
                    <TableCell>
                      {tutor.assignedCourses[0] ?? "No course assigned yet"}
                    </TableCell>

                    {/* STUDENTS */}
                    <TableCell>{tutor.totalStudents}</TableCell>

                    {/* STATUS */}
                    <TableCell>
                      <Badge
                        variant={
                          tutor.status === "Active" ? "default" : "destructive"
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
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default page;
