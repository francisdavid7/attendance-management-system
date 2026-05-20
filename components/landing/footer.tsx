import { Copyright, Earth, LeafyGreen, MessageCircle } from "lucide-react"

const footer = () => {
    return (
        <footer className="bg-slate-950/95 border-t border-white/10 py-16 px-6 md:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-12 lg:grid-cols-[320px_repeat(3,1fr)]">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:var(--color-primary)] text-white shadow-lg shadow-[rgba(15,23,42,0.25)]">
                                <LeafyGreen />
                            </div>
                            <div className="text-2xl font-bold text-white">AttendanceX</div>
                        </div>

                        <p className="max-w-md text-sm leading-7 text-slate-300">
                            Elevating educational standards through precision attendance engineering and intuitive UX design.
                        </p>

                        <div className="flex items-center gap-3">
                            <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:border-[color:var(--color-primary)] hover:bg-white/10 hover:text-[color:var(--color-primary)]">
                                <Earth />
                            </button>
                            <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:border-[color:var(--color-primary)] hover:bg-white/10 hover:text-[color:var(--color-primary)]">
                                <MessageCircle />
                            </button>
                        </div>
                    </div>

                    <div className="grid gap-10 sm:grid-cols-3 md:gap-8">
                        <div>
                            <h2 className="text-white font-semibold">Product</h2>
                            <ul className="mt-5 flex flex-col gap-3 text-sm text-slate-400">
                                <li className="transition hover:text-white cursor-pointer">Features</li>
                                <li className="transition hover:text-white cursor-pointer">Security</li>
                                <li className="transition hover:text-white cursor-pointer">Mobile App</li>
                                <li className="transition hover:text-white cursor-pointer">API Docs</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-white font-semibold">Company</h2>
                            <ul className="mt-5 flex flex-col gap-3 text-sm text-slate-400">
                                <li className="transition hover:text-white cursor-pointer">About Us</li>
                                <li className="transition hover:text-white cursor-pointer">Careers</li>
                                <li className="transition hover:text-white cursor-pointer">Partners</li>
                                <li className="transition hover:text-white cursor-pointer">Press Kit</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-white font-semibold">Contact</h2>
                            <ul className="mt-5 flex flex-col gap-3 text-sm text-slate-400">
                                <li className="transition hover:text-white cursor-pointer">Support Center</li>
                                <li className="transition hover:text-white cursor-pointer">Sales</li>
                                <li className="transition hover:text-white cursor-pointer">Contact Form</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-16 border-t border-white/10 pt-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                            <Copyright className="h-4 w-4" />
                            <span>AttendanceX. Crafted for excellence.</span>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold text-slate-300">
                            <button className="transition hover:text-white">Privacy</button>
                            <button className="transition hover:text-white">Terms</button>
                            <button className="transition hover:text-white">Cookies</button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default footer;