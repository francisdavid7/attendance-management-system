"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Mail } from "lucide-react";

import { Controller, useForm } from "react-hook-form";

export default function ForgotPasswordPage() {
  const {control} = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: { email: string }) => {
    console.log(values);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-6 w-6 text-primary" />
          </div>

          <CardTitle className="text-2xl">
            Forgot Password
          </CardTitle>

          <CardDescription>
            Enter your email address and we'll send you a
            password reset link.
          </CardDescription>
        </CardHeader>

        <CardContent>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <Controller
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>

                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
              >
                Send Reset Link
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm">
            Remember your password?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-primary hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}