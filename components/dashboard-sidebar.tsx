"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import getCurrentUser from "@/lib/get-current-user";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";

export interface ItemsTypes {
  title: string;
  url: string;
  icon: Icon;
}

export function DashboardSidebar({ items }: { items: ItemsTypes[] }) {
  const { isLoading, error } = getCurrentUser();
  const pathname = usePathname();
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

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {isLoading ? (
              <SidebarMenu>
                {items.map((_, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuSkeleton />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            ) : !error ? (
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      className="hover:bg-muted/20 data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
                    >
                      <Link href={item.url}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            ) : (
              <SidebarMenu>
                <SidebarMenuItem className="mt-10">
                  <p className="px-3.5 text-destructive">
                    An error occured. Data could not be loaded.
                  </p>
                </SidebarMenuItem>
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
