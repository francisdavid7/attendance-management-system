import { Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function StudentsSearchFilters({ onChange }: { onChange: () => any }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border bg-card p-4 md:flex-row md:items-center md:justify-between">
      {/* SEARCH */}
      <div className="relative w-full md:max-w-sm">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          onChange={onChange}
          placeholder="Search students..."
          className="h-10 rounded-xl pl-9"
        />
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap items-center gap-3">
        {/* COURSE FILTER */}
        <select className="h-10 rounded-xl border bg-background px-3 text-sm outline-none">
          <option>All Courses</option>
          <option>Web Development</option>
          <option>UI/UX Design</option>
          <option>Data Science</option>
        </select>

        {/* STATUS FILTER */}
        <select className="h-10 rounded-xl border bg-background px-3 text-sm outline-none">
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>Suspended</option>
        </select>

        {/* FILTER BUTTON */}
        <Button variant="outline" className="h-10 rounded-xl">
          <SlidersHorizontal className="h-4 w-4" />

          <span>Filters</span>
        </Button>
      </div>
    </div>
  );
}
