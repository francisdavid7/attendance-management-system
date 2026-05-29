import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTutors, useAssignTutor } from "@/lib/actions/actions";
import { Loader2, UserPen, UserPlus } from "lucide-react";
import type { Tutor } from "../../tutors/page";
import { useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";

interface TutorType extends Tutor {
  id: string;
}

const AssignTutor = ({
  course,
  tutor,
  courseId,
}: {
  tutor: string;
  course: string;
  courseId: string;
}) => {
  const [selectedTutor, setSelectedTutor] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { tutors, isLoading } = getTutors();
  const { trigger, isMutating } = useAssignTutor();

  if (!tutors) return;

  const filteredTutors = tutors.filter(
    (tutor: TutorType) => tutor.assignedCourses.length < 1,
  );

  const handleCourseAssign = async () => {
    if (!selectedTutor) {
      toast.error("Kindly select a tutor");
      return;
    }

    try {
      const data = {
        courseId,
        tutorId: selectedTutor,
      };

      const res = await trigger(data);

      toast.success(res.message);

      mutate("/api/admin/courses");
      setIsOpen(false);
    } catch (err: any) {
      console.log(err?.response);
      console.log(err);

      toast.error(err?.response?.data?.message || "Failed to assign tutor");
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          {tutor === "No Tutor Assigned" ? (
            <UserPlus className="h-4 w-4" />
          ) : (
            <UserPen />
          )}

          {tutor !== "No Tutor Assigned" ? "Change Tutor" : "Assign Tutor"}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <Card className="px-5">
          <DialogHeader>
            <DialogTitle>
              {tutor !== "No Tutor Assigned" ? "Change Tutor" : "Assign Tutor"}
            </DialogTitle>

            <DialogDescription>
              Assign a tutor to <span className="font-semibold">{course}</span>.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Tutor</label>

              <Select value={selectedTutor} onValueChange={setSelectedTutor}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a tutor" />
                </SelectTrigger>

                <SelectContent align="start" className="p-2">
                  {isLoading ? (
                    <SelectLabel>Fetching tutors, please wait...</SelectLabel>
                  ) : (
                    <>
                      {filteredTutors.map((tutor: TutorType) => (
                        <SelectItem key={tutor.id} value={tutor.id}>
                          {tutor.fullName}
                        </SelectItem>
                      ))}
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <DialogTrigger asChild>
                <Button variant="outline" className="h-10 rounded-xl px-5">
                  Cancel
                </Button>
              </DialogTrigger>

              <Button
                type="submit"
                disabled={isMutating}
                className="h-10 rounded-xl px-5"
                onClick={handleCourseAssign}
              >
                {isMutating ? (
                  <>
                    <Loader2 className="animate-spin" /> Assigning...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default AssignTutor;
