"use client"

import { useEffect, useState } from "react"
import { FileText, Download, Check, X, Clock, User } from "lucide-react"

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
import { getComments, getMyMessage } from "@/action/admin.action"
import { IComment, IMessage } from "@/types"
import Link from "next/link"

// Sample data for demonstration


type FileListProps = {
  type: "received" | "sent" | "downloaded"
}

export function CommentsList() {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
  const [comments, setComments] = useState<IComment[]>([])
  useEffect(() => {
    async function fetchUsers() {
      const res= await getComments()
      console.log(res)
      const coms = await res?.data?.comments
      setComments(coms || [])
      
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
        return "bg-green-100"
      case "pending":
        return "bg-yellow-100"
      case "rejected":
        return "bg-red-400"
      default:
        return "bg-yellow-100"
    }
  }

  return (
    <div className="space-y-4">
      {[...comments].reverse().map((file) => (
        <Card key={file._id} className={`p-4 transition-colors border-2`}>
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-4 items-center">
            <div className="bg-primary/10 p-3 rounded-lg">
           <h5 className="text-sm"><b>{file.sender.fullname}</b>: {file.text}</h5>
            </div>

            <div>
              
              
              
            </div>

            <div className="flex flex-wrap gap-2 justify-end">
               
             
              <Button>{file.message.title}</Button>
              <Link href={`${server_url}/files/${file.message.file}`} >
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

