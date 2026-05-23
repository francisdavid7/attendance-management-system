import { Database, GraduationCap, QrCodeIcon, Settings, ShieldUser, UserCircle2Icon } from "lucide-react"


const roleDescriptions = () => {
    return (
        <div >

            <div className="flex flex-col md:flex-row justify-self-center py-5 px-5 gap-10">
                <section className="w- flex flex-col text-justify justify-self-center py-5 px-5">
                    <div className="flex flex-col text-5xl font-bold text-center md:text-justify">
                        <div className="text-5xl ">
                            Experiences Crafted for
                        </div>
                        <div className=" text-[color:var(--color-primary)]">Every Role</div>
                    </div>

                    <section className="flex flex-col">
                        <div className="flex gap-4 mt-7">
                            <div className="h-12 text-[#254225] w-12 bg-[color:var(--color-secondary)] rounded-2xl place-content-center px-2">
                                <ShieldUser size={33} />
                            </div>

                            <div>
                                <h1 className="text-[1.3em] ">Administrator Hub</h1>
                                <p className="mt-2">
                                    Global multi-campus oversight wth automated compliance reporting and enterprise-grade security protocols.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-7">
                            <div className="h-12 w-12 text-[#0d480d]  bg-[color:var(--color-secondary)]/70 rounded-2xl place-content-center px-2">
                                <GraduationCap size={33} />
                            </div>

                            <div>
                                <h1 className="text-[1.3em]">Tutor interface</h1>
                                <p className="mt-2">
                                    Manage your lectures with ease. Live roster updates, manual overrides, and instant session analytics.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-7">
                            <div className="h-12 w-12 text-green-700 bg-[#a8c1a8b3] rounded-2xl place-content-center px-2">
                                <Database size={33} />
                            </div>

                            <div>
                                <h1 className="text-[1.3em]">Students Portal</h1>
                                <p className="mt-2">
                                    Friction check-in history and real-time attendance percentage to stay informed and on track.
                                </p>
                            </div>
                        </div>
                    </section>
                </section>



                <section className="w-full md:w-[60%]  flex flex-row-reverse justify-center  mt-auto mb-auto">


                    <div className="bg-card rounded-2xl py-6 px-6 w-full h-fit -ml-16 z-0 mb-8 -rotate-4 shadow-2xl shadow-slate-400/25 border border-slate-200">
                        <section className="flex">
                            <div className="text-[color:var(--color-primary)] grow text-start font-bold">ADMIN PANEL</div>
                            <div className="text-end"> <Settings /> </div>
                        </section>

                        <div className="h-2 w-full bg-[color:var(--color-secondary)]/50 rounded-2xl mt-6">
                            <div className="w-[80%] h-full rounded-2xl bg-[color:var(--color-primary)]"></div>
                        </div>

                        <div className="flex flex-col gap-6 mt-10">
                            <section>
                                <div className="flex gap-2.5">
                                    <div className="grow text-start"> <span className="blur-[1px]">recen</span>tly Retention</div>
                                    <div className="font-bold text-end">98.2%</div>
                                </div>
                            </section>

                            <section>
                                <div className="flex">
                                    <div className="grow text-start"><span className="blur-[1px]">Opti</span>mal Health</div>
                                    <div className="text-[color:var(--color-secondary)] text-start">Optimal </div>
                                </div>
                            </section>
                        </div>

                    </div>

                    <div className="bg-card/20 w-[70%] flex flex-col gap-6 bg-[#ffffffba] rounded-2xl py-4 px-4 h-fit z-30 mt-25 rotate-6 shadow-2xl shadow-slate-400/20 border border-slate-200">
                        <div className="flex gap-1 md:gap-2">
                            <div className="h-10 w-10 md:h-12 md:w-12 text-[#ffffffec] text-[28px] bg-[color:var(--color-primary)] md:rounded-2xl rounded-[7px] place-content-center px-2 md:px-3 ">
                                <UserCircle2Icon />
                            </div>

                            <div>
                                <h1 className="font-bold text-[13px] md:text-[1em]">
                                    Welcome, James
                                </h1>
                                <h2 className="text-[9px] md:text-[11px] text-[color:var(--color-secondary)]/80 font-bold">
                                    Level 4 ICT Professional
                                </h2>

                            </div>
                        </div>

                        <div className="text-[#ffffffde] md:p-6 md:px-6 px-2 py-2 text-center font-bold bg-[color:var(--color-primary)] rounded-2xl flex gap-2 justify-center ">
                            <div className=" ">
                                <QrCodeIcon />
                            </div>
                            <div className="text-[14px] md:text-[1em]">
                                Check In Now
                            </div>

                        </div>
                    </div>

                </section>
            </div>

        </div>
    )
}

export default roleDescriptions;