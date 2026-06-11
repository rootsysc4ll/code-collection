import { useEffect, useState } from "react"

function App() {
    const [ timerCountSecs, setTimerCountSecs ] = useState<number>(500)

    useEffect(() => {
        setInterval(() => {
            setTimerCountSecs(timerCountSecs - 1)
        }, 1000);
    }, [timerCountSecs])
    
    return (
        <p>Timer: {timerCountSecs}</p>
    )        
}

export default App
