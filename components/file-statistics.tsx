"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChartIcon,
  PieChartIcon,
  LineChartIcon,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Upload,
  Share2,
  FileX,
} from "lucide-react"
import { useEffect, useState } from "react"
import { getStatistic } from "@/action/admin.action"


export function FileStatistics() {
  const[sent, setSent] = useState("0")
  const[recive, setRecive] = useState("0")
  const[rejected, setRejected] = useState("0")
  const[checked, setChecked] = useState("0")
  useEffect(() => {
      async function fetchUsers() {
        const mesres = await getStatistic()
        const statisticArray = mesres?.data?.statistics;
        if(statisticArray){
          console.log(statisticArray[0])
        }
        
       if (Array.isArray(statisticArray) && statisticArray.length >= 4) {
          setSent(statisticArray[0]?.toString() || "0"); // Raqam stringga o'tkazildi
          setRecive(statisticArray[1]?.toString() || "0");
          setRejected(statisticArray[3]?.toString() || "0");
          setChecked(statisticArray[2]?.toString() || "0");
        } 
        
      }
      fetchUsers()
    }, []);
  return (
    <main className="flex-1 p-4 md:p-6 overflow-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 gap-2">
        <h1 className="text-2xl md:text-3xl font-bold">Umumiy statistika</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        <StatCard
          title="Yuborilgan"
          value={sent}
         
          icon={<Upload className="h-5 w-5" />}
          color="green"
        />
        <StatCard
          title="Qabul qilingan"
          value={recive}
         
          icon={<Download className="h-5 w-5" />}
          color="amber"
        />
        <StatCard
          title="Tasqidlangan"
          value={checked}
          
          
          icon={<BarChartIcon className="h-5 w-5" />}
          color="primary"
        />
       
        <StatCard
          title="Bekor qilingan"
          value={rejected}
          
          icon={<FileX className="h-5 w-5" />}
          color="purple"
        />
      </div>

      {/* <div className="min-h-[calc(100vh-16rem)]">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4 md:mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2 py-2 md:py-3">
              <BarChartIcon className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2 py-2 md:py-3">
              <LineChartIcon className="h-4 w-4" />
              <span>Activity</span>
            </TabsTrigger>
            <TabsTrigger value="types" className="flex items-center gap-2 py-2 md:py-3">
              <PieChartIcon className="h-4 w-4" />
              <span>File Types</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <Card className="border-2 border-primary/20 dark:border-primary/30 h-[350px] md:h-[400px]">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle>File Activity</CardTitle>
                  <CardDescription>Uploads and downloads over time</CardDescription>
                </CardHeader>
                <CardContent className="p-0 md:pt-2">
                  <div className="h-[250px] md:h-[300px] w-full">
                    <BarChartComponent />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-500/20 dark:border-purple-500/30 h-[350px] md:h-[400px]">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle>Storage Usage</CardTitle>
                  <CardDescription>Storage used by file type</CardDescription>
                </CardHeader>
                <CardContent className="p-0 md:pt-2">
                  <div className="h-[250px] md:h-[300px] w-full">
                    <PieChartComponent />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-0">
            <Card className="border-2 border-green-500/20 dark:border-green-500/30 h-[500px] md:h-[600px]">
              <CardHeader className="p-4 md:p-6">
                <CardTitle>Activity Timeline</CardTitle>
                <CardDescription>File activity over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent className="p-0 md:pt-2">
                <div className="h-[400px] md:h-[500px] w-full">
                  <LineChartComponent />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="types" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <Card className="border-2 border-amber-500/20 dark:border-amber-500/30 h-[350px] md:h-[400px]">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle>File Types Distribution</CardTitle>
                  <CardDescription>Breakdown by file format</CardDescription>
                </CardHeader>
                <CardContent className="p-0 md:pt-2">
                  <div className="h-[250px] md:h-[300px] w-full">
                    <DonutChartComponent />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-500/20 dark:border-blue-500/30 h-[350px] md:h-[400px]">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle>Top Shared Files</CardTitle>
                  <CardDescription>Most frequently shared files</CardDescription>
                </CardHeader>
                <CardContent className="p-0 md:pt-2">
                  <div className="h-[250px] md:h-[300px] w-full">
                    <HorizontalBarChartComponent />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div> */}
    </main>
  )
}

interface StatCardProps {
  title: string
  value: string
  
  icon: React.ReactNode
  color: "primary" | "green" | "amber" | "purple"
}

