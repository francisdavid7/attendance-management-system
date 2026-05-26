import {
  Activity,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";

const recentActivities = [
  {
    title: "Attendance marked for CSC 401",
    description: "2 mins ago",
    icon: CheckCircle2,
  },

  {
    title: "New student registered",
    description: "15 mins ago",
    icon: Users,
  },

  {
    title: "Web Development class started",
    description: "30 mins ago",
    icon: BookOpen,
  },

  {
    title: "Tutor uploaded course material",
    description: "1 hour ago",
    icon: Activity,
  },
];

export function DashboardAnalyticsSection() {
  return (
    <section className="grid gap-4 lg:grid-cols-7">
      {/* ATTENDANCE OVERVIEW */}
      <Card className="col-span-1 rounded-2xl border-0 lg:col-span-5 flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-lg">Attendance Overview</CardTitle>

            <CardDescription>Weekly attendance performance</CardDescription>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <ArrowUpRight className="h-4 w-4" />
            +12%
          </div>
        </CardHeader>

        <CardContent className="grow">
          {/* CHART PLACEHOLDER */}
          <div className="h-full flex items-center justify-center rounded-xl border border-dashed">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Activity className="h-5 w-5 text-primary" />
              </div>

              <p className="font-medium">Attendance Chart</p>

              <p className="text-sm text-muted-foreground">
                No data to display
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* RIGHT SIDE INSIGHTS */}
      <div className="col-span-1 flex flex-col gap-4 lg:col-span-2">
        {/* Attendance Rate */}
        <Card className="rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardDescription>Attendance Rate</CardDescription>

            <CardTitle className="text-3xl">92%</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <Progress value={92} />

            <p className="text-xs text-muted-foreground">
              Overall attendance this semester
            </p>
          </CardContent>
        </Card>

        {/* Active Classes */}
        <Card className="rounded-2xl border-0">
          <CardHeader className="pb-2">
            <CardDescription>Active Classes</CardDescription>

            <CardTitle className="text-3xl">14</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock3 className="h-4 w-4" />
              Ongoing sessions today
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RECENT ACTIVITIES */}
      <Card className="col-span-1 rounded-2xl border-0 lg:col-span-7">
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>

          <CardDescription>
            Latest actions happening across the platform
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {recentActivities.map((activity) => {
            const Icon = activity.icon;

            return (
              <div
                key={activity.title}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>

                  <div>
                    <p className="text-sm font-medium">{activity.title}</p>

                    <p className="text-xs text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                </div>

                <button className="text-sm text-primary hover:underline">
                  View
                </button>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </section>
  );
}
