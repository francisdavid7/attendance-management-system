"use client"
import {
    RadialBarChart,
    RadialBar,
    PolarAngleAxis
} from "recharts"

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from "@/components/ui/card"

import { Progress } from "../ui/progress";
import { BookOpen, CheckCircle2, CircleX, History } from "lucide-react";

const data = [{
    name: "Attendance",
    value: 83,
    fill: "var(--color-primary)",
}];


const board = [
    {
        title: "TOTAL CLASSES",
        number: 42,
    },
    {
        title: "PRESENT",
        number: 35,
    },
    {
        title: "LATE",
        number: 4,
    },
    {
        title: "ABSENT",
        number: 3,
    }
]


function Chart() {

    const btn = (status: string) => {
        if (status === "PRESENT") {
            return (
                <button className="bg-[hsl(120,54%,71%)] backdrop-blur-2xl text-(--color-primary) p-1  rounded-[10px]">
                    <CheckCircle2 />
                </button>
            )
        } else if (status === "ABSENT") {
            return (
                <button className="bg-[#dda0a078] backdrop-blur-2xl text-[#ae0d0d] p-1  rounded-[10px]">
                    <CircleX />
                </button>
            )
        } else if (status === "LATE") {
            return (

                <button className="bg-[#de9a4c62] backdrop-blur-2xl text-[#ae8b23] p-1 rounded-[10px]">
                    <History />
                </button>
            )
        } else if (status === "TOTAL CLASSES") {
            return (

                <button className="border border-(--color-border) backdrop-blur-2xl p-1  rounded-[10px]">
                    <BookOpen />
                </button>
            )
        }

    }

    return (
        <main>
            <div className="">
                <div className="">
                    <div className="text-4xl font-bold ">
                        Welcome back, Alex!
                    </div>
                    <p className=" text-xl opacity-55 font-light mt-3">
                        You have attended 83% of your classes this semester. Keep it up!
                    </p>
                </div>

                <section className="grid gap-6 mt-6">


                    <Card className="p-6">
                        <section className="flex  gap-6">
                            <div className="grow " >
                                <CardHeader>
                                    <CardTitle>
                                        <div className="text-2xl text-[color:var(--color-muted-foreground)]">
                                            OVERALL ATTENDANCE
                                        </div>
                                    </CardTitle>
                                </CardHeader>

                                <CardDescription>
                                    <CardContent>
                                        <h1 className="text-4xl text-(--color-primary) mt-4 font-extrabold  ">
                                            83%
                                        </h1>
                                        <p className="text-[17px] mt-5">
                                            You are <span>+5%</span> above the required 75% Threshold
                                        </p>
                                        <div className="mt-6">
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


                    <div className="grid grid-cols-2 gap-4">
                        {board.map((data) => {
                            return (
                                <div className="flex flex-col  text-justify" key={data.number}>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle>
                                                {btn(data.title)}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardDescription>

                                            <CardContent>
                                                <h1>
                                                    {data.title}
                                                </h1>
                                                <div className="font-bold mt-3 text-[20px]">
                                                    {data.number}
                                                </div>
                                            </CardContent>
                                        </CardDescription>
                                    </Card>
                                </div>
                            )
                        })}

                    </div>


                </section>

            </div>

        </main>
    )
}



export default Chart;