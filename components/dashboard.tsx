"use client"
import { useState, useEffect } from "react"
import { Moon, Sun, LogOut, Menu, PersonStandingIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { MainContent } from "@/components/main-content"
import { FileStatistics } from "@/components/file-statistics"
import { AboutMe } from "@/components/about-me"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { signOut } from "next-auth/react"
import Link from "next/link"

export function Dashboard() {
  const { theme, setTheme } = useTheme()
  const [activeView, setActiveView] = useState<"main" | "statistics" | "about">("main")
  const [isMobile, setIsMobile] = useState(false)

  // Check if screen is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen h-screen w-full overflow-hidden">
        <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 shadow-sm">
          <div className="flex items-center">
            {isMobile ? (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-[280px]">
                  <AppSidebar
                    onViewChange={(view) => {
                      setActiveView(view)
                    }}
                    activeView={activeView}
                  />
                </SheetContent>
              </Sheet>
            ) : (
              <SidebarTrigger />
            )}
            <h1 className="text-lg font-semibold ml-2 md:ml-4">File Transfer</h1>
          </div>

          <div className="ml-auto flex items-center gap-2 md:gap-4">
            <Button
              variant="outline"
              size={isMobile ? "sm" : "lg"}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className={isMobile ? "h-8 px-2" : "h-10 px-4 rounded-lg"}
            >
              {theme === "dark" ? (
                <Sun className={isMobile ? "h-4 w-4" : "h-5 w-5 mr-2"} />
              ) : (
                <Moon className={isMobile ? "h-4 w-4" : "h-5 w-5 mr-2"} />
              )}
              {!isMobile && (theme === "dark" ? "Light Mode" : "Dark Mode")}
            </Button>
            <Link href={"/register"} ><Button> <PersonStandingIcon/> Foydalanuvchi qo'shish</Button></Link>
            <Button
              variant="destructive"
              size={isMobile ? "sm" : "lg"}
              aria-label="Log out"
              className={isMobile ? "h-8 px-2" : "h-10 px-4 rounded-lg"}
              onClick={() => signOut({ callbackUrl: '/login' })}
            >
              <LogOut className={isMobile ? "h-4 w-4" : "h-5 w-5 mr-2"} />
              {!isMobile && "Chiqish"}
            </Button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          <div className="hidden md:block h-full">
            <AppSidebar onViewChange={setActiveView} activeView={activeView} />
          </div>

          <div className="flex-1 overflow-auto">
            {activeView === "main" && <MainContent />}
            {activeView === "statistics" && <FileStatistics />}
            {activeView === "about" && <AboutMe />}
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

