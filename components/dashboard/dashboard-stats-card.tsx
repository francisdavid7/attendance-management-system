import { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export interface StatsDataType {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description: string;
}

export function DashboardStatsCards({ stats }: { stats: StatsDataType[] }) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.title} className="border-0 rounded-2xl">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                {/* LEFT */}
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>

                  <h2 className="text-3xl font-bold tracking-tight">
                    {stat.value}
                  </h2>

                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>

                {/* ICON */}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
