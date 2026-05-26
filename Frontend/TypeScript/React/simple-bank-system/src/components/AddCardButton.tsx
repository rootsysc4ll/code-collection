import { useState } from "react";
import '../styles/AddCardButton.css'

import AddQuantityOverlay from "./AddQuantityOverlay";

type Props = {
    addCard: (balance: number) => void
    showErrorMsg: (msg: string) => null
}

export default function AddCardButton( {addCard, showErrorMsg}: Props ) {
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

            {quantityOverlayActive && (<AddQuantityOverlay
                setQuantityOverlayActive={setQuantityOverlayActive}
                handleAddCard={handleAddCard}
                showErrorMsg={showErrorMsg}
            />)}
        </div>
    )
}