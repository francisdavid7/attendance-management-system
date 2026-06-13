"use client";
import { toast } from "sonner";
import QRCode from "react-qr-code";
import { ScanCount } from "./counts";
import { presentStud } from "./list";
import SessionLoading from "./loading";
import { useAttendance } from "./session";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { tutorCourse, endASession } from "@/lib/actions/actions";
import { useAttendanceStore, useCourseStore } from "../dashbaord/zstand";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardAction, } from "@/components/ui/card";
import { QrCode, RefreshCw, Users, CircleCheck, CircleX, PlusIcon, GraduationCap, CircleAlertIcon, Loader2, } from "lucide-react";

interface Session {
    id: string;
    courseId: string;
    date: string;
    createdAt: string;
    qrCode: string;
    qrExpiresAt: string;
    isActive: boolean;
    sessionEndAt: string;
    course: {
        id: string;
        name: string;
        description: string;
        tutorId: string;
        createdAt: string;
    };
};

type QrPlay = {
    session: Session
}

export default function GenerateAttendanceQR() {
    const { trigger } = endASession();
    const { getList, } = presentStud();
    const [count, setCount] = useState();
    const [show, setShow] = useState(false);
    const [full, setFull] = useState(false);
    const { data, isLoading } = tutorCourse();
    const { setSessionData } = useCourseStore();
    const [timeLeft, setTimeLeft] = useState("");
    const [isEnded, setIsEnded] = useState(false);
    const [progress, setProgress] = useState(100);
    const [endSession, setEndSession] = useState("");
    const { setAttendanceData } = useAttendanceStore();
    const { attendance, isMutating } = useAttendance();
    const [session, setSession] = useState<QrPlay | null>(null)
    const startTime = new Date(session?.session?.createdAt!).getTime();
    const endTime = new Date(session?.session?.sessionEndAt!).getTime();

    const createSession = async () => {
        try {
            const id = data[0].id;
            const promise = attendance(id);
            toast.promise(promise, {
                loading: "Creating session....",
                success: (data) => data.Message,
                error: "Failed to create a session",
            });

            const session = await promise;
            setSession(session);
            setSessionData(session);
            setIsEnded(true);

        } catch (error) {
            console.log(error);
        }
    };

    const attendanceCount = async () => {
        if (!session) return
        const list = await getList(session?.session?.id);
        setAttendanceData(list)
        setCount(list.totalAttendance);
    };

    const endClass = async () => {
        if (!session) return;
        try {
            const sessionId = session.session.id;
            const sessionEndPromise = trigger({ sessionId });
            toast.promise(sessionEndPromise, {
                loading: "Ending session...",
                success: (data) => data.Message,
                error: "Failed to end session",
            });
            const result = await sessionEndPromise;
            setIsEnded(false)
            console.log(result)
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const remaining = endTime - now;
            const diff = endTime - now;
            const totalDuration = endTime - startTime;

            if (now >= endTime) {
                setProgress(0);
                endClass()
                clearInterval(interval);
                return;
            }

            setProgress((remaining / totalDuration) * 100);

            if (diff <= 0) {
                setTimeLeft("00:00:00");
                clearInterval(interval);
                return;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft(`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
        }, 1000);

        attendanceCount();

        return () => clearInterval(interval);
    }, [startTime, endTime]);



    if (isLoading) return <SessionLoading />

    return (
        <div>
            <div className="flex flex-col md:flex-row gap-4  p-4">
                <div className="space-y-4 w-full">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl  font-bold">
                                {data ? <><GraduationCap size={34} className="text-(--color-primary) mb-1" /> {data[0]?.name} </> : " "}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="mb-2 text-2xs text-muted-foreground">
                                    Create class session
                                </p>
                            </div>

                            <div className="rounded-lg border bg-green-50 p-3 text-center text-(--color-destructive)">
                                <div className="flex items-center justify-center gap-2 ">
                                    {isEnded ? <CircleCheck className="h-4 w-4 text-(--color-primary)" /> : <CircleAlertIcon className="h-4 w-4 " />}
                                    <span className="text-sm font-medium">
                                        {isEnded ? <div className="text-(--color-primary)"> session Active</div> : <div>
                                            <p>No session Active</p>
                                            {endSession}
                                        </div>
                                        }
                                    </span>
                                </div>
                                <p className="mt-2 text-xs text-muted-foreground">
                                    {!isEnded ? "" : `Started at ${new Date(session?.session?.createdAt!).toLocaleString("en-US", {
                                        hour: "numeric",
                                        minute: "2-digit"
                                    })} - To be stopped on ${new Date(session?.session?.sessionEndAt!).toLocaleString("en-US", {
                                        hour: "numeric",
                                        minute: "2-digit"
                                    })}`}
                                </p>
                            </div>

                            <CardFooter className="justify-center " >
                                <CardAction >
                                    <Button variant={"default"} onClick={createSession} disabled={isEnded} className="w-full ">
                                        <PlusIcon /> Start session
                                    </Button>
                                </CardAction>
                            </CardFooter>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex text-xl">
                                <div className="grow">
                                    Session Statistics
                                </div>
                                <div>
                                    <Button variant={"link"} className="-mt-15" disabled={!isEnded} onClick={attendanceCount}>
                                        <RefreshCw />
                                    </Button>
                                </div>
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
                                    {count}
                                </span>
                            </div>
                            <div>
                                <ScanCount count={count} />
                                <Progress value={count} />
                            </div>
                        </CardContent>
                    </Card>
                    {isEnded ?
                        <div>
                            <Button
                                variant="destructive"
                                className="w-full"
                                disabled={isMutating}
                                onClick={() => {

                                    setEndSession("Session end by tutor")
                                    endClass();
                                }}
                            >
                                <CircleX className="mr-2 h-4 w-4" />
                                End Session
                            </Button>

                            <div className="mt-4 w-full">
                                <Card className="w-[100%] border-0 bg-(--color-secondary)/15">
                                    <CardContent className="space-y-1 ">
                                        <div>
                                            <p className="text-[13px] font-semibold uppercase tracking-[0.25em] text-(--color-primary   )">

                                                Time Remaining
                                            </p>

                                            <h1 className="mt-1 text-3xl font-bold tracking-tight text-(--color-primary)">
                                                {timeLeft}
                                            </h1>
                                        </div>

                                        <div className="space-y-2 ">
                                            <div className="flex items-center gap-4">
                                                <Progress value={progress} className="h-2 flex-1 " />
                                                <span className="text-[15px] font-bold font-medium text-(--color-secondary)">
                                                    {Math.floor(progress)}%
                                                </span>
                                            </div>
                                        </div>

                                        <blockquote className="border-l-3 border-(--color-secondary) pl-2 text-[14px] font-bold leading-relaxed ">
                                            Regular attendance is the primary step toward academic excellence.
                                        </blockquote>
                                    </CardContent>
                                </Card>
                            </div>
                        </div> : " "}

                </div>

                <Card className="w-full">
                    <CardContent className="flex relative flex-col items-center justify-center ">
                        <div className="rounded-xl border-2 border-(--color-primary)/40 p-4 shadow-sm">
                            <div className="overflow-hidden w-[250px] h-[250px] ">
                                {show ?
                                    <div>
                                        {session && (
                                            <QRCode
                                                value={JSON.stringify(session)}
                                                className={`${full ? "absolute w-[100%] h-[100%] left-0 right-0 to-0 bottom-0" : "w-full"}`}
                                                onClick={() => setFull((prev) => !prev)}
                                            />)}

                                        {!session && (
                                            <div className="text-center place-content-center py-23 text-(--color-destructive) text-[17px] font-bold">
                                                Please Create a class session to Generate QR code for your student.
                                            </div>
                                        )}
                                    </div>
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


        </div>
    );
}
