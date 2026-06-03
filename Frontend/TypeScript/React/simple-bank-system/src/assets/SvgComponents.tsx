export function CardSvg( { color }: {color: string} ) {
    return (
        <svg className='card-icon' width="127mm" height="65mm" viewBox="0 0 127 65" xmlns="http://www.w3.org/2000/svg">
            <rect width="127" height="65" rx="5.07" fill={color} />
            <rect width="127" height="12" y="14" fill="#ffffff" />
            <rect width="127" height="4.5" y="30" fill="#ffffff" />
        </svg>
    )
}

export function PlusSvg( { color }: {color: string} ) {
    return (
        <svg id='plus-icon' width="89.85mm" height="89.85mm" viewBox="0 0 89.85 89.85" xmlns="http://www.w3.org/2000/svg">
            <rect width="16.85" height="89.85" x="36.5" y="0" rx="8.42" fill={color} />
            <rect width="89.85" height="16.85" x="0" y="36.5" rx="8.42" fill={color} />
        </svg>       
    )
}

export function TransferSvg( { color }: {color: string} ) {
    return (
        <svg id="transfer-icon" width="165.03244mm" height="77.559662mm" viewBox="0 0 165.03244 77.559662" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(-22.483781,-107.07434)">
            <g transform="translate(10.672469,-5.2916663)">
                <rect width="125" height="17.943691" x="51.843746" y="123.75318" fill={color} />
                <path d="M 107.67063,68.15604 72.374824,68.113791 37.079018,68.071542 54.763509,37.525603 72.448001,6.9796625 90.059315,37.567851 Z" fill={color} transform="matrix(-0.00116211,-0.57681024,0.66583229,-0.00100673,7.2482233,174.54014)" />
            </g>
            <g transform="translate(-10.672469)">
                <rect width="125" height="17.943691" x="-158.15625" y="-173.24683" fill={color} transform="scale(-1)" />
                <path d="M 107.67063,68.15604 72.374824,68.113791 37.079018,68.071542 54.763509,37.525603 72.448001,6.9796625 90.059315,37.567851 Z" fill={color} transform="matrix(0.00116211,0.57681024,-0.66583229,0.00100673,202.75178,122.45986)" />
            </g>
            </g>
        </svg>
    )
}

export function ArrowsSvg( { color }: {color: string} ) {
    return (
        <svg width="128.64391" height="114.28025" viewBox="0 0 128.64391 114.28025" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(-39.020519,-74.514241)">
                <rect fill={color} width="40.288151" height="8.8453865" x="-210.06612" y="2.9070101" transform="matrix(-0.76477572,-0.64429659,0.76477572,-0.64429659,0,0)" ry="4.4226933"/>
                <rect fill={color} width="126.74343" height="8.0597296" x="39.020519" y="124.22496" ry="4.0298648"/>
                <rect fill={color} width="40.288151" height="8.8453865" x="-10.904122" y="-210.90193" transform="matrix(-0.76477572,0.64429659,-0.76477572,-0.64429659,0,0)" ry="4.4226933"/>
                <rect fill={color} width="36.709473" height="8.0596771" x="-159.37325" y="11.580486" transform="rotate(-135)" ry="4.0298386"/>
                <rect fill={color} width="65.620255" height="8.0597296" x="57.97905" y="95.258331" ry="4.0298648"/>
                <rect fill={color} width="36.709473" height="8.0596771" x="-18.867239" y="-160.13483" transform="rotate(135)" ry="4.0298386"/>
                <rect fill={color} width="36.709473" height="8.0596771" x="-214.59079" y="-24.576061" transform="rotate(-135)" ry="4.0298386"/>
                <rect fill={color} width="63.888306" height="8.0597296" x="72.904831" y="159.86957" ry="4.0298648"/>
                <rect fill={color} width="36.709473" height="8.0596771" x="17.28931" y="-215.35239" transform="rotate(135)" ry="4.0298386"/>
            </g>
        </svg>       
    )
}

export function FilledCircle( { color }: {color: string} ) {
    return (
        <svg className="color-indicator" width="50mm" height="50mm" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="25" r="25" fill={color} />
        </svg>
    )
}