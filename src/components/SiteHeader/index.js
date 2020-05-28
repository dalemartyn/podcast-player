import React, {useLayoutEffect} from 'react';
import {
  Link,
  useLocation,
  useResolvedLocation
} from 'react-router-dom';
import { useAppState } from '../../AppStateProvider';
import ThemeToggle from './ThemeToggle';
import SiteLogo from '../SiteLogo';


export default function SiteHeader() {
  const { podcasts } = useAppState();

  return (
    <div className="c-site-header">
      <div className="o-wrapper-toolbar">
        <div className="c-site-header__main">
          <div className="c-site-header__logo">
            <SiteLogoLink className="c-site-header__logo-link" />
          </div>

          <div className="c-site-header__menu">
            <SiteMenu items={podcasts.categories} />
          </div>

          <div className="c-site-header__theme-toggle">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}

function SiteLogoLink({className}) {
  const location = useLocation();
  const hidden = (location.pathname === "/");

  useLayoutEffect(() => {});

  return (
    <Link className={className} to="/" style={{visibility: hidden && "hidden"}}>
      <SiteLogo />
    </Link>
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
