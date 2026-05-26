import { useState, type Dispatch, type MouseEvent, type KeyboardEvent } from 'react';
import '../styles/overlays.css'

type Props = {
    setQuantityOverlayActive: Dispatch<React.SetStateAction<boolean>>
    handleAddCard: (balance: number) => void
    showErrorMsg: (msg: string) => null
}

export default function AddQuantityOverlay( { handleAddCard, showErrorMsg }: Props ) {
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
        <div className='overlay'>
            <div id="add-quantity-container">
                add quantity:
                <input id='quantity-input' placeholder='Enter a quantity for the card' type="text" 
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                    onKeyDown={handleInput}
                />
                <button onClick={handleInput}>add</button>
            </div>
        </div>
    )
}