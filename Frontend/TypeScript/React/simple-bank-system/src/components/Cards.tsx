import { type MouseEvent } from "react"
import { type CardType } from "../utils.tsx"
import { CardSvg } from "../assets/SvgComponents.tsx"
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
            <CardSvg color={card.color}/>
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
                        key={crypto.randomUUID()}
                    />
                )
            })}
        </div>
    )
}