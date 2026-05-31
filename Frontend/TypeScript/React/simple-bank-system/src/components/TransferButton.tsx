import { useState, type Dispatch, type SetStateAction, type MouseEvent } from "react"
import "../styles/TransferButton.css"

type TransferOverlayProps = {
    setTransferOverlayActive: Dispatch<SetStateAction<boolean>>
}

function TransferOverlay( { setTransferOverlayActive }: TransferOverlayProps ) {
    function handleClose(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation()
        setTransferOverlayActive(false)
    }
    
    return (
        <div className="overlay">
            <div id="transfer-overlay-container">
                <button id="transfer-close" onClick={handleClose}>Close</button>
            </div>
        </div>
    )
}

export default function TransferButton() {
    const [ transferOverlayActive, setTransferOverlayActive ] = useState<boolean>(false)

    return (
        <div id="transfer-button-container" >
            <button id="transfer-button" onClick={() => setTransferOverlayActive(true)}>
                <svg
                    id="transfer-icon"
                    width="165.03244mm"
                    height="77.559662mm"
                    viewBox="0 0 165.03244 77.559662"
                    xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(-22.483781,-107.07434)">
                    <g transform="translate(10.672469,-5.2916663)">
                    <rect
                        width="125"
                        height="17.943691"
                        x="51.843746"
                        y="123.75318"
                        fill="#ffffff" />
                    <path
                        d="M 107.67063,68.15604 72.374824,68.113791 37.079018,68.071542 54.763509,37.525603 72.448001,6.9796625 90.059315,37.567851 Z"
                        fill="#ffffff"
                        transform="matrix(-0.00116211,-0.57681024,0.66583229,-0.00100673,7.2482233,174.54014)" />
                    </g>
                    <g transform="translate(-10.672469)">
                    <rect
                        width="125"
                        height="17.943691"
                        x="-158.15625"
                        y="-173.24683"
                        fill="#ffffff"
                        transform="scale(-1)" />
                    <path
                        d="M 107.67063,68.15604 72.374824,68.113791 37.079018,68.071542 54.763509,37.525603 72.448001,6.9796625 90.059315,37.567851 Z"
                        fill="#ffffff"
                        transform="matrix(0.00116211,0.57681024,-0.66583229,0.00100673,202.75178,122.45986)" />
                    </g>
                </g>
                </svg>
            </button>

            {transferOverlayActive && (
                <TransferOverlay
                    setTransferOverlayActive={setTransferOverlayActive}
                />
            )}
        </div>
    )
}