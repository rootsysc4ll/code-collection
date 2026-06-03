import { useState } from "react"
import { type CardType } from "../utils"
import { TransferSvg } from "../assets/SvgComponents"
import "../styles/TransferButton.css"
 
import TransferOverlay from "./TransferOverlay"

type TransferButtonProps = {
    cards: CardType[]
    transferQuantity: (from: CardType, to: CardType, quantity: number) => void
    showErrorMsg: (errorMsg: string) => null
}

export default function TransferButton( { cards, transferQuantity, showErrorMsg }: TransferButtonProps ) {
    const [ transferOverlayActive, setTransferOverlayActive ] = useState<boolean>(false)

    function handleTransfer(from: CardType, to: CardType, quantity: number) {
        transferQuantity(from, to, quantity)
        setTransferOverlayActive(false)
    }

    return (
        <div id="transfer-button-container" >
            <button id="transfer-button" onClick={() => setTransferOverlayActive(true)}>
                <TransferSvg color="#ffffff" />
            </button>

            {transferOverlayActive && (
                <TransferOverlay
                    setTransferOverlayActive={setTransferOverlayActive}
                    cards={cards}
                    handleTransfer={handleTransfer}
                    showErrorMsg={showErrorMsg}
                />
            )}
        </div>
    )
}