"use client"
import btn from "./icons";
import { BadgeCheck, BookOpen, CheckCircle2, Clock, Download, Plus, XCircle } from "lucide-react";
import { studentsData } from "@/lib/actions/actions";
import { useHistoryStore } from "@/components/tutor/dashbaord/zstand";
import { Progress } from "@/components/ui/progress";
import { RadialBarChart, RadialBar, PolarAngleAxis, Legend } from "recharts"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

function Chart() {
    const { data, isLoading } = studentsData();
    const { setHistoryData } = useHistoryStore();
    const [table, setTable] = useState();

    useEffect(() => {
        setTable(data)
        setHistoryData(table)
    }, [table, data])



    const count = data?._count?.attendances

    const railData = !count ? 0 : count;
    const radialBar = [{
        name: "Attendance",
        value: railData,
        fill: "var(--color-primary)",
    }];

    const board = [
        {
            title: "TOTAL CLASSES",
            number: count,
        },
        {
            title: "PRESENT",
            number: count,

        },
        {
            title: "ABSENT",
            number: 0,
        }
    ]

    const renderCenterLabel = () => {
        return (
            <div className="flex items-center justify-center w-full h-full text-center">
                <span className="hidden md:inline text-4xl font-extrabold">
                    <BadgeCheck size={50} className="text-[color:var(--color-primary)]" />
                </span>
                <span className="inline md:hidden text-4xl font-extrabold text-[color:var(--color-primary)]">
                    {count ? `${count}%` : "0%"}
                </span>
            </div>
        );
    };


    const getCardMeta = (title: string) => {
        switch (title?.toLowerCase()) {
            case 'total classes':
                return { icon: <BookOpen className="h-5 w-5 text-slate-600" />, bg: 'bg-slate-50' };
            case 'present':
                return { icon: <CheckCircle2 className="h-5 w-5 text-(--color-primary)" />, bg: 'bg-primary/10' };
            case 'absent':
                return { icon: <XCircle className="h-5 w-5 text-(--color-destructive)" />, bg: 'bg-destructive/10' };
            default:
                return { icon: <BookOpen className="h-5 w-5 text-slate-600" />, bg: 'bg-slate-50' };
        }
    };

    return (


        <main className="p-3 md:p-0 max-w-7xl mx-auto">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mt-5">
                        Welcome back, <span className="font-bold">{data?.fullName?.split(" ")[0]}!</span>
                    </h1>
                    <p className="text-sm md:text-base text-slate-500 mt-1.5 font-normal">
                        You have attended {count}% of your classes this semester. Keep it up!
                    </p>
                </div>
            </div>

            <section className="flex flex-col lg:flex-row gap-6 w-full items-stretch">
                <Card className="w-full lg:w-[68%] overflow-hidden p-6 md:p-8 flex flex-col justify-between">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 h-full">
                        <div className="flex flex-col justify-between flex-1 h-full py-2">
                            <CardHeader>
                                <CardTitle>
                                    <span className="text-xl md:text-2xl opacity-60 font-bold tracking-wider">
                                        OVERALL ATTENDANCE
                                    </span>
                                </CardTitle>

                                <h2 className="hidden md:inline text-5xl md:text-6xl font-extrabold text-(--color-primary) tracking-tight mt-3 mb-4">
                                    {count ? (count === 0 ? "0%" : `${count}%`) : "0%"}
                                </h2>

                                <p className="text-[15px] md:text-base opacity-90 font-normal">
                                    You are <span className="font-semibold text-(--color-primary)">+5%</span> above the required 75% threshold.
                                </p>

                                <div className="mt-12 w-full ">
                                    <Progress
                                        value={count}
                                        className="h-3 rounded-full"
                                    />
                                </div>
                            </CardHeader>
                        </div>


                        <div className="flex items-center justify-center min-w-[240px] relative">
                            <RadialBarChart
                                width={240}
                                height={240}
                                innerRadius="75%"
                                outerRadius="100%"
                                data={radialBar}
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
                                    background={{ fill: '#f1f5f9' }}
                                    cornerRadius={12}
                                    fill="#10b981"
                                />
                                <Legend
                                    content={renderCenterLabel}
                                    layout="vertical"
                                    verticalAlign="middle"
                                    align="center"
                                />
                            </RadialBarChart>
                        </div>
                    </div>
                </Card>

                <div className="w-full lg:w-[32%] grid grid-cols-2 gap-4">
                    {board?.map((item, index) => {
                        const meta = getCardMeta(item.title);
                        return (
                            <Card key={index} className=" p-5 flex flex-col justify-between transition-all ">
                                <CardContent className="p-0 flex flex-col justify-between h-full gap-5">
                                    <div className={`p-2.5 rounded-xl w-fit ${meta.bg}`}>
                                        {meta.icon}
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-xs md:text-sm font-bold tracking-wider opacity-68 uppercase block">
                                            {item.title}
                                        </span>
                                        <span className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight block">
                                            {item.number}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </section>
        </main>
    )
}

export default Chart;











