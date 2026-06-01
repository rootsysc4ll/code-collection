import { useState, type Dispatch, type MouseEvent, type KeyboardEvent } from 'react';
import { PlusSvg } from '../assets/SvgComponents';
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
        <Overlay
            overlayId='overlay'
            containerId='add-quantity-container'
            closeButtonId='add-close'
            handleClose={handleClose}
        >
            add quantity:
            <input id='quantity-input' placeholder='Enter a quantity for the card' type="text" 
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                onKeyDown={handleInput}
            />
            <button onClick={handleInput} id='add'>add</button>
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
                <PlusSvg color='#ffffff' />
            </button>

            {quantityOverlayActive && (<AddCardOverlay
                setQuantityOverlayActive={setQuantityOverlayActive}
                handleAddCard={handleAddCard}
                showErrorMsg={showErrorMsg}
            />)}
        </div>
    )
}