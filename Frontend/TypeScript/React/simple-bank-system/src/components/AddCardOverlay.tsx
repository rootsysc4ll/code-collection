import { useState, type Dispatch, type MouseEvent, type KeyboardEvent } from 'react';

import "../styles/AddCardOverlay.css"

import Overlay from './Overlay';

type Props = {
    setQuantityOverlayActive: Dispatch<React.SetStateAction<boolean>>
    handleAddCard: (balance: number) => void
    showErrorMsg: (msg: string) => null
}

export default function AddCardOverlay( { setQuantityOverlayActive, handleAddCard, showErrorMsg }: Props ) {
    function handleClose(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation()
        setQuantityOverlayActive(false)
    }
    
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

    return (
        <Overlay
            overlayId='overlay'
            containerId='add-quantity-container'
            closeButtonId='add-close'
            handleClose={handleClose}
        >
            <div id='add-card-main'>
                <input id='quantity-input' placeholder='Enter a quantity for the card' type="text" 
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                    onKeyDown={handleInput}
                />
                <button onClick={handleInput} id='add-card-button'>Add</button>
            </div>
        </Overlay>
    )
}