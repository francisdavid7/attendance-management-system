"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useHistoryStore } from "@/components/tutor/dashbaord/zstand"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { useEffect } from "react"
import btn from "../icons"

export default function RecentHistory() {

    const histories = useHistoryStore((state) => state.historyData);

    useEffect(() => {

    }, [histories]);

    const btn = (status: string) => {
        if (status === "PRESENT") {
            return (
                <Badge className="bg-(--color-secondary)/20 text-[14px] font-semibold text-(--color-primary) rounded-[8px]">
                    {status}
                </Badge>
            )
        } else if (status === "ABSENT") {
            return (
                <Badge className="bg-destructive/20 text-[14px] font-semibold backdrop-blur-2xl text-(--color-destructive) rounded-[8px]">
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
                        {histories?.attendances?.map((data: any) => {
                            return (
                                <TableRow key={data.id}>
                                    <TableCell className="py-5 ">{new Date(
                                        data.checkInTime
                                    ).toLocaleString("en-US", {
                                        year: "numeric",
                                        weekday: "short",
                                        day: "numeric",

                                    })}</TableCell>
                                    <TableCell>{data.session.course.name}</TableCell>
                                    <TableCell>
                                        {btn(data.status)}
                                    </TableCell>
                                    <TableCell>{new Date(
                                        data.checkInTime
                                    ).toLocaleString("en-US", {
                                        hour: "numeric",
                                        minute: "2-digit",
                                    })}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Card>

        </div>
    )
}