import { useState } from 'react'
import './styles/App.css'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import timezoneIana from 'dayjs-timezone-iana-plugin';
import { useEffect } from 'react';
import { useRef } from 'react';

dayjs.extend(utc);
dayjs.extend(timezoneIana);

function SwitchButton() {
    let [ on, setOn ] = useState(true);

    function changeSwitch() {
        setOn(!on);
    }

    return (
        <button onClick={changeSwitch} id={on ? 'button-on' : 'button-off'}>{on ? 'ON' : 'OFF'}</button>
    );
}

function LoginForm() {
    let [showPasssword, setShowPasssword] = useState(false);

    return (
        <div id='form-container'>
            <p id='form-title'>Hello, welcome to my website</p>
            <div id='form-input-container'>
                <input type="text" placeholder="Email" className='form-input'/><br></br>
                <input type={ showPasssword ? 'text' : 'password' } placeholder="Password" className='form-input'
                />
                <button id='password-show-button' onClick={() => {setShowPasssword(!showPasssword)}}    
                >{showPasssword ? 'Hide' : 'Show'}</button>
            </div>
            <div>
                <button className='form-button'>Login</button>
                <button className='form-button'>Sign up</button>
            </div>
        </div>
    );
}

function Clock() {
    let [ time, setTime ] = useState(dayjs().format('HH:mm:ss'))

    useEffect(() => {
        setInterval(() => {
            setTime(dayjs().tz('Brazil/East').format('HH:mm:ss'));
        }, 1000);
    }, []);

    return (
        <p>Current time: {time}</p>
    );
}

function AutoClick() {
    let [ clicks, setClicks] = useState(0);
    const buttonElem = useRef(null);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgb(206, 206, 206)',
            columnGap: '10px'
        }}>
            <button ref={buttonElem} onClick={() => { setClicks(++clicks)} } className='click-button'>Clicked {clicks} times</button>
            <button onClick={() => { setClicks(0)} } className='click-button'>Reset</button>
            <button onClick={() => {
                setInterval(() => {
                    buttonElem.current.click()
                }, 1000); 
            }} className='click-button'>Auto Click</button>
        </div>
    );
}

function App() {
    return (<>
        <SwitchButton/>
        <LoginForm/>
        <Clock/>
        <AutoClick/>
    </>);
}

export default App