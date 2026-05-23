import { Card } from "./Card"
import { type CardType } from "../utils.tsx"
import '../styles/Cards.css'

type CardsProps = {
    cards: CardType[]
    removeCard: (index: number) => void
}

export function Cards( {cards, removeCard}: CardsProps ) {
    
    return (
        <div id='cards-container'>
            {cards.map((card, i) => {
                return (
                    <Card 
                        balance={card.balance}
                        index={i}
                        removeCard={removeCard}
                        key={card.id}
                    />
                )
            })}
        </div>
    )
}