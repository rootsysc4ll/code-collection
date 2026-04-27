import { useState } from 'react'
import './styles/App.css'

function ChatMessageInput() {
    return (
        <div>
            <input type="text" placeholder='Send a message to Chatbot' size="30" />
            <button>Send</button>
        </div>
    );
}

function ChatMessage({ message, sender }) {
    return (
        <div>
            {sender === 'robot' && (<img src="./src/assets/robot.png" alt="" width="50" />)}
            {message}
            {sender === 'user' && (<img src="./src/assets/user.png" alt="" width="50" />)}
        </div>
    );
}

function Chat() {
    return (
        <div>
            <ChatMessage message="hellow boy!" sender="user" />
            <ChatMessage message="no" sender="robot" />
            <ChatMessage message="how dif?" sender="user" />
            <ChatMessage message="WW" sender="robot" />
            <ChatMessage message="maybe hot" sender="user" />
            <ChatMessage message="ur mom" sender="robot" />
        </div>
    );
}

function App() {
    return (<>
        <ChatMessageInput/>
        <Chat/>
    </>);
}

export default App
