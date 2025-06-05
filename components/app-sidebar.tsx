// components/app-sidebar.tsx
"use client"
import { FileText, User, Archive, BarChart, FolderIcon } from "lucide-react"

interface AppSidebarProps {
  onViewChange: (view: "main" | "statistics" | "about") => void
  activeView: "main" | "statistics" | "about"
}

export function AppSidebar({ onViewChange, activeView }: AppSidebarProps) {
  return (
    // <<<<<<<<<<<< TEST UCHUN SODDALASHTIRILGAN KOD >>>>>>>>>>>>
    <div className="h-full w-full  p-4 flex flex-col space-y-4">
      <div className="flex items-center gap-2 px-4 py-4 bg-primary/10 dark:bg-primary/20">
        <FileText className="h-7 w-7 text-primary" />
        <h1 className="text-xl font-bold">File Transfer</h1>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Sahifalar</h2>
        <button
          className={`flex items-center gap-3 w-full p-3 rounded-md transition-colors 
            ${
            activeView === "main" && "bg-blue-100 text-blue-700" 
          }
          `}
          onClick={() => onViewChange("main")}
        >
          <FolderIcon className="h-5 w-5" />
          <span>Mening fayllarim</span>
        </button>
        <button
          className={`flex items-center gap-3 w-full p-3 rounded-md transition-colors ${
            activeView === "about" && "bg-green-100 text-green-700" 
          }`}
          onClick={() => onViewChange("about")}
        >
          <User className="h-5 w-5" />
          <span>Profil</span>
        </button>
        <button
          className={`flex items-center gap-3 w-full p-3 rounded-md transition-colors ${
            activeView === "statistics" && "bg-purple-100 text-purple-700"
          }`}
          onClick={() => onViewChange("statistics")}
        >
          <BarChart className="h-5 w-5" />
          <span>Statistika</span>
        </button>
      </div>
    </div>
    // <<<<<<<<<<<< TEST KOD TUGADI >>>>>>>>>>>>
  )
}