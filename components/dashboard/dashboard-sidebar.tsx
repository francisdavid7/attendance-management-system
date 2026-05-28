"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { getCurrentUser } from "@/lib/actions/actions";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ComponentType } from "react";
import { SquareArrowRightEnterIcon, User } from "lucide-react";
import { toast } from "sonner";
import { LogoutUser } from "@/lib/actions/logout-user";
import SidebarLoader from "./loaders/sidebar-loader";

export interface ItemsTypes {
  title: string;
  url: string;
  icon: ComponentType<{ className?: string }>;
}

export function DashboardSidebar({ items }: { items: ItemsTypes[] }) {
  const { isLoading, error } = getCurrentUser();
  const pathname = usePathname();

  if (isLoading) return <SidebarLoader />;

  const handleLogout = () => {
    try {
      LogoutUser();
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error(error.messsage);
    }
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu className="py-2">
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

      <SidebarContent className="flex flex-col">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      className="hover:bg-muted/20 data-[active=true]:bg-muted/60 data-[active=true]:text-primary data-[active=true]:font-bold transition-all"
                    >
                      <Link href={item.url}>
                        <Icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarFooter className="mt-auto">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="border-t-2 w-full py-5 ">
                <SidebarMenuItem>
                  <SidebarMenuButton className="hover:bg-muted/20 cursor-pointer">
                    <div className="flex gap-2 ">
                      <div>
                        <User size={20} />
                      </div>
                      <div>Profile</div>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={handleLogout}
                    className="hover:bg-muted/20 cursor-pointer"
                  >
                    <div className="flex gap-2">
                      <SquareArrowRightEnterIcon size={20} />
                      <p>Logout</p>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
