"use client";

import {
    Calendar,
    LayoutDashboard,
    Settings,
    BookOpen,
    LocateFixed,
    SquareArrowRightEnterIcon,
    User,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
    SidebarFooter,
} from "@/components/ui/sidebar";


const content = [
    {
        title: "Dashboard",
        url: "/student-dashboard/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Attendance History",
        url: "/student-dashboard/history",
        icon: Calendar,
    },
    {
        title: "Courses",
        url: "/student-dashboard/courses",
        icon: BookOpen,
    },
    {
        title: "Live Requests",
        url: "/student-dashboard/request-class",
        icon: LocateFixed,
    },
    {
        title: "Settings",
        url: "/student-dashboard/settings",
        icon: Settings,
    },
];


export function SideBar() {
    const isLoading = false;
    return (





        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a
                                href="/dashboard"
                                className="text-xl font-bold flex items-center"
                            >
                                <img src="/logo.png" className="mr-2" />
                                <p>
                                    Attend<span className="text-primary">X</span>
                                </p>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>

                <SidebarGroup>
                    <div>
                        <SidebarGroupLabel>Students Portal</SidebarGroupLabel>
                    </div>

                    <SidebarGroupContent>
                        {isLoading ? (
                            <SidebarMenu>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <SidebarMenuItem key={index}>
                                        <SidebarMenuSkeleton />
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        ) : (
                            <SidebarMenu>
                                {content.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton className="hover:bg-muted/20" asChild>
                                            <a href={item.url}>
                                                <item.icon className="size-4" />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        )}
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="border-t-2 w-full py-5 ">
                            <SidebarMenuItem >
                                <SidebarMenuButton className="hover:bg-muted/20">
                                    <div className="flex gap-2 ">
                                        <div>
                                            <User size={20} />
                                        </div>
                                        <div>Profile</div>
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton className="hover:bg-muted/20">
                                    <div className="flex gap-2">
                                        <div>
                                            <SquareArrowRightEnterIcon size={20} />
                                        </div>
                                        <div>Logout</div>
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarFooter>
        </Sidebar>

    )
}