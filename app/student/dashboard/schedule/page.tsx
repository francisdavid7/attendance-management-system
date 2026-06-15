"use client"
import SchedulePage from "@/components/student/schedule/schedule";
import Attend from "@/components/student/schedule/attendance";
import { activeSession } from "@/lib/actions/actions";
import { Card } from "@/components/ui/card";
import { ShieldAlertIcon } from "lucide-react";

const Schedule = () => {
  const { data, isLoading } = activeSession();

  console.log(data)

  return (
    <div>
      {data?.hasActiveSession ? <>

        <Attend />
        <SchedulePage />
      </> : <div className="w-[70%] mt-40 justify-self-center text-(--color-destructive)">
        <Card className=" flex flex-col text-center">
          <div>
            <ShieldAlertIcon size={120} className="text-(--color-destructive) justify-self-center" />
          </div>
          <div className="text-(--color-destructive) mb-10 text-xl font-bold">
            No Ongoing class at the moment
          </div>
        </Card>
      </div>}
    </div>
  );
};

export default Schedule;
