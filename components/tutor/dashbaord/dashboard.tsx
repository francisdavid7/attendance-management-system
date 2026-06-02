"use client"
import {
    GraduationCap,
    Radio,
    Users,
    AlertTriangle,
    QrCode,
    UserPlus,
    XCircle,
} from "lucide-react";

import { Progress } from "@/components/ui/progress";

import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/actions";
const attendance = [
    {
        name: "Alice Schmidt",
        id: "#STU-29384",
        time: "09:12 AM",
        status: "Present",
    },
    {
        name: "Marcus Kane",
        id: "#STU-29401",
        time: "09:18 AM",
        status: "Present",
    },
    {
        name: "Lana Lopez",
        id: "#STU-29311",
        time: "09:42 AM",
        status: "Late",
    },
    {
        name: "James Roland",
        id: "#STU-29522",
        time: "09:44 AM",
        status: "Present",
    },
];

export default function LecturerDashboard() {
    const { user, isLoading } = getCurrentUser();

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold">
                    Good morning, Prof. {user?.fullName.split(" ")[0]}
                </h1>

                <p className="text-muted-foreground">
                    Here's the real-time status of your current lecture session.
                </p>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <Card>
                    <CardContent className="flex items-start justify-between pt-4">
                        <div>
                            <p className="text-xs uppercase text-muted-foreground">
                                Active Class
                            </p>

                            <h3 className="mt-2 text-xl font-bold">
                                CS101: Intro to CS
                            </h3>

                            <p className="mt-1 text-sm text-muted-foreground">
                                09:00 AM - 11:00 AM
                            </p>
                        </div>

                        <GraduationCap className="h-5 w-5 text-(--color-primary)" />
                    </CardContent>
                </Card>

                <Card>
                    <CardDescription>
                        <CardContent className="flex items-start justify-between pt-5">
                            <div>
                                <p className="text-xs uppercase text-muted-foreground">
                                    System Status
                                </p>

                                <div className="mt-2 flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-(--color-primary)" />

                                    <span className="font-semibold">Active</span>
                                </div>

                                <p className="mt-2 text-sm ">
                                    QR Scanner engaged
                                </p>
                            </div>

                            <Radio className="h-5 w-5 text-blue-500" />
                        </CardContent>
                    </CardDescription>
                </Card>

                <Card>
                    <CardContent className="">
                        <div className="flex justify-between">
                            <Users className="h-5 w-5 text-(--color-primary)" />
                            <span className="text-sm font-medium text-(--color-primary)">
                                71%
                            </span>
                        </div>

                        <h2 className="mt-3 text-3xl font-bold">32 / 45</h2>

                        <div className="mt-3 h-2 rounded-full bg-muted">
                            <Progress value={70} />
                        </div>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Students present
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-start justify-between pt-4">
                        <div>
                            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs text-orange-600">
                                Action Required
                            </span>

                            <h3 className="mt-5 text-2xl font-bold">
                                3 Students
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                Requiring review
                            </p>
                        </div>

                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                    </CardContent>
                </Card>
            </div>


            <div className="">

                <Card>
                    <CardContent className="p-0">
                        <div className="flex items-center justify-between border-b p-4">
                            <h2 className="font-semibold">
                                Live Attendance Feed
                            </h2>

                            <Button variant="link">View All</Button>
                        </div>

                        <table className="w-full">
                            <thead>
                                <tr className="border-b text-left text-xs text-muted-foreground">
                                    <th className="p-4">STUDENT NAME</th>
                                    <th>ID NUMBER</th>
                                    <th>TIME</th>
                                    <th>STATUS</th>
                                </tr>
                            </thead>

                            <tbody>
                                {attendance.map((student) => (
                                    <tr key={student.id} className="border-b">
                                        <td className="p-4 font-medium">
                                            {student.name}
                                        </td>

                                        <td>{student.id}</td>

                                        <td>{student.time}</td>

                                        <td>
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs
                        ${student.status === "Present"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {student.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}