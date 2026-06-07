import { useState } from 'react';
import { PlusSvg } from '../assets/SvgComponents';

import '../styles/AddCardButton.css'

import AddCardOverlay from './AddCardOverlay';

type AddCardButtonProps = {
    addCard: (balance: number) => void
    showErrorMsg: (msg: string) => null
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
                <PlusSvg />
            </button>

            {quantityOverlayActive && (<AddCardOverlay
                setQuantityOverlayActive={setQuantityOverlayActive}
                handleAddCard={handleAddCard}
                showErrorMsg={showErrorMsg}
            />)}
        </div>
    )
}