import { useState, useEffect } from "react";
import '../App.css';


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

return(
<div className="app-container">
      <div className="clock__body">
        <h1>25 + 5 Clock</h1>
        
        <div className="controls-container">
          <div className="control-section">
            <div className="control-label" id="break-label">
              Break Length
            </div>
            <div className="control-buttons">
              <button
                id="break-decrement"
                className="control-btn"
                onClick={() => handleDecrement('break')}
                disabled={isRunning}
              >
                −
              </button>
              <div className="control-value" id="break-length">
                {breakLength}
              </div>
              <button
                id="break-increment"
                className="control-btn"
                onClick={() => handleIncrement('break')}
                disabled={isRunning}
              >
                +
              </button>
            </div>
          </div>

          <div className="control-section">
            <div className="control-label" id="session-label">
              Session Length
            </div>
            <div className="control-buttons">
              <button
                id="session-decrement"
                className="control-btn"
                onClick={() => handleDecrement('session')}
                disabled={isRunning}
              >
                −
              </button>
              <div className="control-value" id="session-length">
                {sessionLength}
              </div>
              <button
                id="session-increment"
                className="control-btn"
                onClick={() => handleIncrement('session')}
                disabled={isRunning}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className={`timer-display ${currentMode.toLowerCase()}-mode ${isRunning ? 'running' : ''}`}>
          <div className="timer-label" id="timer-label">
            {currentMode}
          </div>
          <div className="time-display" id="time-left">
            {`${minsLeft < 10 ? '0' + minsLeft : minsLeft}:${secsLeft < 10 ? '0' + secsLeft : secsLeft}`}
          </div>
        </div>

        <div className="timer-controls">
          <button
            id="start_stop"
            className={`timer-btn start-stop-btn ${isRunning ? 'running' : ''}`}
            onClick={handleStartStop}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            id="reset"
            className="timer-btn reset-btn"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
        
        <audio
          id="beep"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
    </div>
  );
}
export default TimerDisplay;