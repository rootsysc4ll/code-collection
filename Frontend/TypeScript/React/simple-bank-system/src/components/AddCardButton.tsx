import { type Dispatch } from "react";
import '../styles/AddCardButton.css'

type Props = {
    setQuantityOverlayActive: Dispatch<React.SetStateAction<boolean>>
}

export function AddCardButton( {setQuantityOverlayActive}: Props ) {

    return (<>
        <div onClick={() => setQuantityOverlayActive(true)} id='add-button'>
            <svg id='plus-icon' width="89.85mm" height="89.85mm" viewBox="0 0 89.85 89.85" xmlns="http://www.w3.org/2000/svg">
                <rect width="16.85" height="89.85" x="36.5" y="0" rx="8.42" fill="#ffffff" />
                <rect width="89.85" height="16.85" x="0" y="36.5" rx="8.42" fill="#ffffff" />
            </svg>
        </div>
    </>)
}