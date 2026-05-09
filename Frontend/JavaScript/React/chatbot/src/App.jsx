import { useEffect, useRef, useState } from 'react'
import './styles/App.css'
import spinner from './assets/loading-spinner.gif'


function ChatMessageInput( {chatMessages, setChatMessages} ) {
    const [ inputValue, setInputValue ] = useState('');
    let [ isLoading, setIsLoading ] = useState(false);

    function saveInputValue(event) {
        setInputValue(event.target.value);
    }

    function resetInputValue() {
        setInputValue('');
    }

    async function sendMessage() {
        resetInputValue();

        const newChatMessages = [
            ...chatMessages, {
                message: inputValue,
                sender: 'user',
                id: crypto.randomUUID()
            }
        ];
        setChatMessages(newChatMessages);

        setIsLoading(true);
        setChatMessages([
            ...newChatMessages, {
                message: (<img id='loading-gif' src={spinner} alt="err" />),
                sender: 'robot',
                id: crypto.randomUUID()
            }
        ]);
        const response = await Chatbot.getResponseAsync(inputValue);
        setChatMessages([
            ...newChatMessages, {
                message: response,
                sender: 'robot',
                id: crypto.randomUUID()
            }
        ]);
        setIsLoading(false);
    }

    function handleInput(event) {
        if ((event.key === 'Enter' || event.type === 'click') && (inputValue && !isLoading)) {
            sendMessage();
        } else if (event.key === 'Escape') {
            resetInputValue();
        }
    }

    return (
        <div id='message-input-container'>
            <input 
                type="text" placeholder='Send a message to Chatbot' size="30" onChange={saveInputValue} value={inputValue} onKeyDown={handleInput}
                id='message-input'
            />
            <button onClick={handleInput} id='send-button'>Send</button>
        </div>
    );
}

function ChatMessage({ message, sender }) {
    return (
        <div className={sender === 'user' ? 'chat-message-user' : 'chat-message-robot'}>
            {sender === 'robot' && (<img src="./src/assets/robot.png" alt="" width="50" className='chat-sender-img'/>)}
            <span className='chat-message-text'>{message}</span>
            {sender === 'user' && (<img src="./src/assets/user.png" alt="" width="50" className='chat-sender-img'/>)}
        </div>
    );
}

function useAutoScroll(dependencies) {
    const chatMessagesRef = useRef(null);

    useEffect(() => {
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }, [dependencies]);

    return chatMessagesRef;
}

function ChatMessages( {chatMessages} ) {
    let ref = useAutoScroll(chatMessages);

    return (
        <div id='chat-messages-container' ref={ref}>
            {chatMessages.length === 0 && (<WelcomeMessage/>)}
            {chatMessages.map(message => {
                return (<ChatMessage message={message.message} sender={message.sender} key={message.id}/>)
            })}
        </div>
    );
}

function WelcomeMessage() {
    return (
        <div id='welcome-message'>Welcome to the chatbot project! Send a message using the textbox below.</div>
    );
}

function App() {
    const [ chatMessages, setChatMessages ] = useState([]);

    return (<div id='app-container'>
        <ChatMessages chatMessages={chatMessages}/>
        <ChatMessageInput chatMessages={chatMessages} setChatMessages={setChatMessages}/>
    </div>);
}

export default App