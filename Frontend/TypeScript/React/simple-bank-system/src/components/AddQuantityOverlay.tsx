import { useState, type MouseEvent, type KeyboardEvent } from 'react';
import '../styles/overlays.css'

type Props = {
    quantityOverlayActive: boolean
    handleAddCard: (balance: number) => void
    showErrorMsg: (msg: string) => null
}

export default function AddQuantityOverlay( { quantityOverlayActive, handleAddCard, showErrorMsg }: Props ) {
    const [ inputValue, setInputValue ] = useState<string>('');
    
    function handleInput(event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>) {
        const input = Number(inputValue)

        const keydownCond = event.type === 'keydown'
        const clickCond   = event.type === 'click'  
        if (keydownCond) {
            const keypress = event as KeyboardEvent<HTMLInputElement>

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
        <div className={(quantityOverlayActive ? 'show' : 'hide') + ' overlay' }>
            <div id="add-quantity-container">
                add quantity:
                <input id='quantity-input' placeholder='Enter a quantity for the card' type="text" 
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                    onKeyDown={(e) => handleInput(e)}
                />
                <button onClick={(e) => handleInput(e)}>add</button>
            </div>
        </div>
    )
}