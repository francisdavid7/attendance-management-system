"use client"
import { tutorStudent } from "@/lib/actions/actions";

export function ScanCount({ count }: { count: any }) {
    const { data, isLoading } = tutorStudent();
    const students = data ? data[0]?._count?.students : data?._count?.students
    // console.log(students)
    return (

        <div className="mb-2 flex justify-between text-xs text-muted-foreground">
            <span>Expected Attendance</span>
            <span>  {count}/{students}</span>
        </div>

    )
}
