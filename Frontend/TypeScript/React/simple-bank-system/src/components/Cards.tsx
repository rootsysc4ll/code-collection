import { type MouseEvent } from "react"
import { type CardType } from "../utils.tsx"
import '../styles/Cards.css'

type CardsProps = {
    cards: CardType[]
    removeCard: (name: string) => void
}

type CardProps = {
    card: CardType
    removeCard: (name: string) => void
}

function Card( { card, removeCard }: CardProps) {
    function handleDelete(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation()
        removeCard(card.name)
    }

    return (
        <div className='card-container'>
            <span className='card-text'>Card {card.name}</span>
            <svg className='card-icon' width="127mm" height="65mm" viewBox="0 0 127 65" xmlns="http://www.w3.org/2000/svg">
                <rect width="127" height="65" rx="5.07" fill={card.color} />
                <rect width="127" height="12" y="14" fill="#ffffff" />
                <rect width="127" height="4.5" y="30" fill="#ffffff" />
            </svg>
            <span className='card-text'>Balance: ${card.balance}</span>

            <button className="delete-icon-container" onClick={handleDelete}>
                <img className="delete-icon" src="src/assets/minus.svg" alt="" />
            </button>
        </div>
    )
}

export default function Cards({ cards, removeCard }: CardsProps) {
    
    return (
        <div id='cards-container'>
            {cards.map((card) => {
                return (
                    <Card
                        card={card}
                        removeCard={removeCard}
                        key={card.id}
                    />
                )
            })}
        </div>
    )
}