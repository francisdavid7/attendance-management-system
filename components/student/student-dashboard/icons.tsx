import { BookOpen, CheckCircle2, CircleX, History } from "lucide-react";
const btn = (status: string) => {
    if (status === "PRESENT") {
        return (
            <button className="bg-(--color-primary)/20 backdrop-blur-2xl text-(--color-primary) p-3  rounded-[10px]">
                <CheckCircle2 size={30} />
            </button>
        )
    } else if (status === "ABSENT") {
        return (
            <button className="bg-(--color-destructive)/20 backdrop-blur-2xl text-(--color-destructive) p-3  rounded-[10px]">
                <CircleX size={30} />
            </button>
        )
    } else if (status === "LATE") {
        return (

            <button className="bg-[#de9a4c62] backdrop-blur-2xl text-[#ae8b23] p-3 rounded-[10px]">
                <History size={30} />
            </button>
        )
    } else if (status === "TOTAL CLASSES") {
        return (

            <button className="border border-(--color-border) backdrop-blur-2xl p-3 rounded-[10px]">
                <BookOpen size={30} />
            </button>
        )
    }

}

export default btn