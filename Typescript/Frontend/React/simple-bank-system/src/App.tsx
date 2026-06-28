import { useEffect, useState } from 'react'
import { type CardType, possibleNames } from './utils.tsx';
import './styles/App.css'

import Cards from './components/Cards'
import AddCardButton from './components/AddCardButton'
import TransferButton from './components/TransferButton.tsx';
import ThemeSelector from './components/ThemeSelector.tsx';
import { ErrorOverlay } from './components/Overlay.tsx';

function App() {
    const [ cards, setCards ]                          = useState<CardType[]>(loadCards())
    const [ errorOverlayActive, setErrorOverlayActive] = useState<boolean>(false)
    const [ errorMsg, setErrorMsg]                     = useState<string>('')

    function createCard(balance: number, color: string): (CardType | null) {
        const usedNames = new Set(cards.map(card => card.name))
        const name      = possibleNames.find(nam => !usedNames.has(nam))
        if (!name) {
            return showErrorMsg("There isn't more cards available!")
        }

        return {
            balance,
            color,
            name
        }
    }

    function addCard(balance: number, color: string) {
        const newCard = createCard(balance, color)
        
        if (newCard !== null) {
            setCards([
                ...cards,
                newCard
            ])
        }
    }

    function removeCard(name: string) {
        setCards(cards.filter(card => {return card.name !== name}))
    }

    function transferQuantity(from: CardType, to: CardType, quantity: number) {
        const fromCard: CardType = {
            balance: (from.balance - quantity),
            color: from.color,
            name: from.name
        } 

        const toCard: CardType = {
            balance: (to.balance + quantity),
            color: to.color,
            name: to.name
        }

        const newCards = cards.map(card => {
            if (card.name === from.name) {
                return fromCard
            } else if (card.name === to.name) {
                return toCard
            } else {
                return card
            }
        })
        setCards(newCards)
    }

    function showErrorMsg(msg: string) {
        setErrorMsg(msg)
        setErrorOverlayActive(true)
        console.log(msg)
        return null
    }

    useEffect(() => localStorage.setItem('cards', JSON.stringify(cards)), [cards])

    function loadCards(): CardType[] {
        const storageItem = localStorage.getItem('cards')
        if (storageItem) {
            return JSON.parse(storageItem)
        } else {
            return [{
                balance: 500,
                color: '#000000',
                name: '1'
            },
            {
                balance: 500,
                color: '#ff0000',
                name: '2'
            }]
        }
    }

    return (
        <div id='app-container'>
            <Cards 
                cards={cards}
                removeCard={removeCard}
            />
            <div id='action-buttons'>
                <AddCardButton
                    addCard={addCard}
                    showErrorMsg={showErrorMsg}
                />
                <TransferButton
                    cards={cards}
                    transferQuantity={transferQuantity}
                    showErrorMsg={showErrorMsg}
                />
            </div>
            <ThemeSelector />

            {errorOverlayActive && (
                <ErrorOverlay 
                    errorMsg={errorMsg}
                    setErrorOverlayActive={setErrorOverlayActive}
                />  
            )}
        </div>
    )
}

export default App