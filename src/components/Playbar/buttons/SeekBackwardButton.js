import React from "react";

import { SeekBackwardIcon } from './icons';

export default function SeekBackwardButton({ onClick, disabled}) {
  
  return (
    <button onClick={onClick} disabled={disabled} className="c-player-button c-player-button--seekbackward">
        <SeekBackwardIcon />
    </button>
  );
}
