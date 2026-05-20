import { fromJSONSchema } from "zod"
import {
    Sheet,
    SheetTrigger,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet"

import { Button } from "../ui/button"
import { BellDotIcon, CircleQuestionMark } from "lucide-react"

const navbar = () => {
    return (
        <main className="">
            <header className="">
                <div className="">
                    <Sheet >
                        <SheetHeader>
                            <div className="flex gap-5">
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


                                <div className="flex gap-2 text-end">
                                    <div>
                                        Alex Johnson
                                        <SheetDescription>
                                            Computer science . <span>Year 4</span>
                                        </SheetDescription>
                                    </div>

                                    <div>
                                        <img src="/hero_image.png" className=" h-12 w-12 object-cover rounded-full" alt="" />
                                    </div>
                                </div>
                            </div>
                        </SheetHeader>
                    </Sheet>
                </div>
            </header>
        </main>
    )
}

export default navbar;