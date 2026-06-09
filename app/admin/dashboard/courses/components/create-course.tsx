import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Loader2, Plus } from "lucide-react";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { mutate } from "swr";

const sendRequest = async (
  url: string,
  { arg }: { arg: z.infer<typeof CourseSchema> },
) => axios.post(url, arg).then((res) => res.data);

const CourseSchema = z.object({
  name: z.string().min(3, "Course name must be at least three characters"),
  description: z.string().optional(),
});

type CourseType = z.infer<typeof CourseSchema>;

const CreateCourse = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<z.infer<typeof CourseSchema>>({
    resolver: zodResolver(CourseSchema),
    defaultValues: { name: "" },
  });

  const { trigger, isMutating } = useSWRMutation<
    string,
    unknown,
    string,
    CourseType
  >("/api/courses/create-course", sendRequest);

  // Reset form when submission is successful
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(); // Resets to initial defaultValues
    }
  }, [isSubmitSuccessful, reset]);

  const handleCreateCourse = async (data: z.infer<typeof CourseSchema>) => {
    try {
      const res: any = await trigger(data);
      setIsOpen(false);
      mutate("/api/admin/courses");
      toast.success(res.message);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
        return;
      }
      toast.error(error.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-center justify-center">
        <DialogTrigger asChild>
          <Button className="h-10 rounded-xl px-5">
            <Plus className="h-4 w-4" />

            <span>Create Course</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="p-0">
          <Card className="px-6">
            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl font-bold">
                Create New Course
              </DialogTitle>

              <DialogDescription className="text-xs">
                Add a new course to the system.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(handleCreateCourse)}>
              <FieldGroup>
                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field className="gap-1" data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Course name</FieldLabel>

                      <Input
                        {...field}
                        type="text"
                        id={field.name}
                        placeholder="e.g cyber security"
                        aria-invalid={fieldState.invalid}
                      />

                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="description"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field className="gap-1" data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Course Description (Optional)
                      </FieldLabel>

                      <Textarea
                        {...field}
                        id={field.name}
                        placeholder="Enter description"
                        aria-invalid={fieldState.invalid}
                        className=""
                      />

                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Field>
                  <Button type="submit" disabled={isMutating}>
                    {isMutating ? (
                      <>
                        <Loader2 className="animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus /> Create Course
                      </>
                    )}
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </Card>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default CreateCourse;
