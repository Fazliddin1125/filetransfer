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
import { useForm } from "react-hook-form"
import { loginSchema } from "@/lib/validation"
import { z, ZodObject, ZodString, ZodTypeAny } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';


import { signIn } from 'next-auth/react'
import { login } from "@/action/auth.action"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { toast } from "@/hooks/use-toast"
export default function LoginPage() {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  function onError(message: string) {
    setIsLoading(false)
    toast({ description: message, variant: 'destructive' })
  }

 

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true)
    const res = await login(values)
    if (res?.data?.failure) {
      return onError(res.data.failure)
    }
    if (res?.serverError || res?.validationErrors || !res?.data) {
      return onError('Something went wrong')
    }
    
    if (res.data.user) {
      console.log(res.data?.user._id)
      toast({ description: 'Logged in successfully' })
      signIn('credentials', { userId: res.data.user._id, callbackUrl: '/' })
    }
  }

  return (
    <div className="container flex h-screen items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Kirish</CardTitle>
          <CardDescription>Kirish uchun email va parolingizni kiritish</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
           <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
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
                <Label>Password</Label>
                <FormControl>
                  <Input placeholder='****' type='password' disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage className='text-xs text-red-500' />
              </FormItem>
            )}
          />
          <Button type='submit' disabled={isLoading}>
            Kirish {isLoading && <Loader className='animate-spin' />}
          </Button>
        </form>
      </Form> 
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-sm text-muted-foreground mt-2">
            Accountizngiz yo'qmi?{" "}
            <Link href="/register" className="text-primary underline-offset-4 hover:underline">
              Ro'yxatdan otish
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}



