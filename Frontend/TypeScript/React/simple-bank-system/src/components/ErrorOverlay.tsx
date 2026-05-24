import { type Dispatch } from "react"

type Props = {
    errorOverlayActive: boolean
    setErrorOverlayActive: Dispatch<React.SetStateAction<boolean>>
    errorMsg: string
}

export default function ErrorOverlay( {errorOverlayActive, setErrorOverlayActive, errorMsg}: Props ) {
    return (
        <div className={errorOverlayActive ? 'show' : 'hide'} id="error-overlay">
            <div id="error-message-container">
                <span id="error-text">{errorMsg}</span>
                <button onClick={() => setErrorOverlayActive(false)}>Close</button>
            </div>
        </div>
    )
}