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
import { GraduationCapIcon, Loader2 } from "lucide-react";
import {
  getCurrentUser,
  getAllCourses,
  enrollCourse,
} from "@/lib/actions/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CourseEnrollment() {
  const { user } = getCurrentUser();
  const { courses } = getAllCourses();
  const [selectedCourse, setSelectedCourse] = useState("");
  const { trigger, isMutating } = enrollCourse();
  const router = useRouter();

  const submitCourse = async () => {
    if (!selectedCourse) return;
    try {
      const courseId = selectedCourse;
      const res = await trigger({ courseId });
      toast.success("Course enrolled successfully!");
      router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-1/2 flex items-center justify-center">
      <Card className="w-[80%]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Course Enrollment
          </CardTitle>
          <CardDescription>Select a course to enroll.</CardDescription>
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
            {isMutating ? (
              <>
                <Loader2 className="animate-spin" />
                Loading ...
              </>
            ) : (
              "Enroll Course"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
