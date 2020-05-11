import React from 'react';
import useKeydown from '../hooks/useKeydown';
import { Link } from 'react-router-dom'

export default function Header() {

  return (
    <div className="c-site-header">
      <div className="o-wrapper-l">
        <div className="c-site-header__main">
          <div className="c-site-header__logo">
            <Link className="c-site-header__logo-link ts-title" to="/">Podcasts</Link>
          </div>

          <div className="c-site-header__darkmode">
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}

function DarkModeToggle() {

  function toggleDarkMode() {
    document.documentElement.classList.toggle('t-dark');
  }

  useKeydown('d', toggleDarkMode);

  return (
    <button onClick={toggleDarkMode} role="switch" aria-checked="false" aria-label="Dark Theme" className="c-button c-button--dark-theme">
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" />
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
