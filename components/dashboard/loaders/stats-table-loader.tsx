import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

const StatsTableLoader = () => {
  return (
    <SidebarInset>
      <div className="flex min-h-screen flex-col">
        {/* Main Content */}
        <main className="flex-1 space-y-6 p-6">
          <div className="space-y-1">
            <Skeleton className="h-9 w-32" />
          </div>
          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="rounded-2xl border p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="size-8 rounded-xl" />
                </div>

                <Skeleton className="h-8 w-20" />

                <Skeleton className="h-3 w-32" />
              </div>
            ))}
          </div>

          {/* Filter El */}
          <Skeleton className="w-full h-12" />

          {/* Table */}
          <div className="rounded-2xl border p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-48" />

              <Skeleton className="h-9 w-32 rounded-xl" />
            </div>

            <div className="space-y-3">
              {Array.from({ length: 7 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 border-b pb-3"
                >
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 flex-1" />
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-8 w-20 rounded-xl" />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarInset>
  );
};

export default StatsTableLoader;
