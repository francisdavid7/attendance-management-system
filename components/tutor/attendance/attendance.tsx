"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CircleAlert, CircleCheck, Clock, Clock3, Database, TrendingUp } from "lucide-react";
import { tutorAttendanceHistory } from "@/lib/actions/actions";
import { Button } from "@/components/ui/button";


export function AttendanceTableHistory() {
    const { data, isLoading } = tutorAttendanceHistory();

    const rec = data?.attendanceCount;
    const float = Math.floor(rec).toFixed(1)
    console.log(data, float);
    const stats = [
        {
            title: "TOTAL RECORDS SELECTED",
            value: rec,
            icon: Database,
            iconColor: "text-emerald-700",
            bgColor: "bg-emerald-50",
        },
        {
            title: "AVG. ATTENDANCE RATE",
            value: `${float}%`,
            icon: TrendingUp,
            iconColor: "text-emerald-700",
            bgColor: "bg-emerald-50",
        },
        {
            title: "LATE ARRIVALS DETECTED",
            value: "0",
            icon: Clock,
            iconColor: "text-rose-700",
            bgColor: "bg-rose-50",
        },
    ];

    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row flex-col-reverse ">
                <div className="grow text-start">

                    <h1 className="text-3xl font-bold mb-2">
                        Attendance Reports and Export
                    </h1>
                    <p className="opacity-70 mb-6">
                        Configure and generate detailed workforce attendance data.
                    </p>
                </div>

                <div className="mb-3 md:mb-0">
                    <Button>
                        Export to Admin
                    </Button>
                </div>
            </div>

            <div className="w-full bg-slate-50/50 mb-6 flex items-center justify-center">
                <div className="grid gap-4 md:grid-cols-3 w-full m">
                    {stats.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <Card key={index} className="border-none shadow-sm rounded-xl bg-white">
                                <CardContent className="p-6 flex items-center justify-between">
                                    <div className="space-y-1.5">
                                        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                            {item.title}
                                        </p>
                                        <p className="text-3xl font-bold text-slate-800 tracking-tight">
                                            {item.value}
                                        </p>
                                    </div>
                                    <div className={`p-3.5 rounded-full ${item.bgColor}`}>
                                        <Icon className={`w-5 h-5 ${item.iconColor}`} strokeWidth={2.5} />
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
            <Card className="rounded-2xl shadow-sm overflow-hidden">
                <Table>
                    <TableHeader >
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Course</TableHead>
                            <TableHead>Check-in</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.histories?.map((item: any) =>

                            item.attendances.map((data: any) => (

                                <TableRow key={crypto.randomUUID()}>
                                    <TableCell>
                                        {new Date(item.createdAt).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            weekday: "short",
                                            day: "numeric",
                                            hour: "numeric",
                                            minute: "2-digit"
                                        })}</TableCell>

                                    <TableCell className="font-medium ">
                                        {item.course.name}
                                    </TableCell>

                                    <TableCell>
                                        {new Date(data.checkInTime).toLocaleString("en-US", {
                                            hour: "numeric",
                                            minute: "2-digit"
                                        })}
                                    </TableCell>

                                    <TableCell className="font-medium ">
                                        {data.student.fullName}
                                    </TableCell>

                                    <TableCell>
                                        <span
                                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium`}
                                        >
                                            {data?.status === "PRESENT" && (
                                                <CircleCheck className="w-3 h-3" />
                                            )}

                                            {data?.status === "LATE" && (
                                                <Clock3 className="w-3 h-3" />
                                            )}

                                            {data?.status === "ABSENT" && (
                                                <CircleAlert className="w-3 h-3" />
                                            )}

                                            {data?.status === "PARTIAL" && (
                                                <Clock3 className="w-3 h-3" />
                                            )}
                                            {data?.status}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>


                {/* <div className="flex items-center justify-between px-6 py-4 text-sm text-muted-foreground border-t">
                    <p>Showing 1 - 5 of 42 entries</p>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                        >
                            {"<"}
                        </Button>

                        <Button
                            size="sm"
                            variant={"default"}
                        >
                            1
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                        >
                            2
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                        >
                            3
                        </Button>

                        <span>...</span>

                        <Button
                            variant="ghost"
                            size="sm"
                        >
                            9
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                        >
                            {">"}
                        </Button>
                    </div>
                </div> */}
            </Card>
        </div>
    )
}