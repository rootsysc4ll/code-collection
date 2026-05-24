import Card from "./Card"
import { type CardType } from "../utils.tsx"
import '../styles/Cards.css'

type Props = {
    cards: CardType[]
    removeCard: (name: string) => void
}

export default function Cards( {cards, removeCard}: Props ) {
    
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