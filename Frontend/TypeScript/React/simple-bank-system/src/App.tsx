import { useState } from 'react'
import { type CardType, cardColors } from './utils.tsx';
import './styles/App.css'

import Cards from './components/Cards'
import AddCardButton from './components/AddCardButton'

import AddQuantityOverlay from './components/AddQuantityOverlay.tsx';
import ErrorOverlay from './components/ErrorOverlay.tsx';

function App() {
    const [ cards, setCards ] = useState<CardType[]>([])

    const [ quantityOverlayActive, setQuantityOverlayActive ] = useState<boolean>(false)
    const [ errorOverlayActive,setErrorOverlayActive]         = useState<boolean>(false)

    const [ errorMsg, setErrorMsg] = useState<string>('')

    function createCard(balance: number): (CardType | null) {
        const usedColors    = new Set(cards.map(card => card.color))
        const usedNames     = new Set(cards.map(card => card.name))
        const possibleNames = cardColors.map((_, i) => (i + 1).toString())

        let color = cardColors.find(col => !usedColors.has(col))
        let name  = possibleNames.find(nam => !usedNames.has(nam))
        if (!color || !name) {
            return showErrorMsg("There isn't more cards available!")
        }

        return {
            balance,
            color,
            name,
            id: crypto.randomUUID()
        }
    }

    function addCard(balance: number) {
        const newCard = createCard(balance)
        
        if (newCard !== null) {
            setCards([
                ...cards,
                newCard
            ])
        }
    }

    function handleAddCard(balance: number) {
        addCard(balance)
        setQuantityOverlayActive(false)
    }

    function removeCard(name: string) {
        setCards(cards.filter(card => {return card.name !== name}))
    }

    function showErrorMsg(msg: string) {
        setErrorMsg(msg)
        setErrorOverlayActive(true)
        console.log(msg)
        return null
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

            <AddQuantityOverlay
                quantityOverlayActive={quantityOverlayActive}
                handleAddCard={handleAddCard}
                showErrorMsg={showErrorMsg}
            />

            <ErrorOverlay
                errorOverlayActive={errorOverlayActive}
                setErrorOverlayActive={setErrorOverlayActive}
                errorMsg={errorMsg}
            />    
        </div>
    )
}

export default App