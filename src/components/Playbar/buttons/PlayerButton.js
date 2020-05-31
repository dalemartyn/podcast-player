import React from "react";
import classNames from "classnames";

export default function PlayerButton({ onClick, disabled, children, isLarge = false}) {
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={
        classNames("c-player-button", { "c-player-button--large": isLarge })
      }
    >
        {children}
    </button>
  );
}
