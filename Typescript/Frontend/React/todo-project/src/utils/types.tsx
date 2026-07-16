export interface TodoType {
    id: number
    userId: number
    task: string
    completed: number
}

export type RGBChannelType = [number, number, number]

export interface MessageType {
    message: string
    id: string
}