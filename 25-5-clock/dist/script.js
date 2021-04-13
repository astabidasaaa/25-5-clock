import React, { useState, useEffect } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

const defaultBreakState = 5,
defaultSessionState = 25,
defaultTimerState = 1500000,
defaultWhatTimeState = "25:00",
defaultStartState = false,
defaultTimerStyle = "Session";

function ClockApp() {
  const [breakState, setBreakState] = useState(defaultBreakState),
  [sessionState, setSessionState] = useState(defaultSessionState),
  [timerState, setTimerState] = useState(defaultTimerState),
  [whatTimeState, setWhatTimeState] = useState(defaultWhatTimeState),
  [isStartState, setIsStartState] = useState(defaultStartState),
  [timerStyle, setTimerStyle] = useState(defaultTimerStyle),
  [audioBeep, setAudioBeep] = useState("");

  useEffect(() => {
    if (timerStyle === "Session") {
      setTimerState(sessionState * 1000 * 60);
    }
  }, [timerStyle, sessionState]);

  useEffect(() => {
    if (timerStyle === "Break") {
      setTimerState(breakState * 1000 * 60);
    }
  }, [timerStyle, breakState]);

  useEffect(() => {
    let timerRun;
    if (isStartState && timerState >= 0) {
      timerRun = setTimeout(() => setTimerState(timerState - 1000), 1000);

      if (timerState === 59000) {
        document.
        getElementById("timer-label").
        classList.toggle("turn-red-now", true);

        document.
        getElementById("time-left").
        classList.toggle("turn-red-now", true);
      }

      if (timerState === 0) {
        audioBeep.play();
      }
    } else if (timerState < 0) {
      document.
      getElementById("timer-label").
      classList.toggle("turn-red-now", false);

      document.
      getElementById("time-left").
      classList.toggle("turn-red-now", false);

      if (timerStyle === "Session") {
        setTimerStyle("Break");
      } else if (timerStyle === "Break") {
        setTimerStyle("Session");
      }
    }

    countdown();

    return () => clearTimeout(timerRun);
  }, [isStartState, timerState]);

  const handleLengthChange = e => {
    const ID = e.target.id;

    if (!isStartState) {
      if (ID == "break-decrement" && breakState > 1) {
        setBreakState(breakState - 1);
      }

      if (ID == "break-increment" && breakState < 60) {
        setBreakState(breakState + 1);
      }

      if (ID == "session-decrement" && sessionState > 1) {
        setSessionState(sessionState - 1);
      }

      if (ID == "session-increment" && sessionState < 60) {
        setSessionState(sessionState + 1);
      }
    }
  };

  const handleReset = () => {
    setBreakState(defaultBreakState);
    setSessionState(defaultSessionState);
    setTimerState(defaultTimerState);
    setWhatTimeState(defaultWhatTimeState);
    setIsStartState(defaultStartState);
    setTimerStyle(defaultTimerStyle);

    audioBeep.pause();
    audioBeep.currentTime = 0;
  };

  const countdown = () => {
    let minutes = Math.floor(timerState / (1000 * 60));
    let seconds = Math.floor(timerState % (1000 * 60) / 1000);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    setWhatTimeState(minutes + ":" + seconds);
  };

  return /*#__PURE__*/(
    React.createElement("div", { className: "clock-display" }, /*#__PURE__*/
    React.createElement("div", { id: "title", className: "title" }, "25 + 5 Clock"), /*#__PURE__*/


    React.createElement("div", { id: "control" }, /*#__PURE__*/
    React.createElement("div", { id: "break" }, /*#__PURE__*/
    React.createElement("div", { id: "break-label", className: "label" }, "Break Length"), /*#__PURE__*/


    React.createElement("div", { className: "b break-decrement", onClick: handleLengthChange }, /*#__PURE__*/
    React.createElement("i", {
      id: "break-decrement",
      className: "fa fa-chevron-down",
      "aria-hidden": "true" })), /*#__PURE__*/


    React.createElement("div", { id: "break-length", className: "p" },
    breakState), /*#__PURE__*/

    React.createElement("div", { className: "b break-increment", onClick: handleLengthChange }, /*#__PURE__*/
    React.createElement("i", {
      id: "break-increment",
      class: "fa fa-chevron-up",
      "aria-hidden": "true" }))), /*#__PURE__*/




    React.createElement("div", { id: "session" }, /*#__PURE__*/
    React.createElement("div", { id: "session-label", className: "label" }, "Session Length"), /*#__PURE__*/


    React.createElement("div", { className: "b session-decrement", onClick: handleLengthChange }, /*#__PURE__*/
    React.createElement("i", {
      id: "session-decrement",
      class: "fa fa-chevron-down",
      "aria-hidden": "true" })), /*#__PURE__*/


    React.createElement("div", { id: "session-length", className: "p" },
    sessionState), /*#__PURE__*/

    React.createElement("div", { className: "b session-increment", onClick: handleLengthChange }, /*#__PURE__*/
    React.createElement("i", {
      id: "session-increment",
      class: "fa fa-chevron-up",
      "aria-hidden": "true" })))), /*#__PURE__*/





    React.createElement("div", { id: "timer" }, /*#__PURE__*/
    React.createElement("div", { id: "timer-label", className: "label turn-red" },
    timerStyle), /*#__PURE__*/

    React.createElement("div", { id: "time-left", className: "time-left turn-red" },
    whatTimeState), /*#__PURE__*/

    React.createElement("div", {
      id: "start_stop",
      className: "b start_stop",
      onClick: () => setIsStartState(!isStartState) }, /*#__PURE__*/

    React.createElement("i", { class: "fa fa-play", "aria-hidden": "true" }), /*#__PURE__*/
    React.createElement("i", { class: "fa fa-pause", "aria-hidden": "true" })), /*#__PURE__*/

    React.createElement("div", { id: "reset", className: "b", onClick: handleReset }, /*#__PURE__*/
    React.createElement("i", { class: "fa fa-undo", "aria-hidden": "true" }))), /*#__PURE__*/


    React.createElement("div", { id: "author" }, /*#__PURE__*/
    React.createElement("p", null, "by",
    " ", /*#__PURE__*/
    React.createElement("a", { href: "https://sngkr.netlify.app/", target: "_blank" }, "Sangkara"))), /*#__PURE__*/





    React.createElement("audio", {
      id: "beep",
      preload: "auto",
      ref: audio => {
        setAudioBeep(audio);
      },
      src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" })));



}

ReactDOM.render( /*#__PURE__*/
React.createElement(React.StrictMode, null, /*#__PURE__*/
React.createElement(ClockApp, null)),

document.getElementById("app"));