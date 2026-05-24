import { type CardType } from "../utils"

type CardProps = {
    card: CardType
    removeCard: (name: string) => void
}

export default function Card( {card, removeCard}: CardProps ) {
    return (
        <div className='card-container'>
            <span className='card-text'>Card {card.name}</span>
            <svg className='card-icon' width="127mm" height="65mm" viewBox="0 0 127 65" xmlns="http://www.w3.org/2000/svg">
                <rect width="127" height="65" rx="5.07" fill={card.color} />
                <rect width="127" height="12" y="14" fill="#ffffff" />
                <rect width="127" height="4.5" y="30" fill="#ffffff" />
            </svg>            
            <span className='card-text'>Balance: ${card.balance}</span>
            <img onClick={() => {removeCard(card.name)}} className="delete-icon" src="src/assets/minus.svg" alt="" />
        </div>
    )
}