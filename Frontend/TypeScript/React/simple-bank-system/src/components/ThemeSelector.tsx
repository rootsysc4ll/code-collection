import { useState, type MouseEvent } from "react"
import { themes, type Theme } from "../utils"
import { FilledCircle } from "../assets/SvgComponents"

import "../styles/ThemeSelector.css"
import "../styles/index.css"

export default function ThemeSelector() {
    const HTMLThemeAtribute = document.documentElement.getAttribute('data-theme') as string
    const [ currentTheme, setCurrentTheme ] = useState<Theme>(
        themes.filter(theme => theme.name === HTMLThemeAtribute)[0]
    )
    const [ themeOptionsActive, setThemeOptionsActive ] = useState<boolean>(false)

    function handleClick(e: MouseEvent<HTMLDivElement>, theme: Theme) {
        e.stopPropagation()
        setCurrentTheme(theme)
        document.documentElement.setAttribute('data-theme', theme.name)
        setThemeOptionsActive(false)    }

    return (
        <div onMouseEnter={() => setThemeOptionsActive(true)} onMouseLeave={() => setThemeOptionsActive(false)} id="theme-selector-container">
            <u>Current theme:</u>
            <span id="theme-name">{currentTheme.name}</span>
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