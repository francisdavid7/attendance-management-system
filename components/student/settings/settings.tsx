"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentUser } from "@/lib/actions/actions";
import { Field, FieldLabel } from "@/components/ui/field"
import { CheckCircle2, Circle, EarthLockIcon, ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent } from "@/components/ui/card";

function Setting() {
    const { user, isLoading } = getCurrentUser();

    return (
        <div className="p-2 md:p-3">

            <div>
                {isLoading ? (
                    <>
                        <Skeleton className="h-12 w-2/5 rounded-md" />
                        <Skeleton className="h-5 w-3/5 mt-3 rounded-md" />
                    </>
                ) : (
                    <>
                        <h1 className="text-4xl font-bold ">Account Settings</h1>
                        <p className="text-xl mt-1">Manage your professional system and security preference</p>
                    </>
                )}
            </div>
            <section className="flex flex-col md:flex-row gap-4 mt-6">
                <div className="flex flex-col gap-3 md:gap-8 md:w-[60%] w-full">
                    <Card className="text-center justify-self-center w-full">
                        <CardHeader>
                            <CardTitle>
                                {isLoading ? (
                                    <div className="flex items-center gap-4">
                                        <Skeleton className="w-20 h-20 rounded-full" />
                                        <div className="flex flex-col">
                                            <Skeleton className="h-6 w-40 rounded-md mb-2" />
                                            <Skeleton className="h-4 w-56 rounded-md" />
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="bg-(--color-primary) relative justify-self-center h-35 w-35 border-2 border-(--color-primary) rounded-full">
                                            <div className="text-7xl absolute mt-8 right-0 left-0  text-(--color-muted)">
                                                {user?.fullName[0]}
                                            </div>
                                        </div>
                                        <h1 className="font-bold text-2xl mt-3">
                                            {user?.fullName}
                                        </h1>
                                        <p>
                                            {user?.email}
                                        </p>
                                    </>
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardDescription>
                            <CardContent>
                                {isLoading ? (
                                    <div className="space-y-4">
                                        <Skeleton className="h-6 w-48 rounded-md" />
                                        <Skeleton className="h-12 w-full rounded-lg" />
                                        <Skeleton className="h-6 w-48 rounded-md" />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Skeleton className="h-12 w-full rounded-lg" />
                                            <Skeleton className="h-12 w-full rounded-lg" />
                                        </div>
                                    </div>
                                ) : (
                                    <Field>
                                        <FieldLabel className="font-bold">Your Name</FieldLabel>
                                        <Input
                                            type="name"
                                            id="name"
                                            placeholder={`edit name "${user?.fullName}"`}
                                        />
                                        <FieldLabel className="font-bold">Email Address</FieldLabel>
                                        <Input
                                            type="email"
                                            id="email"
                                            placeholder={`provide email to edit name "${user?.email}"`}
                                        />
                                    </Field>
                                )}
                            </CardContent>
                        </CardDescription>
                        <CardFooter>
                            <CardAction className="w-full">
                                {isLoading ? (
                                    <Skeleton className="h-12 w-full rounded-full" />
                                ) : (
                                    <Button className="w-full">
                                        Save Profile Changes
                                    </Button>
                                )}
                            </CardAction>
                        </CardFooter>
                    </Card>


                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle className="text-start">
                                {isLoading ? (
                                    <Skeleton className="h-6 w-40 rounded-md" />
                                ) : (
                                    <h1 className="font-bold">
                                        Account Role
                                    </h1>
                                )}
                            </CardTitle>
                        </CardHeader>

                        <CardDescription>
                            <CardContent>
                                {isLoading ? (
                                    <div className="space-y-6">
                                        <Skeleton className="h-6 w-48 rounded-md" />
                                        <Skeleton className="h-4 w-full rounded-md" />
                                        <Skeleton className="h-28 w-full rounded-2xl" />
                                        <Skeleton className="h-20 w-full rounded-2xl" />
                                    </div>
                                ) : (
                                    <>
                                        <Card className="bg-[#1d811d14] backdrop-blur-[4px]">
                                            <CardTitle>
                                                <section className="flex gap-2 text-justify text-(--color-primary)/90" >
                                                    <div>
                                                        <ShieldCheck size={35} />
                                                    </div>
                                                    <div>
                                                        <h1>
                                                            Administration
                                                        </h1>
                                                        <p>
                                                            Full Administrative access <br /> granted
                                                        </p>
                                                    </div>
                                                </section>
                                            </CardTitle>
                                        </Card>
                                        <div className="mt-8">
                                            <Card className="bg-(--color-muted) backdrop-blur-[4px]">
                                                <CardTitle>
                                                    <section className=" text-[#373434]" >
                                                        <div className="">
                                                            Role permission are manage by the institutional IT department. Please contact support to request a role change
                                                        </div>
                                                    </section>
                                                </CardTitle>
                                            </Card>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </CardDescription>
                    </Card>
                </div>
                <div className="w-full ">
                    <Card >
                        <CardHeader>
                            <CardTitle>
                                {isLoading ? (
                                    <div className="flex items-center gap-4">
                                        <Skeleton className="h-12 w-12 rounded-xl" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-6 w-56 rounded-md" />
                                            <Skeleton className="h-4 w-72 rounded-md" />
                                        </div>
                                    </div>
                                ) : (
                                    <section className="flex gap-4">
                                        <div>
                                            <button className="p-2 rounded-[10px] bg-[#d3757533] backdrop-blur-2xl text-destructive/90">
                                                <EarthLockIcon />
                                            </button>
                                        </div>
                                        <div>
                                            <h1 className="text-2xl font-bold">
                                                Security & Password
                                            </h1>
                                            <p>
                                                Ensure your account is using long, random password to stay secure.
                                            </p>
                                        </div>
                                    </section>
                                )}
                            </CardTitle>
                        </CardHeader>

                        <CardDescription>
                            <CardContent>
                                {isLoading ? (
                                    <div className="space-y-6">
                                        <Skeleton className="h-5 w-52 rounded-md" />
                                        <Skeleton className="h-12 w-full rounded-lg" />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Skeleton className="h-12 w-full rounded-lg" />
                                            <Skeleton className="h-12 w-full rounded-lg" />
                                        </div>
                                        <Skeleton className="h-40 w-full rounded-2xl" />
                                    </div>
                                ) : (
                                    <>
                                        <Field>
                                            <FieldLabel className="font-bold text-[13px] md:text-[18px] "> Current Password</FieldLabel>
                                            <Input type="password" id="password" placeholder="..........." className="placeholder:font-bold placeholder:text-2xl" />
                                            <div className="flex gap-6 mt-2 ">
                                                <div className="w-full">
                                                    <FieldLabel className="font-bold m-2 text-[14px] md:text-[13px]">New Password</FieldLabel>
                                                    <Input type="password" id="password" placeholder="New Password" />
                                                </div>
                                                <div className="w-full">
                                                    <FieldLabel className="font-bold md:m-2 m-0"> Confirm New Password</FieldLabel>
                                                    <Input type="password" id="password" placeholder="Repeat New Password" />
                                                </div>
                                            </div>
                                        </Field>
                                        <div className="mt-12">
                                            <Card className="bg-(--color-muted)/40 tracking-wider border-[#e2e8f0]   shadow-none rounded-xl">
                                                <CardContent className="p-5">
                                                    <h4 className="text-xs font-bold uppercase mb-4">
                                                        Password Requirements:
                                                    </h4>
                                                    <ul className="space-y-3">
                                                        <li className="flex items-center space-x-3 text-sm font-medium text-[#334155]">
                                                            <CheckCircle2 className="h-5 w-5 fill-(--color-primary) text-white stroke-[2.5]" />
                                                            <span>Minimum 12 characters</span>
                                                        </li>
                                                        <li className="flex items-center space-x-3 text-sm font-medium text-[#334155]">
                                                            <CheckCircle2 className="h-5 w-5  fill-(--color-primary) text-white stroke-[2.5]" />
                                                            <span>At least one special character</span>
                                                        </li>
                                                        <li className="flex items-center space-x-3 text-sm font-medium text-[#94a3b8]">
                                                            <Circle className="h-5 w-5 text-[#cbd5e1] stroke-[1.5]" />
                                                            <span>At least one uppercase letter</span>
                                                        </li>
                                                    </ul>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </CardDescription>
                        <div>
                            <CardFooter className="justify-end">
                                <CardAction>
                                    {isLoading ? (
                                        <Skeleton className="h-12 w-40 rounded-full" />
                                    ) : (
                                        <Button>
                                            Update Password
                                        </Button>
                                    )}
                                </CardAction>
                            </CardFooter>
                        </div>
                    </Card>
                    <Card className="mt-10">
                        <section className="flex md:justify-evenly ">
                            {isLoading ? (
                                <div className="w-full space-y-4 p-4">
                                    <Skeleton className="h-24 w-full rounded-2xl" />
                                    <Skeleton className="h-6 w-72 rounded-md" />
                                    <Skeleton className="h-4 w-full rounded-md" />
                                    <Skeleton className="h-10 w-24 rounded-full" />
                                </div>
                            ) : (
                                <>
                                    <div className="w-[60%]">
                                        <CardHeader>
                                            <CardTitle >
                                                <div className="rounded-xl w-full h-20">
                                                    <span className="md:hidden inline">{""}</span>
                                                    <img
                                                        src="/Auth_Logo.png"
                                                        alt="Authenticator Logo"
                                                        className="hidden md:inline h-full w-full object-cover rounded-2xl"
                                                    />
                                                </div>
                                            </CardTitle>
                                        </CardHeader>
                                    </div>
                                    <div>
                                        <CardDescription>
                                            <CardContent>
                                                <div className="flex flex-col">
                                                    <h3 className="text-xl font-bold tracking-tight">
                                                        Two-Factor Authentication
                                                    </h3>
                                                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                                        Add an extra layer of security to your account.
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </CardDescription>
                                    </div>

                                    <div className="place-content-center">
                                        <CardDescription>
                                            <CardContent>
                                                <div className="flex items-center">
                                                    <Switch
                                                        id="2fa-toggle"
                                                        className="data-[state=checked]:bg-(--color-primary) scale-130  "
                                                    />
                                                </div>
                                            </CardContent>
                                        </CardDescription>
                                    </div>
                                </>
                            )}
                        </section>
                    </Card>
                </div>
            </section>
        </div>
    );
}

export default Setting;