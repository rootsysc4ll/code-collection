import { type Dispatch, type MouseEvent } from "react"

type Props = {
    setErrorOverlayActive: Dispatch<React.SetStateAction<boolean>>
    errorMsg: string
}

export default function ErrorOverlay( {setErrorOverlayActive, errorMsg}: Props ) {
    function handleClick(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation()
        setErrorOverlayActive(false)
    }

    return (
        <div id="error-overlay">
            <div id="error-message-container">
                <span id="error-text">{errorMsg}</span>
                <button onClick={handleClick}>Close</button>
            </div>
        </div>
    )
}