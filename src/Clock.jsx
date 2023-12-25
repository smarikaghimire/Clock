// Clock.jsx

import React, { useState, useEffect } from "react";
import "./App.css";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const formatTime = (value) => (value < 10 ? `0${value}` : value);

  const getRotation = (value, max, offset = 0) =>
    ((value + offset) % max) * (360 / max);

  const getHourRotation = () => {
    const hourRotation = (hours % 12) * 30 + minutes / 2;
    const minuteRotation = minutes * 0.5;

    return hourRotation + minuteRotation;
  };

  const getTimeString = () => {
    const formattedHours = formatTime(hours);
    const formattedMinutes = formatTime(minutes);
    const formattedSeconds = formatTime(seconds);

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  const getGreeting = () => {
    const currentHour = hours;

    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning Sweethearts!";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good Afternoon Babies<3";
    } else {
      return "Good Night My Loves <3, Sleep very very well.";
    }
  };

  return (
    <div className="clock-container">
      <div className="clock">
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className="number"
            style={{
              transform: `rotate(${index * 30}deg) translateY(-120px)`,
            }}
          >
            {index + 1}
          </div>
        ))}
        {[...Array(60)].map((_, index) => (
          <div
            key={index}
            className={`bar ${index % 5 === 0 ? "hour-bar" : "minute-bar"}`}
            style={{
              transform: `rotate(${getRotation(
                index,
                60,
                index % 5 === 0 ? 0 : -10
              )}deg) translateY(-90px)`,
            }}
          />
        ))}
        <div
          className="hand hour"
          style={{ transform: `rotate(${getHourRotation()}deg)` }}
        />
        <div
          className="hand minute"
          style={{ transform: `rotate(${minutes * 6 + seconds / 10}deg)` }}
        />
        <div
          className="hand second"
          style={{ transform: `rotate(${seconds * 6}deg)` }}
        />
      </div>
      <div className="time">{getTimeString()}</div>
      <div className="greeting">{getGreeting()}</div>
    </div>
  );
};

export default Clock;
