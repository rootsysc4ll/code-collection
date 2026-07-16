import { useEffect } from "react"
import type { Dispatch, SetStateAction } from "react"
import "./Message.css"

import type { MessageType } from "../utils/types"

const displayMessageMS = 6000

type Props = {
    message: MessageType
    setMessage: Dispatch<SetStateAction<MessageType>>
}

export default function Message({ message, setMessage }: Props) {
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setMessage({ message: '', id: ''})
        }, displayMessageMS);

        return () => clearTimeout(timeoutId)
    }, [])

    return (
        <div id={message.id}>
            <span>{message.message}</span>
        </div>
    )
}