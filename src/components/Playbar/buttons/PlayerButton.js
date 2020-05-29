import React from "react";

export default function PlayerButton({ onClick, disabled, children}) {
  
  return (
    <button onClick={onClick} disabled={disabled} className="c-player-button">
        {children}
    </button>
  );
}
