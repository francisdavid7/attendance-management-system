"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { GraduationCapIcon } from "lucide-react";
import {
  getCurrentUser,
  getAllCourses,
  enrollCourse,
  checkCourse,
} from "@/lib/actions/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default function CourseEnrollment() {
  const { user } = getCurrentUser();
  const { courses } = getAllCourses();
  const [selectedCourse, setSelectedCourse] = useState("");
  const { trigger, isMutating } = enrollCourse();
  const { data, isLoading } = checkCourse();

  const router = useRouter();
  const submitCourse = async () => {
    if (!selectedCourse) return;
    try {
      const courseId = selectedCourse;
      const studentCourse = trigger({ courseId });
      toast.promise(studentCourse, {
        loading: "Enrolling...",
        success: "Success 🎉",
        error: "Failed",
      });
      const courseChoice = await studentCourse;
      console.log(courseChoice);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("Roll", data);
  }, []);

  if (isLoading)
    return (
      <div className=" w-1/2 h-125 flex items-center justify-center">
        <div className="relative w-[80%]">
          <Skeleton className="absolute w-full h-full" />
        </div>
      </div>
    );

  return (
    <div className="w-1/2 flex items-center justify-center">
      <Card className="w-[80%]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Course Enrollment
          </CardTitle>
          <CardDescription>
            Select a course to enroll in for the current semester.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Student Information</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="">
                <div>
                  <div className="flex gap-1 text-sm text-muted-foreground">
                    Student Name{" "}
                    <GraduationCapIcon className="text-(--color-primary)" />
                  </div>
                  <p className="font-bold text-xl">{user?.fullName}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="">
            <label className="text-sm font-medium ">Select Course</label>

            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a course" />
              </SelectTrigger>

              <SelectContent>
                {courses?.map((course: any) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-full"
            disabled={isMutating}
            onClick={submitCourse}
          >
            Enroll Course
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
