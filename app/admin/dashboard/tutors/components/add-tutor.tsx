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
import { registerSchema } from "@/lib/validation/auth";
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

const sendRequest = async (
  url: string,
  { arg }: { arg: z.infer<typeof registerSchema> },
) => axios.post(url, arg).then((res) => res.data);

type RegisterTutorData = z.infer<typeof registerSchema>;

const AddTutor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const { trigger, isMutating } = useSWRMutation<
    any,
    any,
    string,
    RegisterTutorData
  >("/api/courses/create-tutor", sendRequest);

  // Reset form when submission is successful
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(); // Resets to initial defaultValues
    }
  }, [isSubmitSuccessful, reset]);

  const handleAddTutor = async (data: z.infer<typeof registerSchema>) => {
    try {
      const res = await trigger(data);
      toast.success(
        `Tutor ${res.tutor.fullName?.split(" ")[0]} has been created!`,
      );
      setIsOpen(false);
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
            <span>Add Tutor</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="p-0">
          <Card className="px-6">
            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl font-bold">
                Create Tutor Account
              </DialogTitle>

              <DialogDescription className="text-xs">
                Fill in the tutor’s details below to create a new tutor profile
                and grant access to the attendance management system.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(handleAddTutor)}>
              <FieldGroup>
                <Controller
                  name="fullName"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field className="gap-1" data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                      <Input
                        {...field}
                        type="text"
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter tuttor's full name"
                      />

                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field className="gap-1" data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Email Address
                      </FieldLabel>

                      <Input
                        {...field}
                        type="email"
                        id={field.name}
                        placeholder="tutor@example.edu"
                        aria-invalid={fieldState.invalid}
                      />

                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field className="gap-1" data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Create Tutor's Password
                      </FieldLabel>

                      <Input
                        {...field}
                        type="password"
                        id={field.name}
                        placeholder="••••••••••••••"
                        aria-invalid={fieldState.invalid}
                        className="placeholder:text-muted-foreground/20"
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
                        <Plus /> Create Tutor
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

export default AddTutor;
