"use client"

import {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table"

import { Card } from "@/components/ui/card"

import { Button } from "../ui/button"

const attendanceData = [
    {
        id: 1,
        date: "Oct 24, 2023",
        courseCode: "CS",
        course: "Data Structures",
        status: "Present",
        checkInTime: "09:02 AM",
    },
    {
        id: 2,
        date: "Oct 23, 2023",
        courseCode: "MA",
        course: "Discrete Math",
        status: "Late",
        checkInTime: "10:15 AM",
    },
    {
        id: 3,
        date: "Oct 22, 2023",
        courseCode: "AI",
        course: "Intro to AI",
        status: "Absent",
        checkInTime: "--",
    },
    {
        id: 4,
        date: "Oct 21, 2023",
        courseCode: "SD",
        course: "Software Design",
        status: "Present",
        checkInTime: "08:55 AM",
    },
]

export default function RecentHistory() {

    const btn = (status: string) => {
        if (status === "Present") {
            return (
                <button className="bg-[hsl(120,54%,71%)] backdrop-blur-2xl text-(--color-primary) p-1 w-16 rounded-[10px]">
                    {status}
                </button>
            )
        } else if (status === "Absent") {
            return (
                <button className="bg-[#dda0a078] backdrop-blur-2xl text-[#ae0d0d] p-1 w-16 rounded-[10px]">
                    {status}
                </button>
            )
        } else if (status === "Late") {
            return (

                <button className="bg-[#de9a4c62] backdrop-blur-2xl text-[#ae8b23] p-1 w-16 rounded-[10px]">
                    {status}
                </button>
            )
        }
    }
    return (
        <div className=" mt-13">

            <Card >
                <div className="flex  ">
                    <div className="grow place-content-center font-bold text-2xl ">
                        Recent Activities
                    </div>

                    <Button variant={"ghost"} className="text-(--color-primary)">
                        View All
                    </Button>
                </div>
                <Table>

                    <TableHeader className="bg-muted/20" >
                        <TableRow  >
                            <TableHead className="font-bold">DATE</TableHead>
                            <TableHead className="font-bold">COURSE</TableHead>
                            <TableHead className="font-bold">STATUS</TableHead>
                            <TableHead className="font-bold">CHECK-IN TIME</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="font-bold text-(--color-muted-foreground)">
                        {attendanceData.map((data) => {
                            return (
                                <TableRow key={data.id}>
                                    <TableCell className="py-5 "> {data.date}</TableCell>
                                    <TableCell>{data.course}</TableCell>
                                    <TableCell>
                                        {btn(data.status)}
                                    </TableCell>
                                    <TableCell>{data.checkInTime}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Card>

        </div>
    )
}