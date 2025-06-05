"use client"
import { FileText, User, Archive, BarChart, FolderIcon } from "lucide-react"

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
} from "@/components/ui/sidebar"

interface AppSidebarProps {
  onViewChange: (view: "main" | "statistics" | "about") => void
  activeView: "main" | "statistics" | "about"
}

export function AppSidebar({ onViewChange, activeView }: AppSidebarProps) {
  return (
    <div className="h-full border-r shadow-md">
      <Sidebar collapsible="icon" className="h-full">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-4 py-4 bg-primary/10 dark:bg-primary/20">
            <FileText className="h-7 w-7 text-primary" />
            <h1 className="text-xl font-bold">File Transfer</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-base">Sahifalar</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="h-12 text-base"
                    isActive={activeView === "main"}
                    onClick={() => onViewChange("main")}
                  >
                    <a href="#">
                      <div className="bg-blue-500/10 dark:bg-blue-500/20 p-2 rounded-md">
                        <FolderIcon className="h-5 w-5 text-blue-500" />
                      </div>
                      <span>Mening fayllarim</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="h-12 text-base"
                    isActive={activeView === "about"}
                    onClick={() => onViewChange("about")}
                  >
                    <a href="#">
                      <div className="bg-green-500/10 dark:bg-green-500/20 p-2 rounded-md">
                        <User className="h-5 w-5 text-green-500" />
                      </div>
                      <span>Profil</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                {/* <SidebarMenuItem>
                  <SidebarMenuButton asChild className="h-12 text-base">
                    <a href="#">
                      <div className="bg-amber-500/10 dark:bg-amber-500/20 p-2 rounded-md">
                        <Archive className="h-5 w-5 text-amber-500" />
                      </div>
                      <span>Archived Files</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem> */}

                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="h-12 text-base"
                    isActive={activeView === "statistics"}
                    onClick={() => onViewChange("statistics")}
                  >
                    <a href="#">
                      <div className="bg-purple-500/10 dark:bg-purple-500/20 p-2 rounded-md">
                        <BarChart className="h-5 w-5 text-purple-500" />
                      </div>
                      <span>Statistika</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  )
}

