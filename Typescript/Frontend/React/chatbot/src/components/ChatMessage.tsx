import type { ReactElement } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(utc)
dayjs.extend(timezone)

type Props = {
    message: (string | ReactElement<HTMLImageElement>)
    sender:   string
}

export default function ChatMessage({ message, sender }: Props) {
    const time = dayjs().valueOf()

    return (
        <div className={sender === 'user' ? 'chat-message-user' : 'chat-message-robot'}>
            {sender === 'robot' && (<img src="./src/assets/robot.png" alt="" width="50" className='chat-sender-img'/>)}
            <div className='chat-message-container'>
                <span>{message}</span>
                <span className="chat-message-date">{dayjs(time).tz('Brazil/East').format('HH:mma')}</span>
            </div>
            {sender === 'user' && (<img src="./src/assets/user.png" alt="" width="50" className='chat-sender-img'/>)}
        </div>
    );
}