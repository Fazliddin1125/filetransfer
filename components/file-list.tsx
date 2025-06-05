"use client"

import { useEffect, useState } from "react"
import { FileText, Download, Check, X, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { getMyMessage } from "@/action/admin.action"
import { IMessage } from "@/types"
import Link from "next/link"

// Sample data for demonstration


type FileListProps = {
  type: "received" | "sent" | "downloaded"
}

export function FileList() {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
  const [messages, setMessages] = useState<IMessage[]>([])
  useEffect(() => {
    async function fetchUsers() {
      const mesres = await getMyMessage()
      const messages = await mesres?.data?.messages
      setMessages(messages || [])
      console.log(messages)
    }
    fetchUsers()
  }, []);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const [newComment, setNewComment] = useState("")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-500 text-white px-3 py-1 text-sm">
            <Check className="h-3 w-3 mr-1" /> Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-500 text-white px-3 py-1 text-sm">
            <X className="h-3 w-3 mr-1" /> Rejected
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-500 text-white px-3 py-1 text-sm">
            <Clock className="h-3 w-3 mr-1" /> Pending
          </Badge>
        )
      default:
        return null
    }
  }

  const handleStatusChange = (fileId: number, newStatus: string) => {
    // In a real app, you would update the status in your database
    console.log(`Changing file ${fileId} status to ${newStatus}`)
  }

  const handleAddComment = () => {
    if (selectedFile && newComment) {
      // In a real app, you would update the comment in your database
      console.log(`Adding comment to file ${selectedFile.id}: ${newComment}`)
      setCommentDialogOpen(false)
      setNewComment("")
    }
  }



  // if (!files.length) {
  //   return <p className="text-center text-muted-foreground py-8">No files found</p>
  // }

const getCardColor = (status: string) => {
  switch (status) {
    case "checked":
      // Light mode uchun bg-green-100, Dark mode uchun bg-green-700
      return "bg-green-100 dark:bg-green-700";
    case "pending":
      // Light mode uchun bg-yellow-100, Dark mode uchun bg-amber-700 (yoki bg-yellow-700)
      // Amber ko'pincha dark modeda sariqdan yaxshiroq ko'rinadi
      return "bg-yellow-100 dark:bg-amber-700"; // Yoki dark:bg-yellow-700
    case "rejected":
      // Light mode uchun bg-red-400, Dark mode uchun bg-red-700
      return "bg-red-400 dark:bg-red-700"; // Yoki dark:bg-red-800 ko'proq to'qroq
    default:
      // Default holat uchun ham dark mode rangini qo'shamiz
      return "bg-yellow-100 dark:bg-amber-700"; // Yoki dark:bg-yellow-700
  }
}

  return (
    <div className="space-y-4">
      {[...messages].reverse().map((file) => (
        <Card key={file._id} className={`p-4 transition-colors border-2 ${getCardColor(file.status)}`}>
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-4 items-center">
            <div className="bg-primary/10 p-3 rounded-lg">
              <FileText className="h-8 w-8 text-primary" />
            </div>

            <div>
              <h3 className="font-medium text-lg">{file.title}</h3>
              <div className="text-sm flex gap-2 text-muted-foreground">
                {file.recipients.map((user) => (
                  <Badge key={user._id} >{user.fullname}</Badge>
                ))}

              </div>

              <p className="text-sm mt-1">
                <span className="font-medium">Izoh:</span> {file.comment}
              </p>
              <div className="text-sm mt-1">
                <span className="font-medium">Holat: </span>
                <Badge>
                  {file.status == "pending" && "Kutiloqda"}
                  {file.status == "rejected" && "Bekor qilingan"}
                  {file.status == "checked" && "Qabul qilingan"}
                </Badge>
              </div>

            </div>

            <div className="flex flex-wrap gap-2 justify-end">

              
              <Link href={`${server_url}/files/${file.file}`} >
                <Button>
                  <Download className="h-4 w-4 mr-2" /> Yuklab olish
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      ))}

      <Dialog open={commentDialogOpen} onOpenChange={setCommentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Comment</DialogTitle>
            <DialogDescription>Add a comment to {selectedFile?.name}</DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Enter your comment here"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={4}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setCommentDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddComment}>Save Comment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

