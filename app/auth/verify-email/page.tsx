"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogIn, MailCheck, RotateCw } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const page = () => {
  const [user, setuser] = useState<{ id: string; email: string } | null>(null);

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("user") ?? "null");
    setuser(data);
  }, []);

  if (!user)
    return (
      <div className="w-1/2 p-12 flex items-center justify-center">
        <Card className="md:w-[50%] mx-auto p-8 text-center flex flex-col items-center justify-center">
          <p>No action to take</p>
          <Button className="w-full mb-4">
            <LogIn /> Back to Login
          </Button>
        </Card>
      </div>
    );

  const { id, email } = user;

  return (
    <div className="w-1/2 p-12 flex items-center justify-center">
      <Card className="md:w-[80%] mx-auto p-8 text-center flex flex-col items-center justify-center">
        <Button
          variant="outline"
          className="hover:bg-transparent"
          size="icon-lg"
        >
          <MailCheck />
        </Button>

        <CardHeader className="w-full">
          <CardTitle className="text-2xl md:text-3xl font-bold mb-2">
            Check your email
          </CardTitle>
          <CardDescription>
            We've sent a verification link to{" "}
            <span className="font-medium">{email}</span>. Please click the link
            in the email to activate your account.
          </CardDescription>
        </CardHeader>

        <CardContent className="w-full">
          <Link href="/auth/login">
            <Button className="w-full mb-4">
              <LogIn /> Back to Login
            </Button>
          </Link>

          <CardDescription className="mb-2">
            Didn't receive the email?
          </CardDescription>
          <CardDescription className="cursor-pointer font-medium text-primary flex gap-1 items-center justify-center">
            Resend Email <RotateCw size={12} />
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
