import { useState, type Dispatch, type SetStateAction, type MouseEvent, type KeyboardEvent } from "react"
import { type CardType } from "../utils"
import { ArrowsSvg, CardSvg } from "../assets/SvgComponents"

import Overlay from "./Overlay"

type TransferDropdownProps = {
    transferSide: number
    changeSelections: (transferSide: number, cardName: string) => void
    cardNames: string[]
}

type TransferSelectionProps = {
    cards: CardType[]
    selectedCardNames: string[]
    setSelectedCardNames: Dispatch<SetStateAction<string[]>>
}

type TransferOverlayProps = {
    setTransferOverlayActive: Dispatch<SetStateAction<boolean>>
    cards: CardType[]
    showErrorMsg: (errorMsg: string) => null
}

enum Sides { left, right }

function TransferDropdown( { transferSide, changeSelections, cardNames }: TransferDropdownProps ) {
    const [ dropdownIsActive, setDropdownIsActive ] = useState<boolean>(false)    
    const [ dropDownText, setDropDownText ]         = useState<string>('Select a card')
    
    function handleSelection(e: MouseEvent<HTMLSpanElement>, name: string) {
        e.stopPropagation()
        setDropDownText(`Card ${name}`)
        setDropdownIsActive(false)
        
        changeSelections(transferSide, name)
    }

    function startSelection(e: MouseEvent<HTMLSpanElement>) {
        e.stopPropagation()
        setDropdownIsActive(!dropdownIsActive)
    }

    return (
        <div id={transferSide === Sides.left ? 'left-dropdown' : 'right-dropdown'}>
            <span onClick={startSelection} className="dropdown-selection">{dropDownText}</span>

            {dropdownIsActive && (
                cardNames.map(name => {
                    return (
                        <span 
                            onClick={e => handleSelection(e, name)} 
                            className="dropdown-option"
                            key={crypto.randomUUID()}
                        >Card {name}</span>
                    )
                })
            )}
        </div>
    )
}

function TransferSelection( { cards, selectedCardNames, setSelectedCardNames }: TransferSelectionProps ) {
    function returnValidSelection(): string[] {
        const cardNames = cards.map(card => card.name)
        return cardNames.filter(name => (name !== selectedCardNames[Sides.left] && name !== selectedCardNames[Sides.right]))
    }

    function pickCardColor(side: number): string {
        return cards.filter(card => card.name === selectedCardNames[side])[0].color
    }

    function changeSelections(transferSide: number, cardName: string) {
        const newSelectedCardNames = selectedCardNames.map((selectedCard, i) => {
            if (i === transferSide) {
                return cardName
            } else {
                return selectedCard
            }
        })
        setSelectedCardNames(newSelectedCardNames)
    }
    
    return (
        <div id="transfer-selection">
            <div id="transfer-left-side">
                <span className="transfer-side-text">From</span>
                {selectedCardNames[Sides.left] === '' ? (<></>) : (
                    <CardSvg color={pickCardColor(Sides.left)}/>
                )}

                <TransferDropdown 
                    transferSide={Sides.left}
                    changeSelections={changeSelections}
                    cardNames={returnValidSelection()} 
                />
            </div>
            <ArrowsSvg color="#000000" />
            <div id="transfer-right-side">
                <span className="transfer-side-text">To</span>
                {selectedCardNames[Sides.right] === '' ? (<></>) : (
                    <CardSvg color={pickCardColor(Sides.right)}/>
                )}

                <TransferDropdown 
                    transferSide={Sides.right}
                    changeSelections={changeSelections} 
                    cardNames={returnValidSelection()} 
                />
            </div>
        </div>
    )
}

export default function TransferOverlay( { setTransferOverlayActive, cards, showErrorMsg }: TransferOverlayProps ) {
    function handleClose(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation()
        setTransferOverlayActive(false)
    }

    const [ inputValue, setInputValue ]               = useState<string>('');
    const [ selectedCardNames, setSelectedCardNames ] = useState<string[]>(['', ''])

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
                handleTranfer(input)
            }
        } else if (clickCond) {
            if (isNaN(input)) {
                showErrorMsg('Invalid entry for balance! Enter only numbers')       
            } else {
                handleTranfer(input)
            }
        }
    }

    function handleTranfer(input: number) {
        if (selectedCardNames[Sides.left] === '' || selectedCardNames[Sides.right] === '') {
            showErrorMsg("Please select both the 'From' and the 'To' cards")
        }
    }

    return (
        <Overlay
            overlayId="overlay"
            containerId="transfer-overlay-container"
            closeButtonId="transfer-close"
            handleClose={handleClose}
        >
            <TransferSelection 
                cards={cards}
                selectedCardNames={selectedCardNames}
                setSelectedCardNames={setSelectedCardNames}
            />
            <div id="transfer-input">
                <input 
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={handleInput}
                    placeholder="Enter a value to tranfer" id="transfer-input-value" type="text"
                />
                <button onClick={handleInput} id="complete-transfer-button">Transfer</button>
            </div>
        </Overlay>
    )
}