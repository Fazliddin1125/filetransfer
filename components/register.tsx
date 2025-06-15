"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Loader, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { registerSchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { register } from "@/lib/auth.action"
import { signIn } from "next-auth/react"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { IUser } from "@/types"
import { deleteUser } from "@/action/admin.action"

interface Props{
	users?: IUser[]
}
export default function RegisterPage({ users }:Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', phone: "", fullname: "" },
  })

  function onError(message: string) {
    setIsLoading(false)
    toast({ description: message, variant: 'destructive' })
  }

  async function onDelete(id: string) {
	const res = await deleteUser({id})
	console.log(res)
    toast({ description: "O'chirildi", variant: 'destructive' })
  }

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setIsLoading(true)
    const res = await register(values)
    console.log(res)
    if (res?.serverError || res?.validationErrors || !res?.data) {
      return onError('Something went wrong')
    }
    if (res.data.failure) {
      return onError(res.data.failure)
    }
    if (res.data.user) {

      toast({ description: 'Logged in successfully' })
      signIn('credentials', { userId: res.data.user._id, callbackUrl: '/' })
    }
  }


  return (
	<>
	<div className="container flex mt-4 mb-2 items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Ro'yxatdan o'tish</CardTitle>
          <CardDescription>Ro'yxatdan o'tish uchun formani to'ldiring</CardDescription>
        </CardHeader>
        <CardContent>

        <Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
				<FormField
                     control={form.control}
						name='fullname'
						render={({ field }) => (
							<FormItem className='space-y-0'>
								<Label>Ism Familiya</Label>
								<FormControl>
									<Input placeholder='Ism Familiya' disabled={isLoading} {...field} />
								</FormControl>
								<FormMessage className='text-xs text-red-500' />
							</FormItem>
						)}
					/>
					<FormField
                     control={form.control}
						name='phone'
						render={({ field }) => (
							<FormItem className='space-y-0'>
								<Label>Telfon raqam</Label>
								<FormControl>
									<Input placeholder='+998971619717' disabled={isLoading} {...field} />
								</FormControl>
								<FormMessage className='text-xs text-red-500' />
							</FormItem>
						)}
					/>
					<FormField
                     control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem className='space-y-0'>
								<Label>Email</Label>
								<FormControl>
									<Input placeholder='example@gmial.com' disabled={isLoading} {...field} />
								</FormControl>
								<FormMessage className='text-xs text-red-500' />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem className='space-y-'>
								<Label>Parol</Label>
								<FormControl>
									<Input placeholder='****' type='password' disabled={isLoading} {...field} />
								</FormControl>
								<FormMessage className='text-xs text-red-500' />
							</FormItem>
						)}
					/>
					<Button type='submit' disabled={isLoading}>
						Ro'yxatdan o'tish {isLoading && <Loader className='animate-spin' />}
					</Button>
				</form>
			</Form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-sm text-muted-foreground mt-2">
            Allaqachon accountingiz bormi?{" "}
            <Link href="/login" className="text-primary underline-offset-4 hover:underline">
              Kirish
            </Link>
          </div>
        </CardFooter>
      </Card>

	   
    </div>
	<table className="mx-auto mt-2 mb-2 border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border p-2">Ism Familiya</th>
          <th className="border p-2">Email</th>
   
          <th className="border p-2">Role</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.map((user) => (
            <tr key={user._id}>
              <td className="border p-2">{user.fullname}</td>
              <td className="border p-2">{user.email}</td>
             
              <td className="border p-2">{user.role}</td>
              <td className="border p-2 text-center">
                <button 
                    onClick={() => onDelete(user._id)}
                    className="bg-red-500 text-gray-50 px-2 py-1 text-center rounded-md">
                    O'chirish
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
	</>
    
  )
}
