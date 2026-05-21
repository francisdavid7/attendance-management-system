"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SideBar } from "@/components/student-portal/side-bar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <SideBar />
            <SidebarTrigger />
            <main className="w-full ">
                {children}
            </main>
        </SidebarProvider>
    );
}
