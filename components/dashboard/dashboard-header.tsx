"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell } from "lucide-react";
import { Button } from "../ui/button";
import { getCurrentUser } from "@/lib/actions/actions";
import { Skeleton } from "../ui/skeleton";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "../theme-toggle";

export function DashboardHeader() {
  const { user, isLoading } = getCurrentUser();
  const pathname = usePathname();
  const splitedText = pathname.split("/");
  const extractedText = splitedText[splitedText.length - 1];
  const formatedText =
    extractedText.charAt(0).toUpperCase() + extractedText.slice(1);
  const headerText = extractedText === "dashboard" ? "Overview" : formatedText;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md">
      {/* LEFT */}
      {isLoading ? (
        <div className="flex gap-3">
          <Skeleton className="w-9 h-9 rounded-lg" />
          <Skeleton className="h-9 w-40 rounded-lg" />
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <SidebarTrigger className="px-4 border-r border-muted" />

          <div>
            <h1 className="text-lg font-semibold">{headerText}</h1>
          </div>
        </div>
      )}

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {isLoading ? (
          <>
            <Skeleton className="h-9 w-9 rounded-lg" />
          </>
        ) : (
          <>
            <ThemeToggle />
            {/* <Button variant="outline" size="icon-lg">
              <Bell className="h-5 w-5" />
            </Button> */}
          </>
        )}

        {/* User Avatar */}
        {isLoading ? (
          <div className="flex items-center gap-2 rounded-lg border px-2 py-1">
            <Skeleton className="h-8 w-8 rounded-full" />

            <div className="hidden md:block space-y-1">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-2 w-12" />
            </div>
          </div>
        ) : (
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-lg border px-2 py-1 hover:bg-muted"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
              {user?.fullName?.[0]}
            </div>

            <div className="hidden text-left md:block">
              <p className="text-[12px] font-medium">
                {user?.fullName?.split(" ")[0]}
              </p>

              <p className="text-[10px] text-muted-foreground">{user?.role}</p>
            </div>
          </Button>
        )}
      </div>
    </header>
  );
}
