import React from "react";
import {
  PlayIcon,
  PauseIcon
} from './icons';


export default function PlayPauseButton({ state, onClick, disabled}) {

  function getIcon() {
    switch (state) {
      case "play":
        return <PauseIcon />;
      case "pause":
      default:
        return <PlayIcon />;
    }
  }
  
  return (
    <button onClick={onClick} disabled={disabled}>
        { getIcon() }
    </button>
  );
}
