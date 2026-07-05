import { useEffect } from "react"
import "./ErrorMessage.css"

const displayErrorMessageMS = 6000

type Props = {
    errorMessage: string
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
}

export default function ErrorMessage({ errorMessage, setErrorMessage }: Props) {
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setErrorMessage('')
        }, displayErrorMessageMS);

        return () => clearTimeout(timeoutId)
    })

    return (
        <div id="error-message">
            <span>{errorMessage}</span>
        </div>
    )
}