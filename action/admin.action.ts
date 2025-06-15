"use server"

import { axiosClient } from "@/http/axios"
import { authOptions } from "@/lib/auth-option"
import { generateToken } from "@/lib/generate-token"
import { actionClient } from "@/lib/safe-action"
import { bookSchema, commentSchema, idSchema, searchParamsSchema, statusSchema } from "@/lib/validation"
import { ReturnActionType } from '@/types'
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"
import { comment } from "postcss"


export const getUsers = actionClient.action<ReturnActionType>(async () => {
	const session = await getServerSession(authOptions)
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.get('/api/user/getall', {
		headers: { Authorization: `Bearer ${token}` },
		
	})
    console.log(data)
	return JSON.parse(JSON.stringify(data))
})

export async function createMessage(formData: FormData) {
    try {
        
    const session = await getServerSession(authOptions)
	  const token = await generateToken(session?.currentUser?._id)
    const userId = await session?.currentUser?._id
    formData.append('author', userId || "")
    console.log(formData)
    const { data } = await axiosClient.post('/api/message/create', formData, 
        {headers: { Authorization: `Bearer ${token}` }})
    revalidatePath('/')
    return data
    } catch (error: any) {
      return { error: error?.response?.data?.message || 'Server error' }
    }
  }

export const getMyMessage = actionClient.action<ReturnActionType>(async () => {
	const session = await getServerSession(authOptions)
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.get(`/api/message/mymessages`, {
		headers: { Authorization: `Bearer ${token}` }
	})
  console.log(data)
	return JSON.parse(JSON.stringify(data))
})

export const getMessage = actionClient.action<ReturnActionType>(async () => {
	const session = await getServerSession(authOptions)
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.get(`/api/message/messages`, {
		headers: { Authorization: `Bearer ${token}` }
	})
  console.log(data)
	return JSON.parse(JSON.stringify(data))
})


export const getStatistic = actionClient.action<ReturnActionType>(async () => {
	const session = await getServerSession(authOptions)
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.get(`/api/message/statistic`, {
		headers: { Authorization: `Bearer ${token}` }
	})
  console.log(data)
	return JSON.parse(JSON.stringify(data))
})

export const getComments = actionClient.action<ReturnActionType>(async () => {
	const session = await getServerSession(authOptions)
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.get(`/api/message/comments`, {
		headers: { Authorization: `Bearer ${token}` }
	})
  console.log(data)
	return JSON.parse(JSON.stringify(data))
})


export const writeComment = actionClient.schema(commentSchema).action<ReturnActionType>(async ({parsedInput}) => {
	const session = await getServerSession(authOptions)
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.post(
    `/api/message/comment`,
    {comment: parsedInput.comment, message: parsedInput.message, touser: parsedInput.touser}, 
    {headers: { Authorization: `Bearer ${token}` }
	})
  console.log(data)
	return JSON.parse(JSON.stringify(data))
})


export const deleteUser = actionClient.schema(idSchema).action<ReturnActionType>(async ({parsedInput}) => {
	const session = await getServerSession(authOptions)
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.post(
    `/api/user/delete/${parsedInput.id}`,
	
    {headers: { Authorization: `Bearer ${token}` }
	})
	revalidatePath('/register')
	return JSON.parse(JSON.stringify(data))
})
export const changeStatus = actionClient.schema(statusSchema).action<ReturnActionType>(async ({parsedInput}) => {
	const session = await getServerSession(authOptions)
	const token = await generateToken(session?.currentUser?._id)
	const { data } = await axiosClient.post(
    `/api/message/change-status`,
    {messageId: parsedInput.messageId, newstatus: parsedInput.newstatus}, 
    {headers: { Authorization: `Bearer ${token}` }
	})
  revalidatePath("/")
	return JSON.parse(JSON.stringify(data))
})
//   export async function buyBook(formData: FormData) {
//     try {
//         const { data } = await axiosClient.post('/api/stripe/create', formData)
//         return data
//       } catch (error: any) {
//         return { error: error?.response?.data?.message || 'Server error' }
//       } 
//   }

//   export async function getCheckOrder(id: string){
//     try {
//       const {data} = await axiosClient.get(`/api/stripe/success/${id}`)
//       return data
//     } catch (error: any) {
//     return { error: error?.response?.data?.message || 'Server error' }      
//     }
//   }

//     export async function getAccountData(id: string){
//     try {
//       const {data} = await axiosClient.get(`/api/user/orders/${id}`)
//       return data 
//     } catch (error: any) {
//       console.log(error)
//     return { error: error?.response?.data?.message || 'Server error' }      
//     }
//   }

//      export async function getAuthorBooks(id: string){
//     try {
//       const session = await getServerSession(authOptions)
// 	    const token = await generateToken(session?.currentUser?._id)
//       const {data} = await axiosClient.get(`/api/books/author/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       return data 
//     } catch (error: any) {
//       console.log(error)
//     return { error: error?.response?.data?.message || 'Server error' }      
//     }
//   }

//   export const getAuthoderBooks = actionClient.schema(idSchema).action<ReturnActionType>(async ({ parsedInput }) => {
// 	const session = await getServerSession(authOptions)
// 	const token = await generateToken(session?.currentUser?._id)
// 	const { data } = await axiosClient.get(`/api/books/author${parsedInput.id}`, {
// 		headers: { Authorization: `Bearer ${token}` },
// 		params: parsedInput,
// 	})
//     console.log(data)
// 	return JSON.parse(JSON.stringify(data))
// })