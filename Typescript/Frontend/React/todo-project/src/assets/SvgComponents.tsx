import trashIcon from "../assets/trash-icon.svg"

export function TrashIcon() {
    return (
        <img className="icon trash-icon" src={trashIcon} alt="" />
    )
}

export function CompletedIcon() {
    return (
        <svg className="icon completed-icon" viewBox="0 0 45.999996 32.577931" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(-28.630561,-106.11606)">
                <path 
                    d="m -79.89827,123.07017 h 17.06148 v 93.2897 h -17.06148 z"
                 strokeWidth="1" 
                    transform="matrix(0.21933264,-0.24706586,0.22730063,0.23840505,18.180933,67.267049)"
                />
                <rect 
                    width="7.0888438" height="36.897858" x="123.29962" y="21.867491" strokeWidth="0.39299"
                    transform="matrix(0.68463868,0.72888262,-0.66941509,0.74288858,0,0)"
                />
            </g>
        </svg>
    )
}

export function ResetIcon() {
    return (
        <svg
            className="icon reset-icon"
            viewBox="0 0 68.637612 68.637612"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(-72.595646,-123.47997) rotate(-45.175251,106.91446,157.79877)">
                <rect
            
                width="16.846079"
                height="89.845757"
                x="98.491409"
                y="112.87589"
                ry="8.4230394" />
                <rect
            
                width="16.846079"
                height="89.845757"
                x="-166.22182"
                y="61.991577"
                transform="rotate(-90)"
                ry="8.4230394" />
            </g>
        </svg>
    )
}

export function PlusIcon() {
    return (
        <svg className="icon plus-icon" viewBox="0 0 89.85 89.85" xmlns="http://www.w3.org/2000/svg">
            <rect width="16.85" height="89.85" x="36.5" y="0" rx="8.42" />
            <rect width="89.85" height="16.85" x="0" y="36.5" rx="8.42" />
        </svg>       
    )
}