function StatCard({ title, value,  icon, color }: StatCardProps) {
  const colorClasses = {
    primary: "bg-primary/10 dark:bg-primary/20 text-primary border-primary/20 dark:border-primary/30",
    green: "bg-green-500/10 dark:bg-green-500/20 text-green-500 border-green-500/20 dark:border-green-500/30",
    amber: "bg-amber-500/10 dark:bg-amber-500/20 text-amber-500 border-amber-500/20 dark:border-amber-500/30",
    purple: "bg-purple-500/10 dark:bg-purple-500/20 text-purple-500 border-purple-500/20 dark:border-purple-500/30",
  }

  return (
    <Card className={`border-2 ${colorClasses[color]}`}>
      <CardContent className="p-3 md:p-6">
        <div className="flex items-center justify-between">
          <div className={`p-2 rounded-md ${colorClasses[color]}`}>{icon}</div>
          <div
            className={`flex items-center gap-1 text-sm`}
          >
            
          </div>
        </div>
        <div className="mt-3 md:mt-4">
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-xl md:text-2xl font-bold">{value}</h3>
        </div>
      </CardContent>
    </Card>
  )
}

// Bar Chart Component
function BarChartComponent() {
  return (
    <svg className="w-full h-full" viewBox="0 0 800 400">
      {/* X and Y Axes */}
      <line x1="50" y1="350" x2="750" y2="350" stroke="currentColor" strokeOpacity="0.2" />
      <line x1="50" y1="50" x2="50" y2="350" stroke="currentColor" strokeOpacity="0.2" />

      {/* X-Axis Labels */}
      <text x="100" y="370" textAnchor="middle" className="text-xs fill-muted-foreground">
        Jan
      </text>
      <text x="200" y="370" textAnchor="middle" className="text-xs fill-muted-foreground">
        Feb
      </text>
      <text x="300" y="370" textAnchor="middle" className="text-xs fill-muted-foreground">
        Mar
      </text>
      <text x="400" y="370" textAnchor="middle" className="text-xs fill-muted-foreground">
        Apr
      </text>
      <text x="500" y="370" textAnchor="middle" className="text-xs fill-muted-foreground">
        May
      </text>
      <text x="600" y="370" textAnchor="middle" className="text-xs fill-muted-foreground">
        Jun
      </text>
      <text x="700" y="370" textAnchor="middle" className="text-xs fill-muted-foreground">
        Jul
      </text>

      {/* Y-Axis Labels */}
      <text x="40" y="350" textAnchor="end" className="text-xs fill-muted-foreground">
        0
      </text>
      <text x="40" y="280" textAnchor="end" className="text-xs fill-muted-foreground">
        50
      </text>
      <text x="40" y="210" textAnchor="end" className="text-xs fill-muted-foreground">
        100
      </text>
      <text x="40" y="140" textAnchor="end" className="text-xs fill-muted-foreground">
        150
      </text>
      <text x="40" y="70" textAnchor="end" className="text-xs fill-muted-foreground">
        200
      </text>

      {/* Grid Lines */}
      <line x1="50" y1="280" x2="750" y2="280" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="5,5" />
      <line x1="50" y1="210" x2="750" y2="210" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="5,5" />
      <line x1="50" y1="140" x2="750" y2="140" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="5,5" />
      <line x1="50" y1="70" x2="750" y2="70" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="5,5" />

      {/* Uploads Bars */}
      <rect x="80" y="200" width="40" height="150" fill="#3b82f6" fillOpacity="0.8" rx="4" />
      <rect x="180" y="170" width="40" height="180" fill="#3b82f6" fillOpacity="0.8" rx="4" />
      <rect x="280" y="150" width="40" height="200" fill="#3b82f6" fillOpacity="0.8" rx="4" />
      <rect x="380" y="120" width="40" height="230" fill="#3b82f6" fillOpacity="0.8" rx="4" />
      <rect x="480" y="100" width="40" height="250" fill="#3b82f6" fillOpacity="0.8" rx="4" />
      <rect x="580" y="80" width="40" height="270" fill="#3b82f6" fillOpacity="0.8" rx="4" />
      <rect x="680" y="70" width="40" height="280" fill="#3b82f6" fillOpacity="0.8" rx="4" />

      {/* Downloads Bars */}
      <rect x="120" y="250" width="40" height="100" fill="#10b981" fillOpacity="0.8" rx="4" />
      <rect x="220" y="220" width="40" height="130" fill="#10b981" fillOpacity="0.8" rx="4" />
      <rect x="320" y="200" width="40" height="150" fill="#10b981" fillOpacity="0.8" rx="4" />
      <rect x="420" y="180" width="40" height="170" fill="#10b981" fillOpacity="0.8" rx="4" />
      <rect x="520" y="160" width="40" height="190" fill="#10b981" fillOpacity="0.8" rx="4" />
      <rect x="620" y="140" width="40" height="210" fill="#10b981" fillOpacity="0.8" rx="4" />
      <rect x="720" y="120" width="40" height="230" fill="#10b981" fillOpacity="0.8" rx="4" />

      {/* Legend */}
      <rect x="600" y="30" width="15" height="15" fill="#3b82f6" fillOpacity="0.8" rx="2" />
      <text x="625" y="42" className="text-xs fill-current">
        Uploads
      </text>
      <rect x="700" y="30" width="15" height="15" fill="#10b981" fillOpacity="0.8" rx="2" />
      <text x="725" y="42" className="text-xs fill-current">
        Downloads
      </text>
    </svg>
  )
}

