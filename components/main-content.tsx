"use client"
import { Upload, Download, Send, Inbox } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUploader } from "@/components/file-uploader"
import { FileList } from "@/components/file-list"
import { FileListToMe } from "./filetome"
import { CommentsList } from "./comments-list"

export function MainContent() {
  return (
    <main className="flex-1 p-4 md:p-6 overflow-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Asosiy oyna</h1>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        <Card className="bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer border-2 border-primary/20 dark:bg-blue-500/20 dark:border-blue-500/30 dark:hover:bg-blue-500/30">
          <CardContent className="p-4 md:p-6 flex flex-col items-center justify-center">
            <Send className="h-8 w-8 md:h-10 md:w-10 mb-2 md:mb-4 text-primary dark:text-blue-500" />
            <h3 className="text-lg md:text-xl font-semibold text-center">Fayllar yuborish</h3>
          </CardContent>
        </Card>

        <Card className="bg-blue-500/10 hover:bg-blue-500/20 transition-colors cursor-pointer border-2 border-blue-500/20">
          <CardContent className="p-4 md:p-6 flex flex-col items-center justify-center">
            <Inbox className="h-8 w-8 md:h-10 md:w-10 mb-2 md:mb-4 text-blue-500" />
            <h3 className="text-lg md:text-xl font-semibold text-center">Fayllar qabul qilish</h3>
          </CardContent>
        </Card>

        <Card className="bg-green-500/10 hover:bg-green-500/20 transition-colors cursor-pointer border-2 border-green-500/20">
          <CardContent className="p-4 md:p-6 flex flex-col items-center justify-center">
            <Upload className="h-8 w-8 md:h-10 md:w-10 mb-2 md:mb-4 text-green-500" />
            <h3 className="text-lg md:text-xl font-semibold text-center">Yuborilgan fayllar</h3>
          </CardContent>
        </Card>

        <Card className="bg-amber-500/10 hover:bg-amber-500/20 transition-colors cursor-pointer border-2 border-amber-500/20">
          <CardContent className="p-4 md:p-6 flex flex-col items-center justify-center">
            <Download className="h-8 w-8 md:h-10 md:w-10 mb-2 md:mb-4 text-amber-500" />
            <h3 className="text-lg md:text-xl font-semibold text-center">Bildirilgan fikrlar</h3>
          </CardContent>
        </Card>
      </div>

      <div className="min-h-[calc(100vh-16rem)]">
        <Tabs defaultValue="send" className="w-full">
          {/* O'ZGARTIRISH: TabsListga pastdan bo'shliq berish */}
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6 md:mb-6">
            <TabsTrigger value="send" className="flex items-center gap-2 py-2 md:py-3">
              <Send className="h-4 w-4" />
              <span className="hidden md:inline">Fayl yuborish</span>
              <span className="md:hidden">Send</span>
            </TabsTrigger>
            <TabsTrigger value="receive" className="flex items-center gap-2 py-2 md:py-3">
              <Inbox className="h-4 w-4" />
              <span className="hidden md:inline">Qabul qilingan</span>
              <span className="md:hidden">Received</span>
            </TabsTrigger>
            <TabsTrigger value="sent" className="flex items-center gap-2 py-2 md:py-3">
              <Upload className="h-4 w-4" />
              <span className="hidden md:inline">Yuborilgan</span>
              <span className="md:hidden">Sent</span>
            </TabsTrigger>
            <TabsTrigger value="downloaded" className="flex items-center gap-2 py-2 md:py-3">
              <Download className="h-4 w-4" />
              <span className="hidden md:inline">Fikrlar</span>
              <span className="md:hidden">Fikrlar</span>
            </TabsTrigger>
          </TabsList>

          {/* O'ZGARTIRISH: TabsContentga yuqoridan padding berish */}
          <TabsContent value="send" className="pt-4 mt-6 md:pt-6">
            <Card className="border-primary/20 border-2 dark:border-blue-500/30">
              <CardHeader className="bg-primary/5 dark:bg-blue-500/10 p-4 md:p-6">
                <CardTitle>Fayl yuborish</CardTitle>
                <CardDescription>Bu yerda fayllarni yuborishingiz mumkin</CardDescription>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                {/* Agar FileUploader ichidagi elementlar ham bir-biriga yaqin bo'lsa, bu yerga space-y-4 qo'shish mumkin */}
                <div className="space-y-4"> {/* space-y-4 qo'shildi */}
                  <FileUploader />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Boshqa TabsContentlarga ham pt-4/pt-6 qo'shildi */}
          <TabsContent value="receive" className="pt-4 md:pt-6">
            <Card className="border-blue-500/20 border-2">
              <CardHeader className="bg-blue-500/5 p-4 md:p-6">
                <CardTitle>Qabul qilingan fayllar</CardTitle>
                <CardDescription>Qabul qilingan fayllarni ko'rib chiqing</CardDescription>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <FileListToMe/>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sent" className="pt-4 md:pt-6">
            <Card className="border-green-500/20 border-2">
              <CardHeader className="bg-green-500/5 p-4 md:p-6">
                <CardTitle>Yubor fayllaringiz</CardTitle>
                <CardDescription>Yuborgan fayllaringizni holatlari</CardDescription>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <FileList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="downloaded" className="pt-4 md:pt-6">
            <Card className="border-amber-500/20 border-2">
              <CardHeader className="bg-amber-500/5 p-4 md:p-6">
                <CardTitle>Bildirilgan fikrlar</CardTitle>
                {/* <CardDescription>Files you have downloaded</CardDescription> */}
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <CommentsList/>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}