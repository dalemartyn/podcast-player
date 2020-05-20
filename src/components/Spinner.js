import React from 'react';

export default function Spinner() {
  return (
    <div role="progressbar" className="c-spinner">
      <div className="c-spinner__inner">
        <svg viewBox="0 0 32 32" width="32" height="32">
            <circle
                cx="16"
                cy="16"
                fill="none"
                r="14"
                strokeWidth="4"
                className="c-spinner__track">
            </circle>
            <circle
                cx="16"
                cy="16"
                fill="none"
                r="14"
                strokeWidth="4"
                className="c-spinner__progress">
            </circle>
        </svg>
      </div>
    </div>
  );
}
