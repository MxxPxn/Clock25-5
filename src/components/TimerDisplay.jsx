import { useState, useEffect } from "react";


function TimerDisplay() {
const INITIAL_SESSION_TIME = 25;
const INITIAL_BREAK_TIME = 5;
const [breakLength, setBreakLength] = useState(INITIAL_BREAK_TIME);
const [sessionLength, setSessionLength] = useState(INITIAL_SESSION_TIME);
const [minsLeft, setMinsLeft] = useState(INITIAL_SESSION_TIME);
const [secsLeft, setSecsLeft] = useState(0);
const [isRunning, setIsRunning] = useState(false);
const [currentMode, setCurrentMode] = useState('Session'); // 'session' or 'break'

useEffect(() => {
    if (!isRunning) return;
   const intervalId =  setInterval(() => {
        if ( minsLeft === 0 && secsLeft === 0) {
            const audio = document.getElementById('beep');
            audio.currentTime = 0;
            audio.play();
            const newMode = currentMode === 'Session' ? 'Break' : 'Session';
            setCurrentMode(newMode);
            setMinsLeft(newMode === 'Break' ? breakLength : sessionLength);
            setSecsLeft(0);
            return;
        }

        if (secsLeft === 0) {
            setMinsLeft((prev) => prev - 1);
            setSecsLeft(59);
        } else {
            setSecsLeft((prev) => prev - 1);
        }
    }, 1000);
    return () => clearInterval(intervalId);
}, [isRunning, minsLeft, secsLeft]);

const handleStartStop = () => {
    setIsRunning((prev) => !prev);
};

const handleReset = () => {
     const audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
    setIsRunning(false);
    setSessionLength(INITIAL_SESSION_TIME);
    setBreakLength(5);
    setMinsLeft(INITIAL_SESSION_TIME);
    setSecsLeft(0);
    setCurrentMode('Session');
};

const handleDecrement = (type) => {
    if (isRunning) return;
    if (type === "break") {
        setBreakLength((prev) => Math.max(1, prev - 1));
    } else if (type === 'session') {
        setSessionLength((prev) => Math.max(1, prev - 1));
        setMinsLeft((prev) => Math.max(1, prev - 1));
    }
}
const handleIncrement = (type, max = 60) => {
    if (isRunning) return;
       if (type === "break") {
        setBreakLength((prev) => Math.min(max, prev + 1));
    } else if (type === 'session') {
        setSessionLength((prev) => Math.min(max, prev + 1));
        setMinsLeft((prev) => Math.min(max, prev + 1));
    }

}


 return (   
    <div className="clock__body">

        <h1>25 + 5 Clock</h1>
        <div id="break">
         <div id="break-label">
            Break Length
            <button id="break-decrement" onClick={() => handleDecrement('break')}>-</button>
            <div id="break-length">{breakLength}</div>
            <button id="break-increment" onClick={() => handleIncrement('break')}>+</button>
        </div>
        </div>

        <div id="session">
        <div id="session-label">
            Session Length
            <button id="session-decrement" onClick={() => handleDecrement('session')}>-</button>
            <div id="session-length">{sessionLength}</div>
            <button id="session-increment" onClick={() => handleIncrement('session')}>+</button>
        </div>
        </div>

        <div id="timer-label">
            {currentMode}
            <div id="time-left">{`${minsLeft < 10 ? '0' + minsLeft : minsLeft}:${secsLeft < 10 ? '0' + secsLeft : secsLeft}`}</div>
        </div>

        <div className="timer-control">
            <button id="start_stop" onClick={handleStartStop}>start/stop</button>
            <button id="reset" onClick={handleReset}>reset</button>
            <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"/>
        </div>

    </div>

    
 );
}
export default TimerDisplay;