"use client";

import * as z from "zod";
import { loginSchema } from "@/lib/validation/auth";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
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
import { useState } from "react";

const sendRequest = async (
  url: string,
  { arg }: { arg: z.infer<typeof loginSchema> },
) => axios.post(url, arg).then((res) => res.data);

const page = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { trigger, isMutating } = useSWRMutation<
    { message: string },
    string,
    string,
    z.infer<typeof loginSchema>
  >("/api/auth/login", sendRequest);

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const res = await trigger(data);

      toast.success(res.message);
      router.push("/dashboard");
      router.refresh();
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
      <Card className="lg:w-[80%] lg:mt-0 mt-10 w-full mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Sign in to continue to your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="gap-5">
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
                    <div className="flex justify-between">
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                      <Link
                        href="/auth/forgot-password"
                        className="cursor-pointer font-medium text-primary"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <div className="relative">
                      <Input
                        {...field}
                        type={isVisible ? "text" : "password"}
                        id={field.name}
                        placeholder="••••••••••••••"
                        aria-invalid={fieldState.invalid}
                        className="placeholder:text-muted-foreground/20"
                      />

                      <div
                        onClick={() => setIsVisible((prev) => !prev)}
                        className="absolute right-4 bottom-2.5 cursor-pointer text-muted-foreground/80"
                      >
                        {isVisible ? <EyeOff /> : <Eye />}
                      </div>
                    </div>

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
                    "Login →"
                  )}
                </Button>
              </Field>

              <FieldSeparator />

              <FieldDescription className="flex justify-center gap-1">
                Don't have an account?
                <Link
                  href="/auth/register"
                  className="text-primary font-semibold no-underline"
                >
                  Sign up
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
