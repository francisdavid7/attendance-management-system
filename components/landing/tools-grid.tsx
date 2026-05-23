import { ChartArea, ChartBar, ChartBarBig, ChartCandlestickIcon, ChartColumn, ChartGantt, ChartLine, ChartNoAxesColumn, ChartPieIcon, HistoryIcon, QrCodeIcon, ShieldCheck } from "lucide-react"

const grid = () => {
    return (
        <div className="w-full p-4 sm:p-6 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center" >
                <div className="bg-[color:var(--color-card)] text-center rounded-2xl py-5 px-6 w-full shadow-sm md:ml-76 ml-0">
                    <div className="mb-4 h-10 w-10 rounded-md bg-[color:var(--color-primary)]/15 flex items-center justify-center">
                        <QrCodeIcon size={24} color="var(--color-secondary)" />
                    </div>

                    <div className="text-left">
                        <div className="mb-2">
                            <h1 className="text-xl sm:text-2xl mb-2 font-semibold">Instant QR Check-in</h1>
                            <p className="text-sm text-[color:var(--color-muted-foreground)]/90 leading-relaxed">Secure, location-aware QR codes generated per session. Students register presence in under 2 seconds with zero friction.</p>
                        </div>

                        <div className="w-full mt-3">
                            <img src="/QRcodeImage.png" alt="QRimage" className="w-full h-40 md:h-48 object-cover rounded-md" />
                        </div>
                    </div>
                </div>

                <div className="text-white md:w-[50%] bg-[color:var(--color-primary)] rounded-2xl p-6 text-justify shadow-sm">
                    <section className="grid grid-cols-2 gap-3 items-center">
                        <div className="h-12 w-12 bg-white/10 rounded-md flex items-center justify-center border border-white/20">
                            <ChartColumn size={28} color="white" />
                        </div>
                        <div className="text-end">
                            <ChartLine size={120} color="rgba(255,255,255,0.18)" />
                        </div>
                    </section>

                    <section className="mt-3 text-white">
                        <div>
                            <h1 className="text-lg font-bold sm:text-2xl mt-4 mb-3 ">Predictive Admin Analytics</h1>
                        </div>
                        <div>
                            <p className="mb-3  leading-relaxed">Dive deep into attendance trends with powerful ML-driven data visualization and instant PDF/Excel exports.</p>
                        </div>

                        <section className="mt-4 pt-4 border-t border-white/10">
                            <div className="flex gap-4 mt-2 items-center">
                                <div className="h-10 w-10 bg-white/12 rounded-md flex items-center justify-center">
                                    <ChartNoAxesColumn size={22} color="white" />
                                </div>
                                <div className="text-justify text-2xl font-medium">
                                    <div>15% boost in</div>
                                    <div>engagement</div>
                                </div>
                            </div>
                        </section>
                    </section>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 mt-10 justify-items-center">
                <section className="bg-[color:var(--color-card)] text-center rounded-2xl py-5 px-6  md:w-[60%] shadow-sm ">
                    <div className="mb-6 text-[color:var(--color-primary)] h-14 w-14 rounded-lg bg-[color:var(--color-secondary)]/12 flex items-center justify-center">
                        <ShieldCheck size={40} />
                    </div>

                    <div className="text-left">
                        <h1 className="text-lg sm:text-xl font-semibold mb-3">Tutor Verification</h1>

                        <p className="text-sm leading-relaxed mb-5">Tutors can instantly verify student identity and override entries with a secure biometric or PIN-based one-tap action.</p>
                    </div>
                </section>


                <section className="bg-[color:var(--color-muted)]/30 text-center rounded-2xl py-5 px-6 w-full shadow-sm md:mr-85">
                    <div className="flex gap-6">

                        <section className="text-left grow">
                            <div className="bg-[color:var(--color-primary)] mb-4 h-11 w-11 rounded-md flex items-center justify-center">
                                <HistoryIcon size={20} color="white" />
                            </div>

                            <h1 className="mt-1 text-2xl mb-2 font-semibold">Live Monitoring Hub</h1>

                            <p className="text-sm leading-relaxed">Real-time status updates from every lecture hall on campus. Manage attendance at scale from a single unified command center.</p>
                        </section>

                        <section className="flex flex-col gap-3 mt-2 w-full mt-10">
                            <div className="bg-white md:w-full rounded-lg h-10 px-3 py-2 flex items-center">
                                <div className="bg-[color:var(--color-primary)]/20 p-1 rounded-full mr-3">
                                    <h1 className="text-[12px] font-bold text-[color:var(--color-primary)]">AJ</h1>
                                </div>
                                <div className="font-semibold text-sm flex-1">Alex Johnson</div>

                                <div className="p-1 text-xs bg-[color:var(--color-secondary)]/30 rounded-md">PRESENT</div>
                            </div>

                            <div className="bg-white w-full rounded-lg h-10 px-3 py-2 flex items-center opacity-50">
                                <div className="bg-[color:var(--color-secondary)]/20 p-1 rounded-full mr-3">
                                    <h1 className="text-[12px] font-bold text-[#941100]">
                                        SM
                                    </h1>
                                </div>
                                <div className="font-semibold text-sm flex-1">
                                    Sarah Miller
                                </div>

                                <div className="p-1 text-xs bg-[#ae6e0e68] rounded-md">PENDING</div>
                            </div>
                        </section>
                    </div>
                </section>

            </div>
        </div >
    )
}

export default grid