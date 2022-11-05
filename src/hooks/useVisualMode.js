import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace) => {
    setMode(newMode);
    replace ? history[0] = newMode : history.unshift(newMode);
    setHistory(history);
  };

  const back = () => {
    history[1] ? setMode(history[1]): setMode(history[0]);
    setHistory(history.slice(1));
  }

  return { mode, transition, back };
}