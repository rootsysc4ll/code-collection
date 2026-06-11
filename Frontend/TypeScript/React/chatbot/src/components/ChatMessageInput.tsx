import { useEffect, useState, type ChangeEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { ChatMessageType } from "../abstraction/abstraction";
import spinner from './../assets/loading-spinner.gif'
import { Chatbot, chatbot } from "supersimpledev";

type Props = {
    chatMessages: ChatMessageType[]
    setChatMessages: React.Dispatch<React.SetStateAction<ChatMessageType[]>>
}

export function ChatMessageInput( {chatMessages, setChatMessages}: Props ) {
    useEffect(() => {
        chatbot.addResponses({
            poggers: 'a'
        })
    }, []) 

    const [ inputValue, setInputValue ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);

    function saveInputValue(event: ChangeEvent<HTMLInputElement>) {
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

    function handleInput(event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>) {
        if (event.type === 'keydown' && (inputValue && !isLoading)) {
            const keypress = event as KeyboardEvent<HTMLInputElement>
            if (keypress.key === 'Enter') sendMessage();
        } else if (event.type === 'click' && (inputValue && !isLoading)) {
            sendMessage();
        }
    }

    function clearMessages(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation()
        setChatMessages([])
    }

    return (
        <div id='message-input-container'>
            <input 
                type="text" placeholder='Send a message to Chatbot' size={30} onChange={saveInputValue} value={inputValue} onKeyDown={handleInput}
                id='message-input'
            />
            <button onClick={handleInput} id='send-button'>Send</button>
            <button onClick={clearMessages} id='clear-button' >Clear</button>
        </div>
    );
}