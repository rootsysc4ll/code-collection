import { type ReactNode, type Dispatch, type MouseEvent, type SetStateAction } from "react"

import '../styles/Overlay.css'

type ErrorOverlayProps = {
    errorMsg: string
    setErrorOverlayActive: Dispatch<SetStateAction<boolean>>
}

type OverlayProps = {
    children: ReactNode
    overlayId: string
    containerId: string
    closeButtonId: string
    handleClose: (e: MouseEvent<HTMLButtonElement>) => void
}

export function ErrorOverlay( { errorMsg, setErrorOverlayActive }: ErrorOverlayProps) {
    function handleClose(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation()
        setErrorOverlayActive(false)
    }  

    return (
        <Overlay 
            overlayId="error-overlay" 
            containerId="error-message-container" 
            closeButtonId="error-close"
            handleClose={handleClose}
        >
            <span id="error-text">{errorMsg}</span>
        </Overlay>
    )
}

export default function Overlay( { children, overlayId, containerId, closeButtonId, handleClose }: OverlayProps ) {
    return (
        <div id={overlayId}>
            <div id={containerId}>
                {children}
                <button onClick={handleClose} id={closeButtonId}>Close</button>
            </div>
        </div>
    )
}