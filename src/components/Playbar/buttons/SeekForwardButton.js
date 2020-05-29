import React from "react";

import { SeekForwardIcon } from './icons';

export default function SeekForwardButton({ onClick, disabled}) {
  
  return (
    <button onClick={onClick} disabled={disabled} className="c-player-button c-player-button--seekforward">
        <SeekForwardIcon />
    </button>
  );
}
