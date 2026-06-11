import { useEffect, useState } from 'react'
import type { ChatMessageType } from './abstraction/abstraction';
import ChatMessages from './components/ChatMessages';
import { ChatMessageInput } from './components/ChatMessageInput';
import './styles/App.css'

function App() {
    const [ chatMessages, setChatMessages ] = useState<ChatMessageType[]>(loadMessages);

    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(chatMessages))
    }, [chatMessages])

    function loadMessages(): (ChatMessageType[] | []) {
        const value = localStorage.getItem('chatMessages')
        if (value) {
            return JSON.parse(value)
        } else {
            return []
        }
    }

    return (<div id='app-container'>
        <ChatMessages chatMessages={chatMessages}/>
        <ChatMessageInput chatMessages={chatMessages} setChatMessages={setChatMessages}/>
    </div>);
}

export default App