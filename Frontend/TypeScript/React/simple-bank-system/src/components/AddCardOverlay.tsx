import { useState, type Dispatch, type MouseEvent, type KeyboardEvent } from 'react';

import "../styles/AddCardOverlay.css"

import Overlay from './Overlay';

type Props = {
    setQuantityOverlayActive: Dispatch<React.SetStateAction<boolean>>
    handleAddCard: (balance: number, color: string) => void
    showErrorMsg: (msg: string) => null
}

export default function AddCardOverlay( { setQuantityOverlayActive, handleAddCard, showErrorMsg }: Props ) {
    function handleClose(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation()
        setQuantityOverlayActive(false)
    }
    
    const [ balanceInputValue, setbalanceInputValue ] = useState<string>('');
    const [ colorInputValue, setColorInputValue ]     = useState<string>('');
    
    function handleInput(e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>) {
        e.stopPropagation()
        const input = Number(balanceInputValue)

        const keydownCond = e.type === 'keydown'
        const clickCond   = e.type === 'click'  
        if (keydownCond) {
            const keypress = e as KeyboardEvent<HTMLInputElement>

            if (keypress.key === 'Enter' && isNaN(input)) {
                showErrorMsg('Invalid entry for balance! Enter only numbers')       
            } else if (keypress.key === 'Enter') {
                handleAddCard(input, colorInputValue)
            }
        } else if (clickCond) {
            if (isNaN(input)) {
                showErrorMsg('Invalid entry for balance! Enter only numbers')       
            } else {
                handleAddCard(input, colorInputValue)
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
            <input id='quantity-input' placeholder='Enter a quantity for the card' type="text" 
                onChange={(e) => setbalanceInputValue(e.target.value)}
                value={balanceInputValue}
                onKeyDown={handleInput}
            />
            <div id='color-input-container'>
                <span id='color-input-text'>Color:</span>
                <input id='color-input' type="color"
                    onChange={e => setColorInputValue(e.target.value)}
                />
            </div>
            <button onClick={handleInput} id='add-card-button'>Add</button>
        </Overlay>
    )
}