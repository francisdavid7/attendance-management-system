const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex">
            <aside className="hidden md:block relative w-1/2 h-screen bg-[#002115] z-10">
                <img
                    src="/Abstract Emerald Waves.png"
                    className="absolute w-full h-full -z-10 opacity-30 pointer-events-none"
                />

                <div className="w-[70%] mx-auto h-full flex flex-col justify-end gap-16 pb-20 ">
                    <div>
                        <h1 className="text-[40px] font-bold text-white leading-12 mb-4">
                            Empower Your Educational Journey
                        </h1>
                        <p className="text-[#d2d8e4] text-[14px]">
                            A refined platform for high-performance teams to orchestrate
                            attendance, scheduling, and growth with seamless precision.
                        </p>
                    </div>


                    <div className="flex items-center justify-between border-t border-white/10 pt-6 text-sm text-zinc-500">
                        <p>© 2026 AttendX</p>

                        <div className="flex items-center gap-4">
                            <button className="transition-colors hover:text-white">
                                Privacy
                            </button>
                            <button className="transition-colors hover:text-white">
                                Terms
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {children}
        </div>
    );
};

export default layout;
