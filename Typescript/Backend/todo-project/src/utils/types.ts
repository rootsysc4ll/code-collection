import { type Request } from "express"

export interface AuthenticationBodyType {
    username: string
    password: string
}

export interface UserDBType {
    id: number
    username: string
    password: string
}

export interface TodoDBType {
    id: number
    userId: number
    task: string
    completed: boolean
}

export interface CustomRequestType extends Request {
    userId?: number
}