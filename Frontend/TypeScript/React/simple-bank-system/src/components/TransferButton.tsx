import { useState, type Dispatch, type SetStateAction, type MouseEvent } from "react"
import { type CardType } from "../utils"
import { TransferSvg, ArrowsSvg, CardSvg } from "../assets/SvgComponents"
import "../styles/TransferButton.css"

import Overlay from "./Overlay"

type TransferOverlayProps = {
    setTransferOverlayActive: Dispatch<SetStateAction<boolean>>
    cards: CardType[]
}
 
type TransferButtonProps = {
    cards: CardType[]
}

type TransferDropdownProps = {
    transferSide: number
    selectedCards: string[]
    setSelectedCards: Dispatch<SetStateAction<string[]>>
    cards: CardType[]
}

enum Sides { left, right }

function TransferDropdown( { transferSide, selectedCards, setSelectedCards, cards }: TransferDropdownProps ) {
    const [ dropdownIsActive, setDropdownIsActive ] = useState<boolean>(false)    
    const [ dropDownText, setDropDownText ]         = useState<string>('Select a card')
    
    function handleSelection(e: MouseEvent<HTMLSpanElement>, name: string) {
        e.stopPropagation()
        setDropDownText(`Card ${name}`)
        setDropdownIsActive(false)
        
        const newSelectedCards = selectedCards.map((selectedCard, i) => {
            if (i === transferSide) {
                return name
            } else {
                return selectedCard
            }
        })
        setSelectedCards(newSelectedCards)
    }

    function startSelection(e: MouseEvent<HTMLSpanElement>) {
        e.stopPropagation()
        setDropdownIsActive(!dropdownIsActive)
    }

    return (
        <div id={transferSide === Sides.left ? 'left-dropdown' : 'right-dropdown'}>
            <span onClick={startSelection} className="dropdown-selection">{dropDownText}</span>

            {dropdownIsActive && (
                cards.map(card => {
                    return (
                        <span 
                            onClick={e => handleSelection(e, card.name)} 
                            className="dropdown-option"
                            key={crypto.randomUUID()}
                        >Card {card.name}</span>
                    )
                })
            )}
        </div>
    )
}

function TransferOverlay( { setTransferOverlayActive, cards }: TransferOverlayProps ) {
    function handleClose(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation()
        setTransferOverlayActive(false)
    }

    const [ selectedCards, setSelectedCards ] = useState<string[]>(['', ''])
    
    function returnValidSelection(): CardType[] {
        return cards.filter(card => (card.name !== selectedCards[Sides.right] && card.name !== selectedCards[Sides.left]))
    }

    function pickCardColor(side: number): string {
        return cards.filter(card => card.name === selectedCards[side])[0].color
    }

    return (
        <Overlay
            overlayId="overlay"
            containerId="transfer-overlay-container"
            closeButtonId="transfer-close"
            handleClose={handleClose}
        >
            <div id="transfer-selection">
                <div id="transfer-left-side">
                    <span className="transfer-side-text">From</span>
                    {selectedCards[Sides.left] === '' ? (<></>) : (
                        <CardSvg color={pickCardColor(Sides.left)}/>
                    )}
                    <TransferDropdown 
                        transferSide={Sides.left}
                        selectedCards={selectedCards}
                        setSelectedCards={setSelectedCards} 
                        cards={returnValidSelection()} 
                    />
                </div>
                <ArrowsSvg color="#000000" />
                <div id="transfer-right-side">
                    <span className="transfer-side-text">To</span>
                    {selectedCards[Sides.right] === '' ? (<></>) : (
                        <CardSvg color={pickCardColor(Sides.right)}/>
                    )}
                    <TransferDropdown 
                        transferSide={Sides.right}
                        selectedCards={selectedCards}
                        setSelectedCards={setSelectedCards} 
                        cards={returnValidSelection()} 
                    />
                </div>
            </div>
            <div id="transfer-input">
                <input id="transfer-value" type="text" />
                <button id="complete-transfer-button">Transfer</button>
            </div>
        </Overlay>
    )
}

export default function TransferButton( { cards }: TransferButtonProps ) {
    const [ transferOverlayActive, setTransferOverlayActive ] = useState<boolean>(false)

    return (
        <div id="transfer-button-container" >
            <button id="transfer-button" onClick={() => setTransferOverlayActive(true)}>
                <TransferSvg color="#ffffff" />
            </button>

            {transferOverlayActive && (
                <TransferOverlay
                    setTransferOverlayActive={setTransferOverlayActive}
                    cards={cards}
                />
            )}
        </div>
    )
}