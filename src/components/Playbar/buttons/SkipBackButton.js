import React from "react";

import { SkipBackIcon } from './icons';

export default function SkipBackButton({ onClick, disabled}) {
  
  return (
    <button onClick={onClick} disabled={disabled} className="c-player-button c-player-button--skipback">
        <SkipBackIcon />
    </button>
  );
}
