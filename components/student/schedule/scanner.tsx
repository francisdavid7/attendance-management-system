"use client";
import { toast } from "sonner";
import { useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Card, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { markAttendance } from "@/lib/actions/actions";
import { DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CircleAlert, CircleCheckBigIcon, LucideSquareCenterlineDashedVertical, MoveRight, ScanLine, StopCircle } from "lucide-react";

interface Session {
    id: string;
    courseId: string;
    date: string;
    createdAt: string;
    qrCode: string;
    qrExpiresAt: string;
    isActive: boolean;
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

export default function QRScanner() {
    const { trigger, isMutating } = markAttendance();
    const [isScanning, setIsScanning] = useState(false);
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const [qRCode, setQRCode] = useState<QrPlay | null>(null)
    const [disPlay, setDisPlay] = useState<Boolean | null>(null)

    const startScanning = async () => {
        try {
            if (!scannerRef.current) {
                scannerRef.current = new Html5Qrcode("reader");
            }
            await scannerRef.current.start({ facingMode: "environment" }, { fps: 10, qrbox: 250 }, (qrCode) => {
                const data = JSON.parse(qrCode);
                setQRCode(data);
                console.log("QR-CODE", data.session)
                stopScanning();
            }, () => { })
            setIsScanning(true)
        }
        catch (error) {
            console.log(error, "failed to start QR scanner")
        }
    }

    const stopScanning = async () => {
        try {
            if (scannerRef.current?.isScanning) {
                await scannerRef.current.stop();
            }
            setIsScanning(false);

            if (!qRCode) {
                setDisPlay(true)
            } else if (disPlay) {
                setDisPlay(false)
            }

        } catch (error) {
            console.log("failed to stop scanner ")
        }
    }

    const toggleScanner = () => {

        if (!isScanning) {
            startScanning()
        } else {
            stopScanning()
        }
    }

    const submitAttendance = async () => {
        if (!qRCode) return;

        const mark = trigger({
            id: qRCode?.session?.id,
            qrCode: qRCode?.session?.qrCode,
        });

        toast.promise(mark, {
            loading: "Submitting attendance...",
            success: (data) => data.Message,
            error: "Failed to submit attendance",
        });

        const submit = await mark;

        console.log(submit);
    };

    return (
        <div>
            <dialog>
                <DialogContent className="sm:max-w-md">
                    <Card className="px-6">
                        <DialogHeader>
                            <DialogTitle className="font-bold text-xl">
                                QR Code Scanner
                            </DialogTitle>

                            <div className="text-center mt-3 justify-center justify-self-center">
                                {!isScanning ?
                                    (<>
                                        {!qRCode &&
                                            (disPlay ? <span className="text-(--color-destructive) font-semibold">
                                                <span> Scan the QR code to mark session attendance  </span>
                                                <CircleAlert size={100} className="text-center mt-3 mb-2 justify-center justify-self-center" />
                                                No QR code scanned</span> : "Scan the QR code to mark session attendance"
                                            )} {
                                            qRCode && (
                                                <span className="text-(--color-primary) font-semibold">
                                                    <CircleCheckBigIcon size={100} className="text-center mt-3 mb-2 justify-center justify-self-center" />
                                                    <span className=""> QR Code Scanned Ready to Submit</span>
                                                </span>
                                            )}</>
                                    ) :
                                    <span> Scan the QR code to mark session attendance  </span>
                                }
                                <div id="reader" className="mt-3">
                                    <span>
                                        {!disPlay ? <ScanLine size={100} className="text-center mt-3 justify-center justify-self-center" /> : ""}
                                    </span>
                                </div>
                            </div>
                        </DialogHeader>

                        <div className="space-y-4 pt-4">
                            <div className="text-center">
                                {!isScanning ? (<div className="grid md:flex gap-1 ">
                                    <div >
                                        <Button variant="default" className=" rounded-xl p-5 asChild " onClick={toggleScanner}>
                                            {isScanning ? (<><StopCircle /> Stop Scanning QRcode </>) :
                                                (<> <LucideSquareCenterlineDashedVertical /> Start Scanning QRcode </>)}
                                        </Button>
                                    </div>
                                    <div >
                                        <DialogClose asChild>
                                            <Button variant="default" className=" rounded-xl  px-5 asChild  " disabled={!qRCode} onClick={submitAttendance}>
                                                <MoveRight /> Submit Attendance
                                            </Button>
                                        </DialogClose>
                                    </div>
                                </div>) : (
                                    <div className="grid md:flex gap-1 ">
                                        <div >
                                            <Button variant="default" className=" rounded-xl px-5 asChild" onClick={toggleScanner}>
                                                {isScanning ? (<><StopCircle /> Stop Scanning QRcode </>) : (<> <LucideSquareCenterlineDashedVertical /> Start Scanning QRcode </>)}
                                            </Button>
                                        </div>
                                        <div >
                                            <DialogClose asChild>
                                                <Button variant="default" className=" rounded-xl px-5 asChild" disabled={!qRCode} onClick={submitAttendance}>
                                                    <MoveRight /> Submit Attendance
                                                </Button>
                                            </DialogClose>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                </DialogContent>
            </dialog>
        </div>
    );
}