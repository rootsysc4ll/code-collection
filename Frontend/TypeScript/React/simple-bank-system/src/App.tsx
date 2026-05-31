import { useState } from 'react'
import { type CardType, cardColors } from './utils.tsx';
import './styles/App.css'

import Cards from './components/Cards'
import AddCardButton from './components/AddCardButton'
import TransferButton from './components/TransferButton.tsx';
import { ErrorOverlay } from './components/Overlay.tsx';

function App() {
    const [ cards, setCards ] = useState<CardType[]>([
        {
            balance: 111,
            color: cardColors[0],
            name: '1',
            id: crypto.randomUUID()
        }
    ])

    const [ errorOverlayActive, setErrorOverlayActive] = useState<boolean>(false)
    const [ errorMsg, setErrorMsg]                     = useState<string>('')

    function createCard(balance: number): (CardType | null) {
        const usedColors    = new Set(cards.map(card => card.color))
        const usedNames     = new Set(cards.map(card => card.name))
        const possibleNames = cardColors.map((_, i) => (i + 1).toString())

        const color = cardColors.find(col => !usedColors.has(col))
        const name  = possibleNames.find(nam => !usedNames.has(nam))
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
                addCard={addCard}
                showErrorMsg={showErrorMsg}
            />
            <TransferButton
            
            />

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

{/* <div style={{
    marginLeft: '20px',
    position: 'relative'
}}>
    <button onClick={() => setClicked(!clicked)}>Click to open dropdown</button>
    <div style={(clicked ? {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        left: '20px'
    } : {
        position: 'absolute',
        display: 'none',
        flexDirection: 'column'
    })}>
        <span style={{
            backgroundColor: 'white',
            color: 'black'
        }}>Item1</span>
        <span style={{
            backgroundColor: 'white',
            color: 'black'
        }}>Item2</span>
        <span style={{
            backgroundColor: 'white',
            color: 'black'
        }}>Item3</span>
    </div>
</div> */}