import React, { useState, useEffect } from 'react';
import './timer.css';

const Timer = ({ duration, reset, onTimerReset }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimerReset();
      return;
    }
    if (reset) {
      setTimeLeft(duration);
    }
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, reset]);

  const fillerStyles = {
    height: `${(timeLeft / duration) * 100}%`,
  };

  return (
    <div className="timer">
      <div className="progress-bar-container">
        <div className="progress-bar" style={fillerStyles}></div>
        <div className="progress-bar-text">{timeLeft}</div>
      </div>
    </div>
  );
};

export default Timer;
