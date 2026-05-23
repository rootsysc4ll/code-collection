// import type { Props } from './../abstraction/abstraction';
import type { ReactElement } from "react";

type Props = {
    message: (string | ReactElement<HTMLImageElement>)
    sender:   string
}

export default function ChatMessage({ message, sender }: Props) {
    return (
        <div className={sender === 'user' ? 'chat-message-user' : 'chat-message-robot'}>
            {sender === 'robot' && (<img src="./src/assets/robot.png" alt="" width="50" className='chat-sender-img'/>)}
            <span className='chat-message-text'>{message}</span>
            {sender === 'user' && (<img src="./src/assets/user.png" alt="" width="50" className='chat-sender-img'/>)}
        </div>
    );
}