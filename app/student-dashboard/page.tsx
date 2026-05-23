import Navbar from "@/components/student-portal/navbar";
import Chart from "@/components/student-portal/chart";
import RecentHistory from "@/components/student-portal/table";

export default function portal() {
    return (
        <div className="md:p-6 ">

            <div>
                <Navbar />
            </div>

            <section>
                <Chart />
            </section>

            <div>
                <RecentHistory />
            </div>
        </div>

    )
}