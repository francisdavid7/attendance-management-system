import { CalendarDays, Clock3, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { activeSession } from "@/lib/actions/actions";


export default function SchedulePage() {
    const { data, isLoading } = activeSession();

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
                        <CardTitle className="text-(--color-primary) text-xl font-bold  ">Ongoing session</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3">
                        <h3 className="font-semibold text-lg">
                            {data?.session?.course.name}
                        </h3>

                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock3 className="h-4 w-4" />
                            {new Date(data?.session?.createdAt).toLocaleString("en-US", {
                                hour: "numeric",
                                minute: "2-digit"
                            })} - {new Date(data?.session?.sessionEndAt).toLocaleString("en-US", {
                                hour: "numeric",
                                minute: "2-digit"
                            })}
                        </div>

                        <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            Lecture Hall 3
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
                            <span>1 Class Scheduled</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <CardTitle className="text-2xl">Active class</CardTitle>

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

                            <TableRow key={data?.session.id}>
                                <TableCell>
                                    {data?.session?.course?.name}
                                </TableCell>

                                <TableCell>
                                    {data?.session?.tutor?.fullName
                                    }
                                </TableCell>

                                <TableCell>
                                    {new Date(data?.session?.createdAt).toLocaleString("en-US", {
                                        hour: "numeric",
                                        minute: "2-digit"
                                    })} - {new Date(data?.session?.sessionEndAt).toLocaleString("en-US", {
                                        hour: "numeric",
                                        minute: "2-digit"
                                    })}
                                </TableCell>


                            </TableRow>

                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}