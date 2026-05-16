const numberGrid = () => {
    return (
        <div>

            <div className="flex flex-col md:flex-row md:gap-20">

                <div className="w-full p-10 text-center justify-center">
                    <div className="grid h-15 w-15 rounded-2xl justify-self-center mb-7 bg-[#e6f4f0] border border-[#39b48e] shadow-lg shadow-gray-200/50 -rotate-6">
                        <h1 className="text-2xl font-bold place-content-center text-black">1</h1>
                    </div>

                    <div>
                        <h1 className="text-2xl mb-3">Capture</h1>
                        <p>
                            Students scan session-specific dynamic QR codes with their existing devices.
                        </p>
                    </div>
                </div>

                <div className="w-full  p-10 text-center justify-center">
                    <div className="grid h-15 w-15 rounded-2xl justify-self-center mb-7 -rotate-5 bg-[color:var(--color-primary)] shadow-xl shadow-[#006d4e]/20">
                        <h1 className="text-2xl font-bold place-content-center text-[white]">2</h1>
                    </div>
                    <h1 className="text-2xl mb-3">Authenticate</h1>
                    <p >
                        System logs timestamp, geolocation, and device ID to ensure 100% integrity
                    </p>
                </div>

                <div className="w-full p-10 text-center justify-center">
                    <div className="grid h-15 w-15 bg-[#1c421cd5] rounded-2xl justify-self-center mb-7 rotate-5">
                        <h1 className="text-2xl font-bold place-content-center text-[white]">3</h1>
                    </div>
                    <h1 className="text-2xl mb-3">Analyze</h1>

                    <p>
                        Admins and tutor access beautiful, real-time insights from any dashboard
                    </p>
                </div>


            </div>
        </div>
    )
}

export default numberGrid
