import { BookOpen, CheckCircle2, CircleX, History } from "lucide-react";
const btn = (status: string) => {
    if (status === "PRESENT") {
        return (
            <button className="bg-(--color-primary)/20 backdrop-blur-2xl w-fit text-(--color-primary) p-2  rounded-[10px]">
                <CheckCircle2 size={30} />
            </button>
        )
    } else if (status === "ABSENT") {
        return (
            <button className="bg-(--color-destructive)/20 backdrop-blur-2xl w-fit text-(--color-destructive) p-1  rounded-[10px]">
                <CircleX size={30} />
            </button>
        )
    } else if (status === "TOTAL CLASSES") {
        return (

            <button className="border border-(--color-border) backdrop-blur-2xl p-3 w-fit rounded-[10px]">
                <BookOpen size={30} />
            </button>
        )
    }

}

export default btn