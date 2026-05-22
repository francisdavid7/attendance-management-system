import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardAction,
    CardDescription,
    CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CheckCircle2, Circle, EarthLockIcon, HistoryIcon, ShieldCheck } from "lucide-react";


function Setting() {
    return (
        <div>

            <div>
                <h1 className="text-4xl font-bold ">Account Settings</h1>
                <p className="text-xl mt-1">Manage your professional system and security preference</p>
            </div>

            <section className="flex gap-4 mt-10">
                <div className="flex flex-col gap-8 w-[30%]">
                    <Card className="text-center justify-self-center ">
                        <CardHeader>
                            <CardTitle>
                                <div className="text-center justify-self-center h-40 w-40 border-5 border-(--color-primary) rounded-full">
                                    <img src="/hero_image.png" alt="DP" className="h-full w-ful object-cover rounded-full" />
                                </div>
                                <h1 className="font-bold text-2xl">
                                    Alex Johnson
                                </h1>
                                <p>
                                    alexjonny7@gmail.com
                                </p>
                            </CardTitle>
                        </CardHeader>

                        <CardDescription >
                            <CardContent>

                                <Field >
                                    <FieldLabel className="font-bold">Your Name</FieldLabel>
                                    <Input
                                        type="name"
                                        id="name"
                                        placeholder="Edit Your name here"
                                    />
                                    <FieldLabel className="font-bold">Email Address</FieldLabel>
                                    <Input
                                        type="email"
                                        id="email"
                                        placeholder="youremain@gmail.com"
                                    />
                                </Field>


                            </CardContent>

                        </CardDescription>

                        <CardFooter>
                            <CardAction className="w-full">
                                <Button className="w-full">
                                    Save Profile Changes
                                </Button>
                            </CardAction>
                        </CardFooter>
                    </Card>


                    <Card>
                        <CardHeader>
                            <CardTitle className="text-start">
                                <h1 className="font-bold">
                                    Account Role
                                </h1>
                            </CardTitle>
                        </CardHeader>

                        <CardDescription>
                            <CardContent>
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

                            </CardContent>
                        </CardDescription>
                    </Card>

                </div>


                <div className="w-[65%] ">
                    <Card >
                        <CardHeader>
                            <CardTitle>

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
                            </CardTitle>
                        </CardHeader>

                        <CardDescription>
                            <CardContent>

                                <Field>
                                    <FieldLabel className="font-bold text-[18px] "> Current Password</FieldLabel>
                                    <Input type="password" id="password" placeholder="..........." className="placeholder:font-bold placeholder:text-2xl" />

                                    <div className="flex gap-6 mt-2 ">
                                        <div className="w-full">
                                            <FieldLabel className="font-bold m-2">New Password</FieldLabel>
                                            <Input type="password" id="password" placeholder="New Password" />
                                        </div>

                                        <div className="w-full">
                                            <FieldLabel className="font-bold m-2"> Confirm New Password</FieldLabel>
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
                            </CardContent>
                        </CardDescription>

                        <div >

                            <CardFooter className="justify-end">
                                <CardAction >
                                    <div >

                                        <Button>
                                            Update Password
                                        </Button>
                                    </div>
                                </CardAction>
                            </CardFooter>
                        </div>
                    </Card>



                    <Card className="mt-10">
                        <section className="flex justify-evenly">


                            <div className="w-[60%]">
                                <CardHeader>
                                    <CardTitle >

                                        <div className="rounded-xl w-full h-20">
                                            <img
                                                src="/Auth_Logo.png"
                                                alt="Authenticator Logo"
                                                className="h-full w-full object-cover rounded-2xl"
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
                        </section>
                    </Card>
                </div>
            </section>
        </div>
    );
}

export default Setting;