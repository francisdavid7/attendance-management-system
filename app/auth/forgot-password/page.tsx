"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CircleCheck, Loader2, Mail } from "lucide-react";

import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import z, { email } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForgotPassword } from "@/lib/actions/actions";
import { toast } from "sonner";

const EmailSchema = z.object({
  email: z.email(),
});

const ForgotPassword = () => {
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { control, handleSubmit } = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: "",
    },
  });
  const { trigger, isMutating } = useForgotPassword();

  const onSubmit = async (value: { email: string }) => {
    try {
      const res = await trigger(value);
      setSuccessMessage(res.message);
      setIsSubmitSuccess(true);
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="w-1/2 flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            {isSubmitSuccess ? (
              <CircleCheck className="h-6 w-6 text-primary" />
            ) : (
              <Mail className="h-6 w-6 text-primary" />
            )}
          </div>

          <CardTitle className="text-2xl">
            {isSubmitSuccess ? "Check Your Email" : "Forgot Password"}
          </CardTitle>

          <CardDescription>
            {isSubmitSuccess
              ? `${successMessage}`
              : "Enter your email address and we'll send you a password reset link."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {isSubmitSuccess ? (
            <Link href="/auth/login">
              <Button type="submit" className="w-full">
                Back to Login
              </Button>
            </Link>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>

                    <Input
                      type="email"
                      id={field.name}
                      placeholder="john@example.com"
                      {...field}
                    />

                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button type="submit" disabled={isMutating} className="w-full">
                {isMutating ? (
                  <>
                    <Loader2 className="animate-spin" /> Please wait...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>
          )}

          {!isSubmitSuccess && (
            <div className="mt-6 text-center text-sm">
              Remember your password?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-primary hover:underline"
              >
                Back to Login
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
