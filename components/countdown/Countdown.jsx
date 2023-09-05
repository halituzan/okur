import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 120,
  strokeWidth: 9,
  duration: 7,
};
const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

const Countdown = () => {
  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTime = stratTime + 121000; // use UNIX timestamp in seconds

  const remainingTime = endTime - stratTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;
  return (
    <CountdownCircleTimer
      {...timerProps}
      colors={["#b1283f", "#f43f5e", "#d64961"]}
      duration={daysDuration}
      initialRemainingTime={remainingTime}
    >
      {({ elapsedTime, color }) => (
        <span style={{ color }}>
          {renderTime("Gün", getTimeDays(daysDuration - elapsedTime))}
        </span>
      )}
    </CountdownCircleTimer>
  );
};

export default Countdown;
