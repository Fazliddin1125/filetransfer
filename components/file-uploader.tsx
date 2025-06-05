"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Upload, Search, X, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { createMessage, getUsers, getMyMessage } from "@/action/admin.action"
import { IUser } from "@/types"

// Sample users for demonstration
const sampleUsers = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", avatar: "JD" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", avatar: "JS" },
  { id: 3, name: "Mike Johnson", email: "mike.johnson@example.com", avatar: "MJ" },
  { id: 4, name: "Sarah Williams", email: "sarah.williams@example.com", avatar: "SW" },
  { id: 5, name: "David Brown", email: "david.brown@example.com", avatar: "DB" },
  { id: 6, name: "Emily Davis", email: "emily.davis@example.com", avatar: "ED" },
  { id: 7, name: "Alex Wilson", email: "alex.wilson@example.com", avatar: "AW" },
  { id: 8, name: "Olivia Taylor", email: "olivia.taylor@example.com", avatar: "OT" },
  { id: 9, name: "Daniel Martinez", email: "daniel.martinez@example.com", avatar: "DM" },
  { id: 10, name: "Sophia Anderson", email: "sophia.anderson@example.com", avatar: "SA" },
]



export function FileUploader() {
  const [title, setTitle] = useState("")
  const [comment, setComment] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([])
  const [Users, setUsers] = useState<IUser[]>([])
  const [open, setOpen] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  useEffect(() => {
    async function fetchUsers(){
      
      const res = await getUsers()
      const users = await res?.data?.users
      setUsers(users || [])
    }
    fetchUsers()
  }, []);
  const handleSubmit =async(e: React.FormEvent) => {
    e.preventDefault()
   
    // Handle file upload logic here
  
    const formData = new FormData()
    formData.append("title", title)
    formData.append("comment", comment)
    if(file){
      formData.append("file", file)
    }else alert("File kiriting")
    
    // const selectedUsersJsonString = JSON.stringify(selectedUsers);
    const usersId: string[] = selectedUsers.map(user => user._id);
    
    formData.append("recipients", JSON.stringify(usersId))
    

    const res = await createMessage(formData)
    
    
    // Reset form
    setTitle("")
    setComment("")
    setFile(null)
    setSelectedUsers([])

    // Reset file input
    const fileInput = document.getElementById("file-upload") as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }

  const addUser = (user: IUser) => {
    if (!selectedUsers.some((selected) => selected._id === user._id)) {
      setSelectedUsers([...selectedUsers, user])
    }
    setOpen(false)
  }

  const removeUser = (userId: string) => {
    setSelectedUsers(selectedUsers.filter((user) => user._id !== userId))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-lg">
          Sarlavha
        </Label>
        <Input
          id="title"
          placeholder="Sarlavha kiriting"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="h-12 text-base"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="recipients" className="text-lg">
          Qabul qiluvchilar
        </Label>
        <div className="flex flex-col space-y-3">
          <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-background dark:bg-gray-800/50 min-h-12">
            {selectedUsers.map((user) => (
              <Badge
                key={user._id}
                variant="secondary"
                className="px-3 py-1.5 text-sm dark:bg-gray-700 dark:text-gray-200"
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    {user.fullname.charAt(0)}
                  </div>
                  <span>{user.fullname}</span>
                  <button
                    type="button"
                    onClick={() => removeUser(user._id)}
                    className="ml-1 text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-white"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">o'chirish {user.fullname}</span>
                  </button>
                </div>
              </Badge>
            ))}
          </div>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start text-muted-foreground dark:text-gray-300 h-12 dark:border-gray-600 dark:hover:bg-gray-800"
              >
                <Search className="mr-2 h-4 w-4" />
                <span>{selectedUsers.length > 0 ? "Add more recipients" : "Qirirish"}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="p-0 dark:bg-gray-800 dark:border-gray-700"
              align="start"
              side="bottom"
              sideOffset={5}
            >
              <Command className="dark:bg-gray-800">
                <CommandInput placeholder="Search users..." className="dark:bg-gray-800 dark:text-gray-200" />
                <CommandList className="dark:bg-gray-800">
                  <CommandEmpty className="dark:text-gray-400">No users found.</CommandEmpty>
                  <CommandGroup className="dark:bg-gray-800">
                    <ScrollArea className="h-[200px]">
                      {Users
                        .filter((user) => !selectedUsers.some((selected) => selected._id === user._id))
                        .map((user) => (
                          <CommandItem
                            key={user._id}
                            onSelect={() => addUser(user)}
                            className="flex items-center gap-2 py-2 dark:text-gray-200 dark:hover:bg-gray-700"
                          >
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground text-sm font-medium">
                              {user.fullname.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                              <span>{user.fullname}</span>
                              <span className="text-xs text-muted-foreground dark:text-gray-400">{user.email}</span>
                            </div>
                            <Check
                              className={`ml-auto h-4 w-4 ${
                                selectedUsers.some((selected) => selected._id === user._id) ? "opacity-100" : "opacity-0"
                              }`}
                            />
                          </CommandItem>
                        ))}
                    </ScrollArea>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="comment" className="text-lg">
          Izoh
        </Label>
        <Textarea
          id="comment"
          placeholder="Izoh qoldiring"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="text-base"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="file-upload" className="text-lg">
          Fayl tanlang
        </Label>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-accent/50 transition-colors dark:border-gray-400 dark:hover:border-primary/50 dark:hover:bg-primary/5"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 mb-3 text-primary dark:text-primary" />
              <p className="mb-2 text-base text-muted-foreground dark:text-gray-300">
                <span className="font-semibold">Yuklash uchun poring</span> 
              </p>
              {file ? (
                <p className="text-sm text-primary font-medium dark:text-primary">{file.name}</p>
              ) : (
                <p className="text-sm text-muted-foreground dark:text-gray-400">pdf, pptx, .doc(MAX. 100MB)</p>
              )}
            </div>
            <Input id="file-upload" type="file" className="hidden" onChange={handleFileChange} required />
          </label>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-14 text-lg font-medium mt-6 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
        disabled={selectedUsers.length === 0}
      >
        Upload and Send File
      </Button>
    </form>
  )
}

