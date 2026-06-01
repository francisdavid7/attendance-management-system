"use client";
import { Html5Qrcode } from "html5-qrcode";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScanLine } from "lucide-react";


export default function QRScanner() {
    const [isScanning, setIsScanning] = useState(false);
    const scannerRef = useRef<Html5Qrcode | null>(null);

    const startScanning = async () => {
        try {
            if (!scannerRef.current) {
                scannerRef.current = new Html5Qrcode("reader");
            }

            await scannerRef.current.start({ facingMode: "environment" }, { fps: 10, qrbox: 250 }, (qrCode) => {
                console.log("QR-Code", qrCode);
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


    return (
        <div>
            <dialog>
                <DialogContent className="sm:max-w-md">
                    <Card className="px-6">
                        <DialogHeader>
                            <DialogTitle className="font-bold text-xl">
                                QR Code Scanner
                            </DialogTitle>
                            <DialogDescription className="text-center mt-3 justify-center justify-self-center">
                                <span >Scan the QR code to mark session attendance  </span>
                                <div id="reader" className="mt-3">
                                    <ScanLine size={100} className="text-center mt-3 justify-center justify-self-center" />
                                </div>

                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                            <div className="text-center">
                                <Button variant="default" className=" rounded-xl px-5 asChild" onClick={toggleScanner}>
                                    {isScanning ? "Stop Scanning QRcode" : "Start Scanning QRcode"}
                                </Button>
                            </div>
                        </div>
                    </Card>
                </DialogContent>
            </dialog>
        </div>
    );
}