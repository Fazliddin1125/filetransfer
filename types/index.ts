export interface ChildProps {
	children: React.ReactNode
}
export type SearchParams = { [key: string]: string | string[] | undefined }
export type Params = { booktId: string }
export interface ReturnActionType {
	user: IUser
	users: IUser[]
	failure: string
	status: number	
	error?: any
	messages: IMessage[]
	message: IMessage
	comments: IComment[]
	statistics: IStatistic[]
}
export interface IUser {
	email: string
	fullname: string
	password: string
	_id: string
	role: string
	phone: string
}
export interface IMessage{
	_id: string
	title: string
	comment: string
	recipients: [IUser]
	file: string
	recomment: string
	sender: IUser
	status: string
}
export interface IComment{
	_id: string
	sender: IUser
	text: string
	message: IMessage
	createdAt: Date
}
export interface IOrder{
	_id: string
	user: IUser
	book: IBook
	price: number
}
type IStatistic = string

// name: {type: String, required: true},
// 	overview: {type: String, required: true},
// 	author: {type: Schema.Types.ObjectId, ref: "User"},
// 	published: {type: Date},
// 	pages: {types: Number},
// 	language: {type: String},
// 	categories: [
// 		{type: String}
// 	],
// 	publisher: {type: String},
// 	ISBN:{type: String}
export interface IBook{
	cover: string
	file: string
	_id: string
	name: string,
	overview: string,
	author: IUser,
	published: Date,
	pages: number,
	language: string,
	categories: [string],
	publisher: string,
	ISBN: string,
	isfree: boolean
}