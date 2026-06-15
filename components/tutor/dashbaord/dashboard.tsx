"use client"
import { useCourseStore } from "./zstand";
import { useAttendanceStore } from "./zstand";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getCurrentUser } from "@/lib/actions/actions";
import DashboardLoading from "@/components/tutor/dashbaord/laoding"
import { GraduationCap, Radio, Users, CircleAlertIcon, WifiOff, ShieldClose } from "lucide-react";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { tutorStudent } from "@/lib/actions/actions";
import useSWR from "swr";

export default function LecturerDashboard() {
    const { user, isLoading } = getCurrentUser();

    const { data } = tutorStudent();

    const attendanceData = useAttendanceStore((state) => state.attendanceData);

    const sessionData = useCourseStore((state) => state.sessionData);

    const student = data ? data[0]?._count?.students : data?._count?.students;


    const fetcher = async (url: string) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Failed to fetch");
        }
        return res.json();
    };

    const { data: sessions, mutate } = useSWR("/api/attendance/getTutorSession", fetcher);

    const session = sessions?.tutorActiveSession;

    if (isLoading) return <DashboardLoading />

    return (
        <div className="space-y-6 p-6">
            <div>
                <h1 className="text-4xl font-bold">
                    Good morning, Prof. {user?.fullName.split(" ")[0]}
                </h1>

                <p className="text-muted-foreground">
                    Here's the real-time status of your current lecture session.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <Card>
                    <CardContent className="flex items-start justify-between pt-4">
                        <div>


                            <p className="text-xs uppercase text-muted-foreground">
                                Active Class
                            </p>

                            <h3 className="mt-2 text-xl font-bold">
                                {session ? <>{session?.course?.name}</> :

                                    <div className="flex items-center justify-center gap-2 text-(--color-destructive)">

                                        <CircleAlertIcon className="h-4 w-4" />
                                        <span className="text-sm font-medium">
                                            <div className=" text-sm"> No Active Session</div>

                                        </span>
                                    </div>}
                            </h3>

                            <p className="mt-1 text-sm text-muted-foreground">
                                {session ? <>

                                    session started at <span className="font-bold"> {new Date(
                                        session?.createdAt
                                    ).toLocaleString("en-US", {
                                        hour: "numeric",
                                        minute: "2-digit",
                                    })}</span>

                                </> : " "}
                            </p>
                        </div>

                        <GraduationCap className="h-5 w-5 text-(--color-primary)" />
                    </CardContent>
                </Card>

                <Card>
                    <CardDescription>
                        <CardContent className="flex items-start justify-between pt-5">
                            <div>
                                <p className="text-xs uppercase text-muted-foreground">
                                    System Status
                                </p>

                                <div className="mt-2 flex items-center gap-2">

                                    {session ?
                                        <>
                                            <div className="h-2 w-2 rounded-full bg-(--color-primary)" />
                                            <span className="font-semibold">Active</span>
                                        </> :
                                        <>
                                            <div className="flex items-center justify-center gap-2 text-(--color-destructive)">

                                                <ShieldClose className="h-5 w-5" />
                                                <span className="text-sm font-medium">
                                                    <div className=" text-sm"> Not engaged</div>

                                                </span>
                                            </div>
                                        </>
                                    }

                                </div>

                                <p className="mt-2 text-sm ">
                                    {session ? "QR Scanner engaged" : <></>}
                                </p>
                            </div>

                            <Radio className="h-5 w-5 text-blue-500" />
                        </CardContent>
                    </CardDescription>
                </Card>

                <Card>
                    <CardContent className="">
                        <div className="flex justify-between">

                            <Users className="h-5 w-5 text-(--color-primary)" />
                            <span className="text-sm font-medium text-(--color-primary)">
                                {attendanceData?.totalAttendance}%
                            </span>
                        </div>

                        <h2 className="mt-3 text-3xl font-bold">
                            {session ? <>
                                {attendanceData?.totalAttendance}/{student}
                            </> : ""}
                        </h2>

                        <div className="mt-3 h-2 rounded-full bg-muted">
                            <Progress value={attendanceData?.totalAttendance} />
                        </div>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Students present
                        </p>
                    </CardContent>
                </Card>

                {/* <Card>
                    <CardContent className="flex items-start justify-between pt-4">
                        <div>
                            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs text-orange-600">
                                Action Required
                            </span>

                            <h3 className="mt-5 text-2xl font-bold">
                               session 3 Students
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                Requiring review
                            </p>
                        </div>

                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                    </CardContent>
                </Card> */}
            </div>

            <div className="">

                <Card>
                    <CardContent className="p-0">
                        <div className="flex items-center justify-between border-b p-4">
                            <h2 className="font-semibold">
                                Live Attendance Feed
                            </h2>

                            <Button variant="link">View All</Button>
                        </div>

                        <table className="w-full">
                            <thead>
                                <tr className="border-b text-left text-xs text-muted-foreground">
                                    <th className="p-4">STUDENT NAME</th>
                                    <th>ID NUMBER</th>
                                    <th>TIME</th>
                                    <th>STATUS</th>
                                </tr>
                            </thead>

                            <tbody>
                                {attendanceData?.studentsAttended?.map((student: any) => (
                                    <tr key={student?.id} className="border-b">
                                        <td className="p-4 font-medium">
                                            {student?.student?.fullName}
                                        </td>

                                        <td>{student?.student?.id}</td>

                                        <td>{new Date(
                                            student.checkInTime
                                        ).toLocaleString("en-US", {
                                            weekday: "short",
                                            day: "numeric",
                                            hour: "numeric",
                                            minute: "2-digit",
                                        })}</td>

                                        <td>
                                            <span
                                                className={`rounded-[7px] px-3 py-1 text-xs
                        ${student?.status === "PRESENT"
                                                        ? "bg-(--color-primary)/20 text-(--color-primary)"
                                                        : "bg-red-100 text-(--color-destructive)"
                                                    }`}
                                            >
                                                {student.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}