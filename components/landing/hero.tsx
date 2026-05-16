import { Badge } from "@/components/ui/badge";
import { BadgeCheck, ChartArea, ChartLine, Grid2x2XIcon, Play, QrCode, QrCodeIcon } from "lucide-react";
import { Button } from "../ui/button";
import Heroimage from "./heroimage";
import Marquee from "./marquee";
import Grid from "./tools-grid";

const heroSection = () => {
  return (
    <main >


      <section className="max-w-375 mx-auto px-1 py-16 flex items-center gap-10 flex-wrap">
        <div className="mx-auto grow md:w-96">
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

      <div>
        <Marquee />
      </div>

      <section className="text-center mt-20">
        <h1 className="text-4xl font-bold text-black" >
          Advanced Tools for Seamless Oversight
        </h1>
        <p>
          Precision engineering for educational institutions who demand more from their <br /> digital ecosystems.
        </p>

        <div className="mt-10">
          <Grid />
        </div>

      </section>
    </main>

  );
};

export default heroSection;
