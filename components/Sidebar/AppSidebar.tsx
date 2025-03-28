"use client";

import { NavMain } from "@/components/Sidebar/NavMain";
import { NavUser } from "@/components/Sidebar/NavUser";
import { TeamSwitcher } from "@/components/Sidebar/TeamSwicther";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { House, Sparkle } from "lucide-react";
import * as React from "react";

const data = {
  user: {
    name: "Jaona Ferdinah",
    email: "jaona@dev.me",
    avatar: "https://avatars.githubusercontent.com/u/111148723?v=4",
  },
  teams: [
    {
      name: "AllForOne",
      logo: Sparkle,
      plan: "Entreprise",
    },
  ],
  navMain: [
    {
      title: "Accueil",
      url: "/accueil",
      icon: House,
      isActive: true,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} variant="floating">
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
