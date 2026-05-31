import { useState, type Dispatch, type MouseEvent, type KeyboardEvent } from 'react';
import '../styles/AddCardButton.css'

import Overlay from './Overlay';

type AddCardOverlayProps = {
    setQuantityOverlayActive: Dispatch<React.SetStateAction<boolean>>
    handleAddCard: (balance: number) => void
    showErrorMsg: (msg: string) => null
}

type AddCardButtonProps = {
    addCard: (balance: number) => void
    showErrorMsg: (msg: string) => null
}

function AddCardOverlay( { setQuantityOverlayActive, handleAddCard, showErrorMsg }: AddCardOverlayProps ) {
    const [ inputValue, setInputValue ] = useState<string>('');
    
    function handleInput(e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>) {
        e.stopPropagation()
        const input = Number(inputValue)

        const keydownCond = e.type === 'keydown'
        const clickCond   = e.type === 'click'  
        if (keydownCond) {
            const keypress = e as KeyboardEvent<HTMLInputElement>

            if (keypress.key === 'Enter' && isNaN(input)) {
                showErrorMsg('Invalid entry for balance! Enter only numbers')       
            } else if (keypress.key === 'Enter') {
                handleAddCard(input)
            }
        } else if (clickCond) {
            if (isNaN(input)) {
                showErrorMsg('Invalid entry for balance! Enter only numbers')       
            } else {
                handleAddCard(input)
            }
        }
    }

    function handleClose(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation()
        setQuantityOverlayActive(false)
    }

    return (
        <Overlay isError={false}>
            <div id="add-quantity-container">
                add quantity:
                <input id='quantity-input' placeholder='Enter a quantity for the card' type="text" 
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                    onKeyDown={handleInput}
                />
                <button onClick={handleInput} id='add'>add</button>
                <button className="close-button" onClick={handleClose}>Close</button>
            </div>
        </Overlay>
    )
}

export default function AddCardButton( {addCard, showErrorMsg}: AddCardButtonProps ) {
    const [ quantityOverlayActive, setQuantityOverlayActive ] = useState<boolean>(false)
    
    function handleAddCard(balance: number) {
        addCard(balance)
        setQuantityOverlayActive(false)
    }

    return (
        <div id="add-button-container">
            <button onClick={() => setQuantityOverlayActive(true)} id='add-button'>
                <svg id='plus-icon' width="89.85mm" height="89.85mm" viewBox="0 0 89.85 89.85" xmlns="http://www.w3.org/2000/svg">
                    <rect width="16.85" height="89.85" x="36.5" y="0" rx="8.42" fill="#ffffff" />
                    <rect width="89.85" height="16.85" x="0" y="36.5" rx="8.42" fill="#ffffff" />
                </svg>
            </button>

            {quantityOverlayActive && (<AddCardOverlay
                setQuantityOverlayActive={setQuantityOverlayActive}
                handleAddCard={handleAddCard}
                showErrorMsg={showErrorMsg}
            />)}
        </div>
    )
}