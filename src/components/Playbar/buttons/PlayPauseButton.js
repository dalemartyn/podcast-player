import React from "react";
import {
  Play,
  Pause
} from './icons';


export default function PlayPauseButton({ state, onClick, disabled}) {

  function getIcon() {
    switch (state) {
      case "play":
        return <Pause />;
      case "pause":
      default:
        return <Play />;
    }
  }
  
  return (
    <button onClick={onClick} disabled={disabled} className="c-player-button c-player-button--playpause">
        { getIcon() }
    </button>
  );
}
