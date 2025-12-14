"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Users, UserPlus, Search } from "lucide-react";
import Link from "next/link";
import { useAuthRedirectQuery } from "@/utils/isuserlogin";

const AppSidebar = () => {
  const { userId, isLoading } = useAuthRedirectQuery();
  if (isLoading) return null;
  return (
    <Sidebar>
      <SidebarHeader className="pt-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="flex items-center gap-2">
                  <div className="flex-shrink-0">
                    <Link
                      href="/"
                      className="font-bold text-lg whitespace-nowrap pl-4"
                    >
                      Logo
                    </Link>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="pt-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Search className="mr-2 h-4 w-4" />
              <Link href={`/dashboard/${userId}`}> Search Voter</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton>
              <UserPlus className="mr-2 h-4 w-4" />
              <Link href={"/register"}>Register Employ</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton>
              <Users className="mr-2 h-4 w-4" />
              <Link href={"/employManagment"}> Employee Management </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
