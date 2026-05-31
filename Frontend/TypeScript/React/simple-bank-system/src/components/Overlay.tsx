import { type ReactNode, type Dispatch, type MouseEvent, type SetStateAction } from "react"
import '../styles/Overlay.css'

type ErrorOverlayProps = {
    errorMsg: string
    setErrorOverlayActive: Dispatch<SetStateAction<boolean>>
}

type OverlayProps = {
    children: ReactNode
    isError: boolean
}

export function ErrorOverlay( { errorMsg, setErrorOverlayActive }: ErrorOverlayProps) {
    function handleClose(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation()
        setErrorOverlayActive(false)
    }  

    return (
        <Overlay isError={true}>
            <div id="error-message-container">
                <span id="error-text">{errorMsg}</span>
                <button onClick={handleClose} className="close-button">Close</button>
            </div>
        </Overlay>
    )
}

export default function Overlay( { children, isError }: OverlayProps ) {
    return (
        <div className={isError ? "error-overlay" : "overlay"}>
            {children}
        </div>
    )
}