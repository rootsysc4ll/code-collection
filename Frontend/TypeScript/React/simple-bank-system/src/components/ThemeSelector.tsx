import { useState, type MouseEvent } from "react"
import { themes, defaultTheme, type Theme } from "../utils"
import { FilledCircle } from "../assets/SvgComponents"

import "../styles/ThemeSelector.css"

export default function ThemeSelector() {
    const [ currentTheme, setCurrentTheme ] = useState<Theme>(defaultTheme)
    const [ themeOptionsActive, setThemeOptionsActive ] = useState<boolean>(false)

    function handleClick(e: MouseEvent<HTMLDivElement>, theme: Theme) {
        e.stopPropagation()
        setCurrentTheme(theme)
        setThemeOptionsActive(false)    
    }

    return (
        <div onMouseEnter={() => {setThemeOptionsActive(true)}} onMouseLeave={() => {setThemeOptionsActive(false)}} id="theme-selector-container">
            <u>Current theme:</u>
            <span id="theme-name" style={{
                color: `${currentTheme.color}`
            }}>{currentTheme.name}</span>
            <FilledCircle color={currentTheme.color} />

            {themeOptionsActive && (
                <div id="theme-options-container">
                    {themes.map(theme => {
                        return (
                            <div onClick={e => handleClick(e, theme)} className="theme-option" key={crypto.randomUUID()}>
                                <span className="theme-option-text">{theme.name}</span>
                                <FilledCircle color={theme.color} />
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}