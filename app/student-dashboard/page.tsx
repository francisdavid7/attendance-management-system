import Navbar from "@/components/student-portal/navbar"
import Chart from "@/components/student-portal/chart"
export default function portal() {
    return (
        <div>
            
            <div className="justify-self-end ">
                <Navbar />
            </div>

            <div>
                <Chart />
            </div>
        </div>

    )
}