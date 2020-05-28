import React from "react";

import { SkipForwardIcon } from './icons';

export default function SkipForwardButton({ onClick, disabled}) {
  
  return (
    <button onClick={onClick} disabled={disabled}>
        <SkipForwardIcon />
    </button>
  );
}
