import Footer from "./footer";
import Reviews from "./reviews";
import Grid from "./tools-grid";
import Marquee from "./marquee";
import Heroimage from "./heroimage";
import { Button } from "../ui/button";
import { Badge } from "@/components/ui/badge";
import NumberGrid from "./implementation-grid";
import RoleDescriptions from "./roleDecriptions";
import { BadgeCheck, Play } from "lucide-react";

const heroSection = () => {
  return (
    <main className="" >
      <div className=" w-full md:w-full">
        <section className="p-3 md:p-2 mx-auto  flex items-center gap-10 flex-wrap ">
          <div className="mx-auto grow w-full md:w-96">
            <Badge variant="outline" className="py-3 px-4 bg-muted/20 text-primary">
              <BadgeCheck />
              NEXT-GEN ATTENDANCE TRACKING
            </Badge>
            <h1 className="font-black text-[60px] leading-16 mt-6">
              Smart Oversight for{" "}
              <span className="text-primary">Modern Classrooms</span>
            </h1>

            <p className="text-[14px] mt-4 leading-6 text-secondary">
              Streamline campus operations with automated QR check- ins, real-time
              analytics, and seamless tutor verification. Designed for precision.
            </p>

            <div className="mt-4 flex gap-2">
              <Button className="cursor-pointer">Get Started for free</Button>
              <Button className="cursor-pointer" variant="ghost">
                <Play /> View Demo
              </Button>
            </div>
          </div>

          <Heroimage />

        </section>


        <section className="bg-[color:var(--color-card)] w-full md:w-full  text-center ">
          <div className="mb-15">

            <Marquee />
          </div>

          <h1 className="text-2xl md:text-4xl font-bold text-black" >
            Advanced Tools for Seamless Oversight
          </h1>
          <p>
            Precision engineering for educational institutions who demand more from their <br /> digital ecosystems.
          </p>

          <div className="mt-10">
            <Grid />
          </div>

        </section>

        <section className="mt-12 bg-[color:var(--color-card)] px-10 py-10">
          <div className="text-4xl font-bold text-black">
            <h1 className="text-center">Effortless Implementation</h1>
          </div>

          <div className=" mt-10">
            <NumberGrid />
          </div>

        </section>

        <div className="px-7 py-8 mb-7">
          <RoleDescriptions />

        </div>

        <section className="bg-[color:var(--color-card)] mt-10">
          <Reviews />
        </section>

        <div className="hidden text-center md:grid place-items-center w-full px-4 py-16">
          <div className="group relative w-full max-w-3xl overflow-hidden rounded-[32px] bg-[color:var(--color-primary)] p-10 text-white shadow-[0_26px_70px_-30px_rgba(15,23,42,0.45)] transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_32px_80px_-30px_rgba(15,23,42,0.5)]">
            <div className="flex flex-col gap-5">
              <h1 className="text-4xl font-extrabold tracking-tight">Scale Your Campus Oversight</h1>

              <p className="max-w-2xl text-[20px] leading-8 opacity-90 mx-auto">Join the future of institutional management. Setup takes minutes; results last a lifetime.</p>

              <div className="flex flex-wrap justify-center gap-4 pt-1">
                <button className="rounded-[10px] bg-white px-9 py-4 text-sm font-bold text-black transition hover:scale-[1.02] hover:shadow-xl">Start Free Trial</button>
                <button className="rounded-[10px] border border-white/30 bg-white/10 px-9 py-4 text-sm font-bold text-white transition hover:bg-white/20 hover:shadow-lg">Schedule Demo</button>
              </div>

              <p className="mt-6 text-[15px] font-semibold opacity-80">NO CREDIT CARD REQUIRED • CANCEL ANYTIME</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-[color:var(--color-card-foreground)]">
          <Footer />
        </div>
      </div>
    </main>

  );
};

export default heroSection;
