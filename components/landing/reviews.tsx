'use client'
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useState, useRef } from "react";
import reviewS from "@/components/landing/review";
const reviews = () => {
    const [reviews] = useState(reviewS);
    const scroll = useRef<HTMLDivElement>(null);

    const nextButton = () => {
        if (scroll.current) {
            const width = scroll.current.clientWidth;

            scroll.current.scrollBy({
                left: width,
                behavior: 'smooth'
            })
        }
    }

    const prevButton = () => {
        if (scroll.current) {
            const width = scroll.current.clientWidth;

            scroll.current.scrollBy({
                left: -width,
                behavior: 'smooth'
            })
        }
    }



    return (
        <div className="py-20 px-4 md:px-24 w-full mb-20 max-w-[1300px] mx-auto">

            <div className="text-5xl font-extrabold text-justify mb-8 leading-tight">
                Trusted by Leading <br />Educators
            </div>

            <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">

                <div className="grow text-[19px] leading-relaxed max-w-2xl">Join the elite network of institutions redefining the modern classroom experience.</div>
                <div className="flex gap-3 justify-end">
                    <button className="inline-flex items-center justify-center h-12 w-12 rounded-full border border-slate-300 bg-white text-slate-900 shadow-sm transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)]/30" onClick={prevButton}>
                        <ArrowLeft />
                    </button>
                    <button className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[color:var(--color-primary)] text-white shadow-lg transition hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)]/40" onClick={nextButton}>
                        <ArrowRight />
                    </button>
                </div>
            </section>

            <div ref={scroll} className="flex gap-4 overflow-hidden no-scrollbar">
                {reviews.map((data) => {
                    return (
                        <div className="w-[93%] md:w-[32%] shrink-0 rounded-[28px] border border-white/40 bg-white/10 p-8 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.35)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_28px_70px_-36px_rgba(15,23,42,0.3)]" style={{ background: `var(--color-${data.bg})` }} key={crypto.randomUUID()}>

                            <div className="flex gap-1 text-xs tracking-[0.08em] font-semibold uppercase">
                                <Star />
                                <Star />
                                <Star />
                                <Star />
                                <Star />
                            </div>

                            <div>
                                <p className="italic mt-7 text-base leading-relaxed">
                                    {data.quote}
                                </p>
                            </div>

                            <div className="flex items-center gap-3 mt-10">
                                <div className="h-12 w-12 overflow-hidden rounded-2xl shadow-inner">
                                    <img src={data.avatar} alt={data.name} className="h-full w-full object-cover" />
                                </div>

                                <div>
                                    <h1 className="font-bold text-sm">{data.name}</h1>
                                    <h1 className="font-semibold text-sm text-[color:var(--color-secondary)]">{data.title}</h1>
                                </div>
                            </div>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default reviews;