import React, { useState, useEffect } from 'react';
import './timer.css';

const Timer = ({ duration, onTimerFinished, forceReset }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    if (timeLeft === 0) {
      setTimeout(() => {
        setTimeLeft(duration);
        onTimerFinished();
      }, 3000);
      return clearInterval(timer);
    }

    if (forceReset) {
      setTimeLeft(duration);
      return clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [timeLeft, forceReset]);

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
