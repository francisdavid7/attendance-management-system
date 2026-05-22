import Navbar from "@/components/student-portal/navbar"
import Setting from "@/components/student-portal/settings.tsx/settings"
export default function Settings() {
    return (
        <div>
            <section className="mt-6">
                <Navbar />
            </section>

            <div className="mb-10">
                <Setting />
            </div>
        </div>
    )
}