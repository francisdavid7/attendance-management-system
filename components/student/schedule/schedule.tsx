import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { CalendarDays, Clock3, MapPin } from "lucide-react";

const schedules = [
    {
        id: 1,
        courseCode: "CSC 301",
        lecturer: "Dr. James",
        time: "08:00 AM - 10:00 AM",
        venue: "LT 2",
        status: "Upcoming",
        attendance: "Present",
    },
    {
        id: 2,
        courseCode: "GST 302",
        lecturer: "Mr. John",
        time: "02:00 PM - 04:00 PM",
        venue: "Hall A",
        status: "Completed",
        attendance: "Present",
    },
];

export default function SchedulePage() {
    return (
        <div className="space-y-6 p-6">
            <div>
                <h1 className="text-3xl font-bold">Schedule</h1>
                <p className="text-muted-foreground">
                    Manage your classes and attendance
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Next Class</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3">
                        <h3 className="font-semibold text-lg">
                            CSC 302
                        </h3>

                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock3 className="h-4 w-4" />
                            02:00 AM - 4:00 AM
                        </div>

                        <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            LT 2
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Today's Classes</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4" />
                            <span>2 Classes Scheduled</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <CardTitle className="text-2xl">Today</CardTitle>

                    <div className="flex gap-2">

                    </div>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Course</TableHead>
                                <TableHead>Lecturer</TableHead>
                                <TableHead>Time</TableHead>

                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {schedules.map((schedule) => (
                                <TableRow key={schedule.id}>
                                    <TableCell>
                                        {schedule.courseCode}
                                    </TableCell>

                                    <TableCell>
                                        {schedule.lecturer}
                                    </TableCell>

                                    <TableCell>
                                        {schedule.time}
                                    </TableCell>


                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}