// Pie Chart Component
function PieChartComponent() {
  return (
    <svg className="w-full h-full" viewBox="0 0 400 400">
      <g transform="translate(200, 200)">
        {/* Pie Slices */}
        <path d="M0,0 L0,-150 A150,150 0 0,1 129.9,75 z" fill="#3b82f6" fillOpacity="0.9" />
        <path d="M0,0 L129.9,75 A150,150 0 0,1 -129.9,75 z" fill="#10b981" fillOpacity="0.9" />
        <path d="M0,0 L-129.9,75 A150,150 0 0,1 -75,-129.9 z" fill="#f59e0b" fillOpacity="0.9" />
        <path d="M0,0 L-75,-129.9 A150,150 0 0,1 75,-129.9 z" fill="#8b5cf6" fillOpacity="0.9" />
        <path d="M0,0 L75,-129.9 A150,150 0 0,1 0,-150 z" fill="#ec4899" fillOpacity="0.9" />

        {/* Center Circle (for donut effect) */}
        <circle cx="0" cy="0" r="60" fill="hsl(var(--background))" />
      </g>

      {/* Legend */}
      <rect x="20" y="320" width="15" height="15" fill="#3b82f6" fillOpacity="0.9" rx="2" />
      <text x="45" y="332" className="text-xs fill-current">
        Documents (40%)
      </text>

      <rect x="20" y="345" width="15" height="15" fill="#10b981" fillOpacity="0.9" rx="2" />
      <text x="45" y="357" className="text-xs fill-current">
        Images (25%)
      </text>

      <rect x="180" y="320" width="15" height="15" fill="#f59e0b" fillOpacity="0.9" rx="2" />
      <text x="205" y="332" className="text-xs fill-current">
        Videos (15%)
      </text>

      <rect x="180" y="345" width="15" height="15" fill="#8b5cf6" fillOpacity="0.9" rx="2" />
      <text x="205" y="357" className="text-xs fill-current">
        Archives (12%)
      </text>

      <rect x="300" y="320" width="15" height="15" fill="#ec4899" fillOpacity="0.9" rx="2" />
      <text x="325" y="332" className="text-xs fill-current">
        Other (8%)
      </text>
    </svg>
  )
}

