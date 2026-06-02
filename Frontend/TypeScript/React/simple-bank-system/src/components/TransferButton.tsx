import { useState } from "react"
import { type CardType } from "../utils"
import { TransferSvg } from "../assets/SvgComponents"
import "../styles/TransferButton.css"
 
import TransferOverlay from "./TransferOverlay"

type TransferButtonProps = {
    cards: CardType[]
    showErrorMsg: (errorMsg: string) => null
}

export default function TransferButton( { cards, showErrorMsg }: TransferButtonProps ) {
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
                    showErrorMsg={showErrorMsg}
                />
            )}
        </div>
    )
}