"use client";

import * as z from "zod";
import { registerSchema } from "@/lib/validation/auth";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const sendRequest = async (
  url: string,
  { arg }: { arg: z.infer<typeof registerSchema> },
) => axios.post(url, arg).then((res) => res.data);

const page = () => {
  const { trigger, isMutating } = useSWRMutation<
    { user: { id: string; email: string } },
    any,
    string,
    z.infer<typeof registerSchema>
  >("/api/auth/register", sendRequest);
  const { control, handleSubmit } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      const { user } = await trigger(data);
      sessionStorage.setItem("user", JSON.stringify(user));

      toast.success("Registeration sucessfull!");
      router.push("/auth/verify-email");
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
        return;
      }
      toast.error(error.message);
    }
  };

  return (
    <div className="lg:w-1/2 w-full md:p-12 px-4 py-12 flex items-center justify-center">
      <Card className="lg:w-[80%] w-full mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Join AttendX</CardTitle>
          <CardDescription>
            Create your student account to start tracking your attendance.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="gap-5">
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
                      placeholder="Enter your full name"
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
                    <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>

                    <Input
                      {...field}
                      type="email"
                      id={field.name}
                      placeholder="student@example.edu"
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
                      Create Password
                    </FieldLabel>

                    <Input
                      {...field}
                      type="password"
                      id={field.name}
                      placeholder="••••••••"
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Field>
                <Button disabled={isMutating} type="submit" className="gap-2">
                  {isMutating ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Loading ...
                    </>
                  ) : (
                    "Create Account →"
                  )}
                </Button>
              </Field>

              <FieldSeparator />

              <FieldDescription className="flex justify-center gap-1">
                Already have an account?
                <Link
                  href="/auth/login"
                  className="text-primary font-semibold no-underline"
                >
                  Sign in
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