// Line Chart Component
function LineChartComponent() {
  return (
    <svg className="w-full h-full" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet">
      {/* X and Y Axes */}
      <line x1="50" y1="450" x2="750" y2="450" stroke="currentColor" strokeOpacity="0.2" />
      <line x1="50" y1="50" x2="50" y2="450" stroke="currentColor" strokeOpacity="0.2" />

      {/* X-Axis Labels */}
      <text x="50" y="470" textAnchor="middle" className="text-xs fill-muted-foreground">
        1
      </text>
      <text x="120" y="470" textAnchor="middle" className="text-xs fill-muted-foreground">
        5
      </text>
      <text x="190" y="470" textAnchor="middle" className="text-xs fill-muted-foreground">
        10
      </text>
      <text x="260" y="470" textAnchor="middle" className="text-xs fill-muted-foreground">
        15
      </text>
      <text x="330" y="470" textAnchor="middle" className="text-xs fill-muted-foreground">
        20
      </text>
      <text x="400" y="470" textAnchor="middle" className="text-xs fill-muted-foreground">
        25
      </text>
      <text x="470" y="470" textAnchor="middle" className="text-xs fill-muted-foreground">
        30
      </text>
      <text x="540" y="470" textAnchor="middle" className="text-xs fill-muted-foreground">
        35
      </text>
      <text x="610" y="470" textAnchor="middle" className="text-xs fill-muted-foreground">
        40
      </text>
      <text x="680" y="470" textAnchor="middle" className="text-xs fill-muted-foreground">
        45
      </text>
      <text x="750" y="470" textAnchor="middle" className="text-xs fill-muted-foreground">
        50
      </text>

      {/* Y-Axis Labels */}
      <text x="40" y="450" textAnchor="end" className="text-xs fill-muted-foreground">
        0
      </text>
      <text x="40" y="370" textAnchor="end" className="text-xs fill-muted-foreground">
        20
      </text>
      <text x="40" y="290" textAnchor="end" className="text-xs fill-muted-foreground">
        40
      </text>
      <text x="40" y="210" textAnchor="end" className="text-xs fill-muted-foreground">
        60
      </text>
      <text x="40" y="130" textAnchor="end" className="text-xs fill-muted-foreground">
        80
      </text>
      <text x="40" y="50" textAnchor="end" className="text-xs fill-muted-foreground">
        100
      </text>

      {/* Grid Lines */}
      <line x1="50" y1="370" x2="750" y2="370" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="5,5" />
      <line x1="50" y1="290" x2="750" y2="290" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="5,5" />
      <line x1="50" y1="210" x2="750" y2="210" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="5,5" />
      <line x1="50" y1="130" x2="750" y2="130" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="5,5" />
      <line x1="50" y1="50" x2="750" y2="50" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="5,5" />

      {/* Uploads Line */}
      <path
        d="M50,400 L120,380 L190,350 L260,320 L330,280 L400,240 L470,200 L540,170 L610,140 L680,120 L750,100"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Downloads Line */}
      <path
        d="M50,420 L120,410 L190,390 L260,370 L330,340 L400,310 L470,290 L540,270 L610,250 L680,230 L750,210"
        fill="none"
        stroke="#10b981"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Shared Line */}
      <path
        d="M50,430 L120,420 L190,410 L260,390 L330,360 L400,330 L470,300 L540,260 L610,220 L680,190 L750,160"
        fill="none"
        stroke="#8b5cf6"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Data Points - Uploads */}
      <circle cx="50" cy="400" r="4" fill="#3b82f6" stroke="hsl(var(--background))" strokeWidth="1" />
      <circle cx="120" cy="380" r="4" fill="#3b82f6" stroke="hsl(var(--background))" strokeWidth="1" />
      <circle cx="190" cy="350" r="4" fill="#3b82f6" stroke="hsl(var(--background))" strokeWidth="1" />
      <circle cx="260" cy="320" r="4" fill="#3b82f6" stroke="hsl(var(--background))" strokeWidth="1" />
      <circle cx="330" cy="280" r="4" fill="#3b82f6" stroke="hsl(var(--background))" strokeWidth="1" />
      <circle cx="400" cy="240" r="4" fill="#3b82f6" stroke="hsl(var(--background))" strokeWidth="1" />
      <circle cx="470" cy="200" r="4" fill="#3b82f6" stroke="hsl(var(--background))" strokeWidth="1" />
      <circle cx="540" cy="170" r="4" fill="#3b82f6" stroke="hsl(var(--background))" strokeWidth="1" />
      <circle cx="610" cy="140" r="4" fill="#3b82f6" stroke="hsl(var(--background))" strokeWidth="1" />
      <circle cx="680" cy="120" r="4" fill="#3b82f6" stroke="hsl(var(--background))" strokeWidth="1" />
      <circle cx="750" cy="100" r="4" fill="#3b82f6" stroke="hsl(var(--background))" strokeWidth="1" />

      {/* Data Points - Downloads */}
      <circle cx="50" cy="420" r="4" fill="#10b981" stroke="hsl(var(--background))" strokeWidth="1" />
      <circle cx="120" cy="410" r="4" fill="#10b981" stroke="hsl(var(--background))" strokeWidth="1" />
      <circle cx="190" cy="390" r="4" fill="#10b981" stroke="hsl(var(--background))" strokeWidth="1" />
      <circle cx="260" cy="370" r="4" fill="#10b981" stroke="hsl(var(--background))" strokeWidth="1" />
      <circle cx="330" cy="340" r="4" fill="#10b981" stroke="hsl(var(--background))" strokeWidth="1" />
      <circle cx="400" cy="310" r="4" fill="#10b981" stroke="hsl(var(--background))" strokeWidth="1" />
      <circle cx="470" cy="290" r="4" fill="#10b981" stroke="hsl(var(--background))" strokeWidth="1" />
      <circle cx="540" cy="270" r="4" fill="#10b981" stroke="hsl(var(--background))" strokeWidth="1" />
      <circle cx="610" cy="250" r="4" fill="#10b981" stroke="hsl(var(--background))" strokeWidth="1" />
      <circle cx="680" cy="230" r="4" fill="#10b981" stroke="hsl(var(--background))" strokeWidth="1" />
      <circle cx="750" cy="210" r="4" fill="#10b981" stroke="hsl(var(--background))" strokeWidth="1" />

      {/* Data Points - Shared */}
      <circle cx="50" cy="430" r="4" fill="#8b5cf6" stroke="hsl(var(--background))" strokeWidth="1" />
      <circle cx="120" cy="420" r="4" fill="#8b5cf6" stroke="hsl(var(--background))" strokeWidth="1" />
      <circle cx="190" cy="410" r="4" fill="#8b5cf6" stroke="hsl(var(--background))" strokeWidth="1" />
      <circle cx="260" cy="390" r="4" fill="#8b5cf6" stroke="hsl(var(--background))" strokeWidth="1" />
      <circle cx="330" cy="360" r="4" fill="#8b5cf6" stroke="hsl(var(--background))" strokeWidth="1" />
      <circle cx="400" cy="330" r="4" fill="#8b5cf6" stroke="hsl(var(--background))" strokeWidth="1" />
      <circle cx="470" cy="300" r="4" fill="#8b5cf6" stroke="hsl(var(--background))" strokeWidth="1" />
      <circle cx="540" cy="260" r="4" fill="#8b5cf6" stroke="hsl(var(--background))" strokeWidth="1" />
      <circle cx="610" cy="220" r="4" fill="#8b5cf6" stroke="hsl(var(--background))" strokeWidth="1" />
      <circle cx="680" cy="190" r="4" fill="#8b5cf6" stroke="hsl(var(--background))" strokeWidth="1" />
      <circle cx="750" cy="160" r="4" fill="#8b5cf6" stroke="hsl(var(--background))" strokeWidth="1" />

      {/* Legend */}
      <rect x="550" y="30" width="15" height="15" fill="#3b82f6" rx="2" />
      <text x="575" y="42" className="text-xs fill-current">
        Uploads
      </text>
      <rect x="650" y="30" width="15" height="15" fill="#10b981" rx="2" />
      <text x="675" y="42" className="text-xs fill-current">
        Downloads
      </text>
      <rect x="550" y="60" width="15" height="15" fill="#8b5cf6" rx="2" />
      <text x="575" y="72" className="text-xs fill-current">
        Shared
      </text>
    </svg>
  )
}

