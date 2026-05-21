"use client"
import {
    RadialBarChart,
    RadialBar,
    PolarAngleAxis
} from "recharts"

import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardAction,
    CardDescription,
    CardContent
} from "@/components/ui/card"


import { Button } from "../ui/button";
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress";
import { BookOpen, CheckCircle2, CircleX, History } from "lucide-react";


const data = [{
    name: "Attendance",
    value: 83,
    fill: "var(--color-primary)",
}];


function Chart() {
    return (
        <main>
            <div className="">
                <div className="">
                    <div className="text-3xl font-bold ">
                        Welcome back, Alex!
                    </div>
                    <p className=" text-[14px] opacity-55 font-light mt-3">
                        You have attended 83% of your classes this semester. Keep it up!
                    </p>
                </div>

                <section className="flex justify-evenly mt-11">

                    <div className=" ">
                        <Card>
                            <section className="flex gap-8">
                                <div className="grow" >
                                    <CardHeader>
                                        <CardTitle>
                                            <div className="text-xl text-[color:var(--color-muted-foreground)]">
                                                OVERALL ATTENDANCE
                                            </div>
                                        </CardTitle>
                                    </CardHeader>

                                    <CardDescription>
                                        <CardContent>
                                            <h1 className="text-3xl text-(--color-primary) mt-3 font-extrabold  ">
                                                83%
                                            </h1>
                                            <p className="mt-3">
                                                You are <span>+5%</span> above the required 75% Threshold
                                            </p>
                                            <div className="mt-4">
                                                <Progress value={70} />
                                            </div>
                                        </CardContent>
                                    </CardDescription>
                                </div>
                                <CardContent>
                                    <div>
                                        <RadialBarChart
                                            width={250}
                                            height={250}
                                            innerRadius="80%"
                                            outerRadius="100%"
                                            data={data}
                                            startAngle={90}
                                            endAngle={-270}
                                        >
                                            <PolarAngleAxis
                                                type="number"
                                                domain={[0, 100]}
                                                angleAxisId={0}
                                                tick={false}
                                            />
                                            <RadialBar
                                                dataKey="value"
                                                background
                                                cornerRadius={10}
                                            />
                                        </RadialBarChart>
                                    </div>
                                </CardContent>
                            </section>
                        </Card>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col text-justify">

                            <Card >
                                <CardHeader>
                                    <CardTitle>
                                        <Badge variant={"outline"}>
                                            <BookOpen />
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardDescription>

                                    <CardContent>
                                        <h1>
                                            TOTAL CLASSES
                                        </h1>
                                        <div className="font-bold mt-3">
                                            42
                                        </div>
                                    </CardContent>
                                </CardDescription>
                            </Card>
                        </div>
                        <div className="flex flex-col text-justify">

                            <Card >
                                <CardHeader>
                                    <CardTitle>
                                        <Badge variant="secondary">
                                            <CheckCircle2 />
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardDescription>

                                    <CardContent>
                                        <h1>
                                            PRESENT
                                        </h1>
                                        <div className="font-bold mt-3">
                                            35
                                        </div>
                                    </CardContent>
                                </CardDescription>
                            </Card>
                        </div>

                        <div className="flex flex-col text-justify">

                            <Card >
                                <CardHeader>
                                    <CardTitle>
                                        <Badge className="text-[#ffb700] backdrop-blur-2xl bg-[#efb41f5c]">
                                            <History />
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardDescription>

                                    <CardContent>
                                        <h1>
                                            LATE
                                        </h1>
                                        <div className="font-bold mt-3">
                                            4
                                        </div>
                                    </CardContent>
                                </CardDescription>
                            </Card>
                        </div>

                        <div className="flex flex-col text-justify">

                            <Card >
                                <CardHeader>
                                    <CardTitle>
                                        <Badge variant="destructive">
                                            <CircleX />
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardDescription>

                                    <CardContent>
                                        <h1>
                                            ABSENT
                                        </h1>
                                        <div className="font-bold mt-3">
                                            3
                                        </div>
                                    </CardContent>
                                </CardDescription>
                            </Card>
                        </div>

                    </div>


                </section>

            </div>

        </main>
    )
}



export default Chart;