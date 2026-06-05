import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
    return (
        <div className="space-y-6">

            <div>
                <Skeleton className="h-12 w-80 mb-2" />
                <Skeleton className="h-5 w-96" />
            </div>


            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="rounded-xl border bg-card p-6 space-y-4"
                    >
                        <div className="flex justify-between items-center">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-5 w-5 rounded-full" />
                        </div>

                        <Skeleton className="h-8 w-40" />

                        <Skeleton className="h-4 w-28" />

                        {i === 2 && (
                            <>
                                <Skeleton className="h-3 w-full" />
                                <Skeleton className="h-4 w-32" />
                            </>
                        )}
                    </div>
                ))}
            </div>


            <div className="rounded-xl border bg-card">

                <div className="flex items-center justify-between p-6">
                    <Skeleton className="h-7 w-48" />
                    <Skeleton className="h-5 w-16" />
                </div>

                <div className="border-t" />


                <div className="grid grid-cols-4 px-6 py-4">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                </div>


                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={i}
                        className="grid grid-cols-4 items-center border-t px-6 py-5"
                    >
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-5 w-28" />
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-8 w-20 rounded-full" />
                    </div>
                ))}
            </div>
        </div>
    );
}