// Donut Chart Component
function DonutChartComponent() {
  return (
    <svg className="w-full h-full" viewBox="0 0 400 400">
      <g transform="translate(200, 200)">
        {/* Donut Slices */}
        <path d="M0,0 L0,-150 A150,150 0 0,1 106.07,106.07 z" fill="#3b82f6" fillOpacity="0.9" />
        <path d="M0,0 L106.07,106.07 A150,150 0 0,1 -106.07,106.07 z" fill="#10b981" fillOpacity="0.9" />
        <path d="M0,0 L-106.07,106.07 A150,150 0 0,1 -150,0 z" fill="#f59e0b" fillOpacity="0.9" />
        <path d="M0,0 L-150,0 A150,150 0 0,1 -106.07,-106.07 z" fill="#8b5cf6" fillOpacity="0.9" />
        <path d="M0,0 L-106.07,-106.07 A150,150 0 0,1 0,-150 z" fill="#ec4899" fillOpacity="0.9" />

        {/* Center Circle (for donut effect) */}
        <circle cx="0" cy="0" r="100" fill="hsl(var(--background))" />

        {/* Inner stroke for better visibility in dark mode */}
        <circle cx="0" cy="0" r="100" fill="none" stroke="currentColor" strokeOpacity="0.1" />
        <circle cx="0" cy="0" r="150" fill="none" stroke="currentColor" strokeOpacity="0.1" />
      </g>

      {/* Legend */}
      <rect x="20" y="320" width="15" height="15" fill="#3b82f6" fillOpacity="0.9" rx="2" />
      <text x="45" y="332" className="text-xs fill-current">
        PDF (35%)
      </text>

      <rect x="20" y="345" width="15" height="15" fill="#10b981" fillOpacity="0.9" rx="2" />
      <text x="45" y="357" className="text-xs fill-current">
        DOCX (25%)
      </text>

      <rect x="120" y="320" width="15" height="15" fill="#f59e0b" fillOpacity="0.9" rx="2" />
      <text x="145" y="332" className="text-xs fill-current">
        JPG/PNG (20%)
      </text>

      <rect x="120" y="345" width="15" height="15" fill="#8b5cf6" fillOpacity="0.9" rx="2" />
      <text x="145" y="357" className="text-xs fill-current">
        MP4 (15%)
      </text>

      <rect x="240" y="320" width="15" height="15" fill="#ec4899" fillOpacity="0.9" rx="2" />
      <text x="265" y="332" className="text-xs fill-current">
        Other (5%)
      </text>
    </svg>
  )
}

