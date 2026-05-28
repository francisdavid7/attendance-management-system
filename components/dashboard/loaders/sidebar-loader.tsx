import {
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

const SidebarLoader = () => {
  return (
    <aside className="hidden h-screen w-64 border-r bg-background md:flex md:flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b p-4">
        <Skeleton className="h-8 w-8 rounded-lg" />

        <div className="space-y-2">
          <Skeleton className="h-6 w-28" />
        </div>
      </div>

      {/* Navigation */}
      <SidebarGroup>
        <SidebarMenu>
          {Array.from({ length: 6 }).map((_, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuSkeleton className="list-none" />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>

      {/* Footer */}
      <SidebarFooter className="border-t p-4 mt-auto">
        <SidebarMenu className="space-y-2">
          <Skeleton className="h-8 w-[80%]" />
          <Skeleton className="h-8 w-[80%]" />
        </SidebarMenu>
      </SidebarFooter>
    </aside>
  );
};

export default SidebarLoader;
