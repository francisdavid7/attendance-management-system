"use client";
import { useState } from "react";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getAllCourses } from "@/lib/actions/actions";
import { QrCode, RefreshCw, Users, CircleCheck, CircleX, PlusIcon, CalendarDays, GraduationCap, RotateCcwIcon, Loader2Icon, CircleAlertIcon, Loader2, } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardAction, } from "@/components/ui/card";
import { useAttendance } from "./session";
import { toast } from "sonner";
export default function GenerateAttendanceQR() {
    const { courses, isLoading } = getAllCourses();
    const [show, setShow] = useState(false)
    const [data, setData] = useState()
    const [id, setId] = useState("");
    const [full, setFull] = useState(false);
    const { attendance, isMutating } = useAttendance();

    const attendances = async () => {
        try {
            const promise = attendance(id);

            toast.promise(promise, {
                loading: "Creating session....",
                success: (data) => data.Message,
                error: "Failed to create a session",
            });

            const session = await promise;
            setData(session);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="flex flex-col md:flex-row gap-4  p-4">
            <div className="space-y-4 w-full">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Create class session</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="mb-2 text-2xs text-muted-foreground">
                                Course Selection
                            </p>
                            <Select onValueChange={setId}>
                                <SelectTrigger>
                                    <div className="flex items-center gap-2 font-bold text-(--color-primary) ">
                                        <GraduationCap />
                                        <SelectValue />
                                    </div>
                                </SelectTrigger>
                                <SelectContent >
                                    {courses?.map((data: any) => (
                                        <SelectItem key={data.id} value={data.id}>
                                            {data?.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="rounded-lg border bg-green-50 p-3 text-center text-(--color-destructive)">
                            <div className="flex items-center justify-center gap-2 ">
                                {data ? <CircleCheck className="h-4 w-4 text-(--color-primary)" /> : <CircleAlertIcon className="h-4 w-4 " />}
                                <span className="text-sm font-medium">
                                    {data ? <div className="text-(--color-primary)"> session Active</div> : "No session Active"}
                                </span>
                            </div>
                            <p className="mt-2 text-xs text-muted-foreground">
                                {!data ? "" : "Started at 10:00 AM."}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {!data ? "" : "Location: Lecture Hall B."}
                            </p>
                        </div>
                        <CardFooter className="justify-center " >
                            <CardAction >
                                <Button variant={"default"} onClick={attendances} disabled={isMutating} className="w-full ">
                                    {!isMutating ? <><PlusIcon /> Start session</> : <><Loader2 className="animate-spin" />Creating session...</>}
                                </Button>
                            </CardAction>
                        </CardFooter>
                    </CardContent>

                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">
                            Session Statistics
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">
                                    Total Scans
                                </span>
                            </div>
                            <span className="text-xl font-bold text-(--color-primary)">
                                {data ? "24" : "NaN"}
                            </span>
                        </div>
                        <div>
                            <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                                <span>Expected Attendance</span>
                                <span> {!data ? "NaN/NaN" : "24/30"}</span>
                            </div>
                            <Progress value={80} />
                        </div>
                    </CardContent>
                </Card>
                <Button
                    variant="destructive"
                    className="w-full"
                    disabled={isMutating}
                >
                    <CircleX className="mr-2 h-4 w-4" />
                    End Session
                </Button>
            </div>

            <Card className="w-full">
                <CardContent className="flex relative flex-col items-center justify-center ">
                    <div className="rounded-xl border-2 border-(--color-primary)/40 p-4 shadow-sm">
                        <div className="overflow-hidden w-[250px] h-[250px] ">
                            {show ?
                                <div>{data && (
                                    <QRCode
                                        value={JSON.stringify(data)}
                                        className={`${full ? "absolute w-[100%] h-[100%] left-0 right-0 to-0 bottom-0" : "w-full"}`}
                                        onClick={() => setFull((prev) => !prev)}
                                    />)} {!data && (<div className="text-center place-content-center py-23 text-(--color-destructive) text-[17px] font-bold">
                                        Please Create a class session to Generate QR code for your student.
                                    </div>)} </div>
                                :
                                <img
                                    src="/hero_image.png"
                                    alt="QR Code"
                                    className="h-full object-cover w-full rounded-xl"
                                />
                            }
                        </div>
                    </div>
                    <div className="mt-4 rounded-full bg-muted px-4 py-2 text-xs font-medium">
                        <RefreshCw className="mr-1 inline h-3 w-3" />
                        QR code expires in 01:45
                    </div>

                    <h2 className="mt-6 text-3xl font-bold">
                        Ready for Scanning
                    </h2>

                    <p className="mt-2 max-w-md text-center text-muted-foreground">
                        Instruct students to open the AttendX students portal and
                        scan this code to mark their attendance. The
                        code refreshes every 2 minutes for security.
                    </p>

                    <div className="mt-8 flex gap-4">
                        <Button variant={"default"} onClick={() => setShow((prev) => !prev)}>
                            <QrCode className="mr-2 h-4 w-4" />
                            Generate New QR
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}