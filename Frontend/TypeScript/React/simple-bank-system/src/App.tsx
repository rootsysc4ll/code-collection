import { useState } from 'react'
import { type CardType, cardColors } from './utils.tsx';
import './styles/App.css'

import { Cards } from './components/Cards'
import { AddCardButton } from './components/AddCardButton'

import { AddQuantityOverlay } from './components/AddQuantityOverlay.tsx';

function App() {
    const [ cards, setCards ] = useState<CardType[]>(
        [
            createCard(111),
        ]
    )
    const [ quantityOverlayActive, setQuantityOverlayActive ] = useState<boolean>(false) 


    function createCard(balance: number): CardType {
        return {
            balance: balance,
            id: crypto.randomUUID()
        }
    }

    function addCard(balance: number) {
        if (cards.length + 1 <= cardColors.length) {
            setCards([
                ...cards,
                createCard(balance)
            ])
        } else {
            console.log("There isn't more cards available")
        }
    }

    function removeCard(index: number) {
        setCards(cards.filter((_, i) => {return i !== index}))
    }

    function handleAddCard(balance: number) {
        addCard(balance)
        setQuantityOverlayActive(false)
    }

    return (
        <div id='app-container'>
            <Cards 
                cards={cards}
                removeCard={removeCard}
            />
            <AddCardButton
                setQuantityOverlayActive={setQuantityOverlayActive}
            />

            {quantityOverlayActive && (
                <AddQuantityOverlay
                    handleAddCard={handleAddCard}
                />
            )}
        </div>
    )
}

export default App