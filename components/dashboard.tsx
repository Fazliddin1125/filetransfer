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
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet" // Import SheetTitle
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
             // dashboard.tsx (faqat SheetContent qismi)
<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon" className="md:hidden">
      <Menu className="h-5 w-5" />
      <span className="sr-only">Menyuni almashtirish</span>
    </Button>
  </SheetTrigger>
  {/* O'ZGARISH: `SheetContent` ga aniq kenglik berildi va p-0 saqlandi */}
  {/* Bu width sizning rasmga mos keladigan kenglikni berishi kerak. */}
  <SheetContent side="left" className="w-[280px] h-full p-0 bg-background"> {/* w-[280px] qayta qo'shildi */}
    <SheetTitle className="sr-only">Asosiy Menyusi</SheetTitle>
    <AppSidebar
      onViewChange={(view) => {
        setActiveView(view)
        // Agar mobil menyu yopilishi kerak bo'lsa, bu yerda SheetClose triggerini chaqirishingiz mumkin.
        // open={false} ni Sheet ga o'tkazish kerak bo'ladi
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
              aria-label="Mavzuni o'zgartirish"
              className={isMobile ? "h-8 px-2" : "h-10 px-4 rounded-lg"}
            >
              {theme === "dark" ? (
                <Sun className={isMobile ? "h-4 w-4" : "h-5 w-5 mr-2"} />
              ) : (
                <Moon className={isMobile ? "h-4 w-4" : "h-5 w-5 mr-2"} />
              )}
              {!isMobile && (theme === "dark" ? "Yorug' rejim" : "Qorong'u rejim")}
            </Button>
            <Link href={"/register"} ><Button> <PersonStandingIcon/> Foydalanuvchi qo'shish</Button></Link>
            <Button
              variant="destructive"
              size={isMobile ? "sm" : "lg"}
              aria-label="Chiqish"
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