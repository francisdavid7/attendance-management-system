"use client"

import {
    Card,
    CardContent,
} from "@/components/ui/card"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"

import {
    CalendarDays,
    CircleAlert,
    CircleCheck,
    Clock3,
    BookOpen,
    MoreVertical,
} from "lucide-react"

const attendanceStats = [
    {
        title: "TOTAL CLASSES",
        value: 42,
        subtitle: "Completion rate: 100%",
        icon: BookOpen,
        badge: "Fall 2023",
        progress: "100%",
        color: "bg-(--color-primary)",
    },
    {
        title: "ATTENDANCE RATE",
        value: "83.5%",
        subtitle: "Target: 90%",
        extra: "6.5% to goal",
        icon: CircleCheck,
        badge: "+2.4%",
        progress: "83%",
        color: "bg-(--color-primary)",
    },
    {
        title: "TOTAL ABSENCES",
        value: 2,
        subtitle: "Approaching policy limit (3)",
        icon: CircleAlert,
        badge: "Warning",
        progress: "35%",
        color: "bg-(--color-destructive)",
    },
]

const attendanceData = [
    {
        id: 1,
        date: "Oct 24, 2023",
        course: "CS101: Intro to Java",
        checkIn: "08:55 AM",
        checkOut: "10:30 AM",
        status: "Present",
    },
    {
        id: 2,
        date: "Oct 22, 2023",
        course: "CS202: Data Structures",
        checkIn: "11:15 AM",
        checkOut: "12:30 PM",
        status: "Late",
    },
    {
        id: 3,
        date: "Oct 20, 2023",
        course: "CS101: Intro to Java",
        checkIn: "--",
        checkOut: "--",
        status: "Absent",
    },
    {
        id: 4,
        date: "Oct 18, 2023",
        course: "ENG105: Composition",
        checkIn: "09:00 AM",
        checkOut: "09:45 AM",
        status: "Partial",
    },
    {
        id: 5,
        date: "Oct 15, 2023",
        course: "CS202: Data Structures",
        checkIn: "11:00 AM",
        checkOut: "12:30 PM",
        status: "Present",
    },
]

const statusStyles: Record<string, string> = {
    Present:
        "bg-emerald-100 text-emerald-700 border border-emerald-200",
    Late:
        "bg-yellow-100 text-yellow-700 border border-yellow-200",
    Absent:
        "bg-red-100 text-red-700 border border-red-200",
    Partial:
        "bg-blue-100 text-blue-700 border border-blue-200",
}

export default function AttendanceTable() {
    return (
        <div className="space-y-6 p-6 bg-slate-50 min-h-screen">
            {/* Top Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                {attendanceStats.map((item) => {
                    const Icon = item.icon

                    return (
                        <Card
                            key={item.title}
                            className="rounded-2xl shadow-sm border"
                        >
                            <CardContent className="p-5 space-y-4">
                                <div className="flex items-start justify-between">
                                    <div className="p-2 rounded-lg bg-(--color-primary)/20">
                                        <Icon className="w-5 h-5 text-(--color-primary)" />
                                    </div>

                                    <span
                                        className={`text-xs px-2 py-1 rounded-md ${item.title === "TOTAL ABSENCES"
                                            ? "bg-(--color-destructive)/20 text-(--color-destructive)"
                                            : "bg-(--color-primary)/15 text-(--color-primary)"
                                            }`}
                                    >
                                        {item.badge}
                                    </span>
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground tracking-wide">
                                        {item.title}
                                    </p>

                                    <h2 className="text-4xl font-bold mt-1">
                                        {item.value}
                                    </h2>
                                </div>

                                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${item.color}`}
                                        style={{ width: item.progress }}
                                    />
                                </div>

                                <div className="flex items-center justify-between text-xs">
                                    <p className="text-muted-foreground">
                                        {item.subtitle}
                                    </p>

                                    {item.extra && (
                                        <span className="font-medium text-(--color-primary)">
                                            {item.extra}
                                        </span>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Filters */}
            <Card className="rounded-2xl shadow-sm">
                <CardContent className="p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
                            <Select>
                                <SelectTrigger>
                                    <div className="flex items-center gap-2">
                                        <CalendarDays className="w-4 h-4" />
                                        <SelectValue placeholder="Last 30 Days" />
                                    </div>
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="30days">
                                        Last 30 Days
                                    </SelectItem>
                                    <SelectItem value="7days">
                                        Last 7 Days
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="All Courses" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="all">
                                        All Courses
                                    </SelectItem>
                                    <SelectItem value="java">
                                        Intro to Java
                                    </SelectItem>
                                    <SelectItem value="ds">
                                        Data Structures
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="All Statuses" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="all">
                                        All Statuses
                                    </SelectItem>
                                    <SelectItem value="present">
                                        Present
                                    </SelectItem>
                                    <SelectItem value="late">
                                        Late
                                    </SelectItem>
                                    <SelectItem value="absent">
                                        Absent
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex gap-2">


                            <Button variant={"default"}>
                                Apply Filters
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Table */}
            <Card className="rounded-2xl shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-100">
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Course</TableHead>
                            <TableHead>Check-in</TableHead>
                            <TableHead>Check-out</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {attendanceData.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.date}</TableCell>

                                <TableCell className="font-medium ">
                                    {item.course}
                                </TableCell>

                                <TableCell>{item.checkIn}</TableCell>

                                <TableCell>{item.checkOut}</TableCell>

                                <TableCell>
                                    <span
                                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusStyles[item.status]}`}
                                    >
                                        {item.status === "Present" && (
                                            <CircleCheck className="w-3 h-3" />
                                        )}

                                        {item.status === "Late" && (
                                            <Clock3 className="w-3 h-3" />
                                        )}

                                        {item.status === "Absent" && (
                                            <CircleAlert className="w-3 h-3" />
                                        )}

                                        {item.status === "Partial" && (
                                            <Clock3 className="w-3 h-3" />
                                        )}

                                        {item.status}
                                    </span>
                                </TableCell>

                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                    >
                                        <MoreVertical className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Footer */}
                <div className="flex items-center justify-between px-6 py-4 text-sm text-muted-foreground border-t">
                    <p>Showing 1 - 5 of 42 entries</p>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                        >
                            {"<"}
                        </Button>

                        <Button
                            size="sm"
                            className="bg-emerald-700 hover:bg-emerald-800"
                        >
                            1
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                        >
                            2
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                        >
                            3
                        </Button>

                        <span>...</span>

                        <Button
                            variant="ghost"
                            size="sm"
                        >
                            9
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                        >
                            {">"}
                        </Button>
                    </div>
                </div>
            </Card>
        </div >
    )
}