import React from 'react';
import {
  Link,
  useLocation,
  useResolvedLocation
} from 'react-router-dom';
import { useAppState } from '../../AppStateProvider';
import DarkModeToggle from './DarkModeToggle';

export default function SiteHeader() {
  const { podcasts } = useAppState();

  return (
    <div className="c-site-header">
      <div className="o-wrapper-l">
        <div className="c-site-header__main">
          <div className="c-site-header__logo">
            <Link className="c-site-header__logo-link" to="/">
              <SiteLogo />
            </Link>
          </div>

          <div className="c-site-header__menu">
            <SiteMenu items={podcasts.categories} />
          </div>

          <div className="c-site-header__darkmode">
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}

function SiteLogo() {
  return (
    <div className="c-site-logo">
      <div className="c-site-logo__img">
        <img src="/img/site-logo.svg" alt="Podcasts" />
      </div>
      <div className="c-site-logo__text">Podcasts</div>
    </div>
  );
}

function SiteMenu({items}) {
  return (
    <div className="c-site-menu">
      <nav className="c-site-menu__nav">
        <ul className="c-tab-menu">
          {
            items.map(({title, slug}) => <SiteMenuItem title={title} slug={slug} key={title} />)
          }
        </ul>
      </nav>
    </div>
  );
}

function SiteMenuItem({title, slug}) {
  const classNames = [
    "c-tab-menu__item"
  ];

  const link = '/' + slug;

  let location = useLocation();
  let toLocation = useResolvedLocation(link);

  let locationPathname = location.pathname;
  let toLocationPathname = toLocation.pathname;

  let isActive =
    locationPathname.startsWith(toLocationPathname);

  if (isActive) {
    classNames.push('is-active');
  }

  return (
    <li className={classNames.join(" ")}>
      <Link
        to={link}
        className="c-tab-menu__link c-tab-menu__link"
      >
        {title}
      </Link>
    </li>
  );
}
