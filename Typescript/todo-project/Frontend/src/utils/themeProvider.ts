import type { RGBChannelType } from "./types"

const baseColorRGB: RGBChannelType = [128, 43, 226]
const variationsQuant = 5
const channelShifts = [31, 10, 42]

function generateColors(): RGBChannelType[] {
    const accumulator: RGBChannelType[] = []
    
    for (let i = 0; i <= variationsQuant; i++) {
        accumulator.push([
            baseColorRGB[0] - i * channelShifts[0], 
            baseColorRGB[1] - i * channelShifts[1], 
            baseColorRGB[2] - i * channelShifts[2] 
        ])
    }
    return accumulator
}

function getDefaultTheme() {
    const colorArray = generateColors()
    
    const themeObject: Record<string, string> = {}
    colorArray.forEach((color, i) => {
        themeObject[`--color-${i + 1}`] = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
    })

    Object.entries(themeObject).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value)
    })
}

const themeProvider = {
    defaultTheme: getDefaultTheme
}

export default themeProvider