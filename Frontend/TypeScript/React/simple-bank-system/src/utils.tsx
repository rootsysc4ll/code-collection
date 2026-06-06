export interface CardType {
    balance: number
    color: string
    name: string
}

export interface Theme {
    color: string
    name:  string
}

export const cardColors = ['#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00']

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

export const defaultTheme = themes[0]