import { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import type { ChatMessageType } from "../abstraction/abstraction";

type Props = {
    chatMessages: ChatMessageType[]
}

function useAutoScroll(dependencies: ChatMessageType[]) {
    const chatMessagesRef = useRef<HTMLDivElement>(null!);

    useEffect(() => {
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }, [dependencies]);

    return chatMessagesRef;
}

function WelcomeMessage() {
    return (
        <div id='welcome-message'>Welcome to the chatbot project! Send a message using the textbox below.</div>
    );
}

export default function ChatMessages( {chatMessages}: Props ) {
    const ref = useAutoScroll(chatMessages);

    return (
        <div id='chat-messages-container' ref={ref}>
            {chatMessages.length === 0 && (<WelcomeMessage/>)}
            {chatMessages.map(message => {
                return (<ChatMessage message={message.message} sender={message.sender} key={message.id}/>)
            })}
        </div>
    );
}