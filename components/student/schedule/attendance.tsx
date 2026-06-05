"use client"
import { useState } from "react"
import QRScanner from "./scanner"
import { QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent, } from "@/components/ui/card"

function Attend() {
    const [isScanning, setIsScanning] = useState(false);
    return (
        <div>
            <Dialog >
                <Card className="justify-self-center text-center w-[90%] md:w-[50%] mt-7">
                    <CardHeader>
                        <CardTitle className="justify-self-center text-center">
                            <div className="p-4 rounded-xl bg-(--color-primary) text-white justify-center" >
                                <QrCode size={50} />
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardDescription>
                        <CardContent>
                            <h1 className="font-bold text-2xl text-black">Check-in Now</h1>
                            <div>
                                Scan the classroom QR code to record your <br /> attendance for the current session.
                            </div>
                        </CardContent>
                    </CardDescription>
                    <div>
                        <CardFooter className="justify-self-center">
                            <CardAction className="flex gap-4">
                                <DialogTrigger asChild>
                                    <Button variant={"default"} >
                                        Open Scanner
                                    </Button>
                                </DialogTrigger>
                                <Button variant={"outline"}>
                                    Manual Code
                                </Button>
                            </CardAction>
                        </CardFooter>
                    </div>
                </Card>
                <QRScanner />
            </Dialog>
        </div>
    )
}

export default Attend;