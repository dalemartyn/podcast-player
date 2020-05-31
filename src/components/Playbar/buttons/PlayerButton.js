import React from "react";
import classNames from "classnames";

export default function PlayerButton({ onClick, disabled, children, size = false}) {
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={
        classNames(
          "c-player-button",
          {
            "c-player-button--medium": size === "medium",
            "c-player-button--large": size === "large",
          }
        )
      }
    >
        {children}
    </button>
  );
}
