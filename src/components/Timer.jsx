import React, { useState, useEffect } from 'react';

const Timer = ({ minutes = 1 }) => {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleStart = () => {
    setIsActive(true);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className='text-center'>
      <div className='text-9xl font-bold mb-6'>{formatTime(timeLeft)}</div>
      <button
        onClick={handleStart}
        disabled={isActive || timeLeft === 0}
        className={`bg-green-500 text-white px-6 py-2 rounded ${
          isActive || timeLeft === 0
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-green-600'
        } transition duration-200`}
      >
        Iniciar
      </button>
    </div>
  );
};

export default Timer;
