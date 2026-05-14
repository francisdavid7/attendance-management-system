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

const page = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });

    console.log(data);
  };

  return (
    <div className="w-1/2 p-12">
      <Card className="w-[80%] mx-auto">
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
                      placeholder="student@university.edu"
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
                <Button disabled={isSubmitting} type="submit" className="gap-2">
                  {isSubmitting ? (
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
