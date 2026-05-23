import { useState, type MouseEvent, type KeyboardEvent } from 'react';
import '../styles/overlays.css'

type Props = {
    handleAddCard: (balance: number) => void
}

export function AddQuantityOverlay( { handleAddCard }: Props ) {
    const [ inputValue, setInputValue ] = useState<string>('');
    
    function handleInput(event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>) {
        const input = Number(inputValue)

        const keydownCond = event.type === 'keydown' && (inputValue && !isNaN(input)) 
        const clickCond   = event.type === 'click' && (inputValue && !isNaN(input))
        if (keydownCond) {
            const keypress = event as KeyboardEvent<HTMLInputElement>
            if (keypress.key === 'Enter') handleAddCard(input)
        } else if (clickCond) {
            handleAddCard(input)
        }
    }

    return (
        <div id="add-quantity-overlay">
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