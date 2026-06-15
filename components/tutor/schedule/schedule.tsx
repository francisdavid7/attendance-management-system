"use client";
import useSWR from "swr";
import { toast } from "sonner";
import QRCode from "react-qr-code";
import { presentStud } from "./list";
import { ScanCount } from "./counts";
import SessionLoading from "./loading";
import { endSessions } from "./session";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { startSession } from "@/lib/actions/actions";
import { tutorCourse, endASession } from "@/lib/actions/actions";
import { useAttendanceStore, useCourseStore } from "../dashbaord/zstand";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardAction, } from "@/components/ui/card";
import { QrCode, RefreshCw, Users, CircleCheck, CircleX, PlusIcon, GraduationCap, CircleAlertIcon, Loader2, } from "lucide-react";

export default function GenerateAttendanceQR() {
    const hasNotified = useRef(false);
    const { getList, } = presentStud();
    const [count, setCount] = useState();
    const { endSEssion } = endSessions();
    const [show, setShow] = useState(false);
    const [full, setFull] = useState(false);
    const { data, isLoading } = tutorCourse();
    const { setSessionData } = useCourseStore();
    const [timeLeft, setTimeLeft] = useState("");
    const [progress, setProgress] = useState(100);
    const [isEnded, setIsEnded] = useState(false);
    const { trigger, isMutating } = startSession();
    const [qrToggle, setQrToggle] = useState(false);
    const [endSession, setEndSession] = useState("");
    const { setAttendanceData } = useAttendanceStore();

    const fetcher = async (url: string) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Failed to fetch");
        }
        return res.json();
    };

    const { data: sessions, mutate } = useSWR("/api/attendance/getTutorSession", fetcher);

    const session = sessions?.tutorActiveSession;

    const startTime = new Date(session?.createdAt!).getTime();

    const endTime = new Date(session?.sessionEndAt!).getTime();

    const createSession = async () => {
        try {
            const courseId = data[0].id;
            const promise = trigger({ courseId });
            toast.promise(promise, {
                loading: "Creating session...",
                success: (data) => data.Message,
                error: "Failed to create a session",
            });
            await promise;
            setIsEnded(true);
            setQrToggle(true);
            await mutate();

        } catch (error) {
            console.log(error);
        }
    };

    console.log(session);

    const attendanceCount = async () => {
        if (!session) return
        const list = await getList(session?.id);
        setAttendanceData(list)
        setCount(list.totalAttendance);
    };

    const endClass = async () => {
        if (!session) return;
        try {
            const sessionId = session?.id;
            const end = endSEssion(sessionId);
            toast.promise(end, {
                loading: "Ending session...",
                success: (data) => data.Message,
                error: "Failed to end session",
            });
            const result = await end;
            setIsEnded(false);
            setQrToggle(false);

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

            if (diff <= 120_000 && diff > 0 && !hasNotified.current) {
                hasNotified.current = true;
                setQrToggle(false)
                hasNotified.current = false;
            }

            if (diff <= 60_000 && diff > 0 && !hasNotified.current) {
                hasNotified.current = true;
                setShow(true);
                setFull(true);
            }

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
                                <><GraduationCap size={34} className="text-(--color-primary) mb-1" /> {data[0]?.name} </>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="mb-2 text-2xs text-muted-foreground">
                                    Create class session
                                </p>
                            </div>

                            <div className="rounded-lg border bg-primary/10 p-3 text-center text-(--color-destructive)">
                                {session ? <>
                                    <div className="flex items-center justify-center gap-2 ">

                                        <CircleCheck className="h-4 w-4 text-(--color-primary)" />
                                        <span className="text-sm font-medium">
                                            <div className="text-(--color-primary)"> session Active</div>

                                        </span>
                                    </div>
                                    <p className="mt-2 text-xs text-muted-foreground">
                                        Started at {new Date(session?.createdAt).toLocaleString("en-US", {
                                            hour: "numeric",
                                            minute: "2-digit"
                                        })} - To be stopped on {new Date(session?.sessionEndAt).toLocaleString("en-US", {
                                            hour: "numeric",
                                            minute: "2-digit"
                                        })}
                                    </p>
                                </> : <div className="flex items-center justify-center gap-2 ">

                                    <CircleAlertIcon className="h-4 w-4" />
                                    <span className="text-sm font-medium">
                                        <div className=" text-sm"> No Active Session</div>

                                    </span>
                                </div>}

                            </div>

                            <CardFooter className="justify-center " >
                                <CardAction >
                                    <Button variant={"default"} disabled={isEnded} onClick={createSession} className="w-full ">
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
                    {session ?
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
                    <CardContent className="flex relative  flex-col items-center justify-center ">
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
                            QR code expires 1 minute after it's displayed
                        </div>

                        <h2 className="mt-6 text-3xl font-bold">
                            Ready for Scanning
                        </h2>

                        <p className="mt-2 max-w-md text-center text-muted-foreground">
                            Instruct students to open the AttendX students portal and
                            scan this code to mark their attendance.
                        </p>

                        <div className={`mt-8 flex gap-4 ${full ? "hidden" : "inline"}`}>
                            <Button variant={"default"} disabled={qrToggle} onClick={() => setShow((prev) => !prev)}>
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
