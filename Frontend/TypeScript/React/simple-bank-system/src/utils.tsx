export interface CardType {
    balance: number
    color: string
    name: string
}

export interface Theme {
    color: string
    name:  string
}

// export const cardColors = ['#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00']
const cardQuantityLimit = 10
export const possibleNames: string[] = [...Array(cardQuantityLimit)].map((_, i) => {
    return (i + 1).toString()
})

export const themes: Theme[] = [
    {
        color: '#000000',
        name:  'night'
    }, {
        color: '#ffffff',
        name:  'white'
    }, {
        color: '#f76a6a',
        name:  'coral'
    }, {
        color: '#80bc8a',
        name:  'green'
    }
]