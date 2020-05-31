import React from 'react';
import useKeydown from '../../hooks/useKeydown';
import * as DarkTheme from '../../dark-theme';

export default function ThemeToggle() {

  function isDarkTheme() {
    return DarkTheme.isDarkTheme();
  }

  function toggleTheme() {
    DarkTheme.toggle();
  }

  useKeydown('d', toggleTheme);

  return (
    <button onClick={toggleTheme} role="switch" aria-checked={isDarkTheme()} aria-label="Toggle Theme" className="c-theme-toggle">
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M24 12C24 18.6274 18.6274 24 12 24C5.37256 24 0 18.6274 0 12C0 5.37256 5.37256 0 12 0C18.6274 0 24 5.37256 24 12ZM21.5 12C21.5 17.2467 17.2468 21.5 12 21.5C6.75317 21.5 2.5 17.2467 2.5 12C2.5 6.7533 6.75317 2.5 12 2.5C17.2468 2.5 21.5 6.7533 21.5 12Z"/>
      <g clipPath="url(#dark-theme-icon-clip-path)">
        <path d="M0 0H24V24H0V0Z" id="dark-theme-transition-path"/>
      </g>
      <defs>
        <clipPath id="dark-theme-icon-clip-path">
          <circle cx="12" cy="12" r="12" fill="none"/>
        </clipPath>
      </defs>
      </svg>
    </button>
  );
}
