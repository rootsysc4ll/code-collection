import { useState, type Dispatch, type ReactElement, type SetStateAction } from "react";

type Message = (string | ReactElement)

interface ChatMessage {
    message: Message
    sender : string
    id     : string
}

class chatMessage implements ChatMessage {
    constructor (
        private _message: Message,
        private _sender : string,
        private _id     : string
    ) {}

    get message(): Message {
        return this._message
    }

    get sender(): string {
        return this._sender
    }

    get id(): string {
        return this._id
    }
}

interface ChatMessages {
    messages: ChatMessage[]
    setMessages: Dispatch<React.SetStateAction<ChatMessage[]>>
}

class chatMessages implements ChatMessages {
    static instance = new chatMessages()

    private constructor( 
        private _messages: ChatMessage[] = [],
        setMessages: Dispatch<SetStateAction<ChatMessage[]>> = () => {}
    ) {
        [ _messages, setMessages ] = useState<ChatMessage[]>([])
    }

    get messages(): ChatMessage[] {
        return this._messages
    }
}