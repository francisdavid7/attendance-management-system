"use client";

import { AlertCircle, RefreshCcw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

type ErrorStateProps = {
  onRetry?: () => void;
};

export default function ErrorState({ onRetry }: ErrorStateProps) {
  const pathname = usePathname();
  const splitedText = pathname.split("/");
  const extractedText = splitedText[splitedText.length - 1];

  return (
    <div className="flex items-center justify-center min-h-75 w-full">
      <div className="w-full max-w-md space-y-4">
        <Alert variant="destructive" className="rounded-2xl">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Failed to load {extractedText} data</AlertTitle>
          <AlertDescription>
            We couldn’t fetch the latest stats. This may be due to a network
            issue or server error.
          </AlertDescription>
        </Alert>

        <div className="flex justify-end">
          <Button
            onClick={onRetry}
            variant="outline"
            className="gap-2 rounded-xl"
          >
            <RefreshCcw className="h-4 w-4" />
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
