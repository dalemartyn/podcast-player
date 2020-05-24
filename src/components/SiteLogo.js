import React from 'react';
import {
  ReactComponent as Logo
} from '../assets/img/site-logo.svg';

export default function SiteLogo({size = 'regular'}) {
  return (
    <div className={`c-site-logo c-site-logo--${size}`}>
      <div className="c-site-logo__img">
        <Logo />
      </div>
      <div className="c-site-logo__text">Podcasts</div>
    </div>
  );
}
