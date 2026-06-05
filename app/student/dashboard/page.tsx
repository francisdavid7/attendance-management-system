"use client"
import Chart from "@/components/student/student-dashboard/dashboard";
import RecentHistory from "@/components/student/student-dashboard/table/recent";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentUser } from "@/lib/actions/actions";
const Dashboard = () => {
  const { user, isLoading } = getCurrentUser();
  return <div>


    {isLoading ? (
      <div className="p-2 md:p-3">
        <div className="flex flex-col gap-3">
          <Skeleton className="w-109 h-9 rounded-lg" />
          <Skeleton className="h-5 w-180 rounded-lg" />
        </div>


        <div className="flex gap-3 mt-6">
          <div className="w-full">
            <Skeleton className="h-90 w-full rounded-lg" />
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <Skeleton className="w-full  rounded-lg" />
            <Skeleton className="w-full  rounded-lg" />
            <Skeleton className="w-full  rounded-lg" />
            <Skeleton className="w-full  rounded-lg" />
          </div>
        </div>
      </div>

    ) : (
      <Chart />
    )}
    <div className="p-2 md:p-3">
      {isLoading ? (
        <div className="w-full">
          <Skeleton className="h-90 w-full rounded-lg" />
        </div>
      ) :

        <RecentHistory />
      }
    </div>
  </div>;
};

export default Dashboard;
