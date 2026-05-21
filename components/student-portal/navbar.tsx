
import {
    Sheet,
    SheetHeader,
    SheetDescription,
} from "@/components/ui/sheet"

import { Button } from "../ui/button"
import { BellDotIcon, CircleQuestionMark } from "lucide-react"


const navbar = () => {
    return (
        <main className="z-1000 -mt-9">
            <Sheet >
                <SheetHeader >
                    <div className="flex gap-2">
                        <div className="flex ">
                            <Button variant="ghost">
                                <BellDotIcon />
                            </Button>

                            <Button variant="ghost">
                                <CircleQuestionMark />
                            </Button>

                            <div className="border border-(var(--color-border))">

                            </div>
                        </div>


                        <div className="flex gap-1 text-end text-[0.9rem]">
                            <div>
                                Alex Johnson
                                <SheetDescription>
                                    <span className="text-[0.9rem]">
                                        Computer science . <span>Year 4</span>
                                    </span>
                                </SheetDescription>
                            </div>

                            <div>
                                <img src="/hero_image.png" className=" h-10 w-10 object-cover rounded-full" alt="" />
                            </div>
                        </div>
                    </div>
                </SheetHeader>
            </Sheet>
        </main >
    )
}

export default navbar;