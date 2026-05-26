import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export function StudentsPageHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* LEFT */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Students</h1>

        <p className="text-sm text-muted-foreground">
          Manage all registered students
        </p>
      </div>

      {/* RIGHT */}
      {/* <Button className="h-10 rounded-xl px-5">
        <Plus className="h-4 w-4" />

        <span>Add Student</span>
      </Button> */}
    </div>
  );
}
