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