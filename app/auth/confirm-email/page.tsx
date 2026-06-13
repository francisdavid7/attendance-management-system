"use client";

export const dynamic = "force-dynamic";

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
import { useRouter, useSearchParams } from "next/navigation";

const confirmRequest = (url: string) => axios.put(url).then((res) => res.data);

const page = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const { trigger, error } = useSWRMutation(
    `/api/auth/verify-email?token=${token}`,
    confirmRequest,
  );

  const redirectToLogin = () => {
    return setTimeout(() => {
      router.replace("/auth/login");
    }, 3000);
  };

  const confirmEmail = async () => {
    try {
      const res = await trigger();

      setStatus("success");
      setMessage(res.message);

      redirectToLogin();
    } catch (error: any) {
      setStatus("error");
    }
  };

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Missing verification token");
      return;
    }

    confirmEmail();
  }, [token]);

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
              {status === "loading"
                ? "Verifying your email"
                : message === "Your email is already verified"
                  ? "Email already verified"
                  : "Email verified"}
            </CardTitle>
          )}
          <CardDescription>
            {status === "loading" ? (
              "Please wait while your email is verified."
            ) : status === "error" ? (
              error.response?.data?.error
            ) : (
              <div>
                {message ? (
                  <p>{message}</p>
                ) : (
                  <div>
                    <p>Your email has been successfully verified.</p>
                    <p>
                      You'll be redirected shortly, if not, use button below to
                      go to login
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardDescription>
        </CardHeader>

        <CardContent className="w-full">
          {status !== "loading" && (
            <Link href="/auth/login">
              <Button className="w-full mb-4">
                <LogIn /> Back to Login
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
