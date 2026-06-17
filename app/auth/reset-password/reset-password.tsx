"use client";

export const dynamic = "force-dynamic";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Loader2, RotateCcw } from "lucide-react";

import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useResetPassword } from "@/lib/actions/actions";

const EmailSchema = z.object({
  password: z.string().min(6, "Password must be atleast 6 characters long"),
  token: z.string().optional(),
});

const ResetPassword = () => {
  const { control, handleSubmit } = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      password: "",
    },
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  const { trigger, isMutating } = useResetPassword();

  const onSubmit = async (values: z.infer<typeof EmailSchema>) => {
    try {
      const token = searchParams.get("token");

      if (!token) return toast.error("Invalid reset token");

      values.token = token;
      const res = await trigger(values);
      toast.success(res.message);
      router.push("/dashboard");
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
        return;
      }
      toast.error(error.message);
    }
  };

  return (
    <div className="w-1/2 flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <RotateCcw />
          </div>

          <CardTitle className="text-2xl">Reset Password</CardTitle>

          <CardDescription>
            Choose a new password to regain access to your account. Once
            updated, you can sign in using your new credentials.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Create new Password
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

            <Button type="submit" disabled={isMutating} className="w-full">
              {isMutating ? (
                <>
                  <Loader2 className="animate-spin" /> Resetting...
                </>
              ) : (
                "Reset password"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
