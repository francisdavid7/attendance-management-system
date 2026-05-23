"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw } from "lucide-react";

type ErrorStateProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

const ErrorState = ({
  title = "Something went wrong",
  message = "We couldn’t load the data. Please check your connection and try again.",
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center">
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
          <AlertTriangle className="h-6 w-6" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold">{title}</h2>

        {/* Message */}
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>

        {/* Actions */}
        <div className="mt-6 flex justify-center gap-3">
          {onRetry && (
            <Button onClick={onRetry} className="rounded-xl">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
