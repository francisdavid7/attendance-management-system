import { Badge } from "@/components/ui/badge";
import { BadgeCheck, Play } from "lucide-react";
import { Button } from "../ui/button";
import Heroimage from "./heroimage";

const heroSection = () => {
  return (
    <section className="max-w-375 mx-auto px-14 py-16 flex items-center gap-10 h-[90vh] flex-wrap">
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
  );
};

export default heroSection;
