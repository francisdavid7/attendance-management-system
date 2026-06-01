"use client"
import btn from "./icons";
import { BadgeCheck } from "lucide-react";
import { getCurrentUser } from "@/lib/actions/actions";
import { Progress } from "@/components/ui/progress";
import { RadialBarChart, RadialBar, PolarAngleAxis, Legend } from "recharts"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarTrigger } from "@/components/ui/sidebar";

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

    const { user, isLoading } = getCurrentUser();


    const renderCenterLabel = () => {
        return (
            <div className="flex items-center justify-center w-full h-full text-center">
                <span className="hidden md:inline text-4xl font-extrabold">
                    <BadgeCheck size={50} className="text-[color:var(--color-primary)]" />
                </span>

                <span className="inline md:hidden text-4xl font-extrabold text-[color:var(--color-primary)]">
                    83%
                </span>
            </div>
        );
    };

    return (
        <main className="p-3 md:p-5">


            <div className="">


                <div className="">
                    <div className="text-4xl font-bold ">
                        Welcome back, <span>{user?.fullName.split(" ")[0]}!</span>
                    </div>
                    <p className=" text-xl opacity-70 font-light mt-2">
                        You have attended 83% of your classes this semester. Keep it up!
                    </p>
                </div>

                <section className="grid md:flex gap-4 w-full mt-5">
                    <Card className="w-full">
                        <section className="flex  md:flex-row flex-col ">
                            <div className="grow " >
                                <CardHeader>
                                    <CardTitle>
                                        <div className="text-2xl md:text-justify text-center text-[color:var(--color-muted-foreground)]">
                                            OVERALL ATTENDANCE
                                        </div>
                                    </CardTitle>
                                </CardHeader>

                                <CardDescription>
                                    <CardContent>
                                        <h1 className="opacity-0 md:opacity-100 text-[1px] md:text-4xl text-(--color-primary) mt-0 md:mt-4 font-extrabold  ">
                                            83%
                                        </h1>
                                        <p className="text-[17px] md:text-start text-center mt-4 md:mt-5">
                                            You are <span>+5%</span> above the required 75% Threshold
                                        </p>
                                        <div className="opacity-0 md:opacity-100 md:mt-6 mt-0">
                                            <Progress value={70} />
                                        </div>
                                    </CardContent>
                                </CardDescription>
                            </div>

                            <div>
                                <CardContent>
                                    <div className="justify-self-center">
                                        <RadialBarChart
                                            width={250}
                                            height={250}
                                            innerRadius="70%"
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

                                            <Legend
                                                content={renderCenterLabel}
                                                layout="vertical"
                                                verticalAlign="middle"
                                                align="center"
                                            />
                                        </RadialBarChart>
                                    </div>
                                </CardContent>
                            </div>
                        </section>
                    </Card>

                    <div className="w-full grid grid-cols-2 gap-3">
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