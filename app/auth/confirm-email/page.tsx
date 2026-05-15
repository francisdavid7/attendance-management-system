"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleCheck, CircleX, LogIn, X } from "lucide-react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import axios from "axios";
import useSWRMutation from "swr/mutation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const confirmRequest = (url: string) => axios.put(url).then((res) => res.data);

const page = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { trigger, error } = useSWRMutation(
    `/api/auth/verify-email?token=${token}`,
    confirmRequest,
  );

  const confirmEmail = async () => {
    try {
      const res = await trigger();
      setStatus("success");
    } catch (error: any) {
      setStatus("error");
    }
  };

  useEffect(() => {
    confirmEmail();
  }, []);

  return (
    <div className="w-1/2 p-12 flex items-center justify-center">
      <Card className="md:w-[80%] mx-auto p-8 text-center flex flex-col items-center justify-center gap-2">
        <Button
          variant={status === "error" ? "destructive" : "outline"}
          className="hover:bg-transparent"
          size="icon-lg"
        >
          {status === "loading" ? (
            <Loader2 className="animate-spin" />
          ) : status === "error" ? (
            <CircleX />
          ) : (
            <CircleCheck />
          )}
        </Button>

        <CardHeader className="w-full">
          {status !== "error" && (
            <CardTitle className="text-2xl md:text-3xl font-bold">
              {status === "loading" ? "Verifying your email" : "Email verified"}
            </CardTitle>
          )}
          <CardDescription>
            {status === "loading"
              ? "Please wait while your email is verified."
              : status === "error"
                ? error.response?.data?.error
                : "Your email has been successfully verified."}
          </CardDescription>
        </CardHeader>

        <CardContent className="w-full">
          {status === "success" ||
            (status === "error" && (
              <Link href="/auth/login">
                <Button className="w-full mb-4">
                  <LogIn /> Back to Login
                </Button>
              </Link>
            ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
