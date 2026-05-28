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

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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
        checkInTime: "-----",
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
                <Badge className="bg-(--color-secondary)/20 text-[14px] font-semibold text-(--color-primary) rounded-[8px]">
                    {status}
                </Badge>
            )
        } else if (status === "Absent") {
            return (
                <Badge className="bg-(--color-destructive)/20 text-[14px] font-semibold backdrop-blur-2xl text-(--color-destructive) rounded-[8px]">
                    {status}
                </Badge>
            )
        } else if (status === "Late") {
            return (

                <Badge className="bg-[#de9a4c62] text-[14px] font-semibold backdrop-blur-2xl text-[#ae8b23] rounded-[8px]">
                    {status}
                </Badge>
            )
        }
    }
    return (
        <div className=" p-3 md:p-3 ">

            <Card >
                <div className="flex  ">
                    <div className="grow place-content-center font-bold text-2xl ">
                        Recent Activities
                    </div>

                    <Button variant={"link"} className="text-(--color-primary)">
                        View All
                    </Button>
                </div>
                <Table>

                    <TableHeader >
                        <TableRow className="bg-muted/20 h-20 text-xl"  >
                            <TableHead className="font-bold ">DATE</TableHead>
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