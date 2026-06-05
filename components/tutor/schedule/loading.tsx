import { Skeleton } from "@/components/ui/skeleton";

export default function SessionLoading() {
    return (
        <div className="flex gap-4 w-full">

            <div className="space-y-4 w-full">

                <div className="rounded-xl border bg-card p-6">
                    <Skeleton className="h-8 w-56 mb-8" />

                    <Skeleton className="h-4 w-32 mb-3" />
                    <Skeleton className="h-10 w-20 mb-6" />

                    <Skeleton className="h-14 w-full mb-6" />

                    <div className="flex justify-center">
                        <Skeleton className="h-12 w-40 rounded-md" />
                    </div>
                </div>


                <div className="rounded-xl border bg-card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <Skeleton className="h-8 w-44" />
                        <Skeleton className="h-5 w-5 rounded-full" />
                    </div>

                    <div className="rounded-lg bg-muted p-4 mb-5">
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-5 w-28" />
                            <Skeleton className="h-8 w-16" />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-full" />
                    </div>
                </div>


                <Skeleton className="h-14 w-full rounded-lg" />
            </div>


            <div className="rounded-xl border bg-card p-6 w-full">
                <div className="flex flex-col items-center">

                    <Skeleton className="h-[270px] w-[270px] rounded-xl mb-6" />


                    <Skeleton className="h-10 w-48 rounded-full mb-8" />


                    <Skeleton className="h-12 w-72 mb-4" />


                    <div className="space-y-2 mb-10 w-full max-w-md">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-[90%] mx-auto" />
                        <Skeleton className="h-4 w-[70%] mx-auto" />
                    </div>


                    <Skeleton className="h-12 w-52 rounded-md" />
                </div>
            </div>
        </div>
    );
}