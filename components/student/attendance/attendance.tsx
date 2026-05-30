import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent, } from "@/components/ui/card"
import { QrCode } from "lucide-react"
function Attend() {

    return (
        <div>
            <Card className="justify-self-center text-center w-[50%] mt-7">
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
                            <Button variant={"default"}>
                                Open Scanner
                            </Button>

                            <Button variant={"outline"}>
                                Manual Code
                            </Button>


                        </CardAction>
                    </CardFooter>
                </div>
            </Card>
        </div>
    )
}

export default Attend;