// Horizontal Bar Chart Component
function HorizontalBarChartComponent() {
  return (
    <svg className="w-full h-full" viewBox="0 0 800 400">
      {/* X and Y Axes */}
      <line x1="150" y1="350" x2="750" y2="350" stroke="currentColor" strokeOpacity="0.2" />
      <line x1="150" y1="50" x2="150" y2="350" stroke="currentColor" strokeOpacity="0.2" />

      {/* X-Axis Labels */}
      <text x="150" y="370" textAnchor="middle" className="text-xs fill-muted-foreground">
        0
      </text>
      <text x="270" y="370" textAnchor="middle" className="text-xs fill-muted-foreground">
        20
      </text>
      <text x="390" y="370" textAnchor="middle" className="text-xs fill-muted-foreground">
        40
      </text>
      <text x="510" y="370" textAnchor="middle" className="text-xs fill-muted-foreground">
        60
      </text>
      <text x="630" y="370" textAnchor="middle" className="text-xs fill-muted-foreground">
        80
      </text>
      <text x="750" y="370" textAnchor="middle" className="text-xs fill-muted-foreground">
        100
      </text>

      {/* Y-Axis Labels (File Names) */}
      <text x="140" y="80" textAnchor="end" className="text-xs fill-current">
        Qabul qilingan
      </text>
      <text x="140" y="130" textAnchor="end" className="text-xs fill-current">
        Kutilmoqda
      </text>
      <text x="140" y="180" textAnchor="end" className="text-xs fill-current">
        Bekor qilingan
      </text>
      

      {/* Grid Lines */}
      <line x1="270" y1="50" x2="270" y2="350" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="5,5" />
      <line x1="390" y1="50" x2="390" y2="350" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="5,5" />
      <line x1="510" y1="50" x2="510" y2="350" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="5,5" />
      <line x1="630" y1="50" x2="630" y2="350" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="5,5" />

      {/* Bars */}
      <rect x="150" y="60" width="570" height="30" fill="#3b82f6" fillOpacity="0.8" rx="4" />
      <rect x="150" y="110" width="480" height="30" fill="#10b981" fillOpacity="0.8" rx="4" />
      <rect x="150" y="160" width="390" height="30" fill="#f59e0b" fillOpacity="0.8" rx="4" />
      <rect x="150" y="210" width="330" height="30" fill="#8b5cf6" fillOpacity="0.8" rx="4" />
      <rect x="150" y="260" width="270" height="30" fill="#ec4899" fillOpacity="0.8" rx="4" />
      <rect x="150" y="310" width="210" height="30" fill="#06b6d4" fillOpacity="0.8" rx="4" />

      {/* Bar Labels (Share Count) */}
      <text x="730" y="80" textAnchor="end" className="text-xs font-medium fill-white">
        95
      </text>
      <text x="640" y="130" textAnchor="end" className="text-xs font-medium fill-white">
        80
      </text>
      <text x="550" y="180" textAnchor="end" className="text-xs font-medium fill-white">
        65
      </text>
      <text x="490" y="230" textAnchor="end" className="text-xs font-medium fill-white">
        55
      </text>
      <text x="430" y="280" textAnchor="end" className="text-xs font-medium fill-white">
        45
      </text>
      <text x="370" y="330" textAnchor="end" className="text-xs font-medium fill-white">
        35
      </text>
    </svg>
  )
}

