import { Fragment } from 'react';
import Link from 'next/link';
import LiveButton from '../components/live-button';
import SocialButtons from '../components/social-buttons';

import './header.scss';

export default () => (
  <Fragment>
    <header className="main-navbar">
      <nav
        className="navbar navbar-expand-md fixed-top navbar-light"
        style={{ backgroundColor: 'white' }}
      >
        <a href="/" className="navbar-brand">
          <img src="/static/images/tdls_logo.svg" style={{ height: '30px' }} />{' '}
          TDLS
      </a>
        <LiveButton />
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <Link href="/#events">
                <a className="nav-link">Events</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/get-engaged">
                <a className="nav-link">Get Engaged</a>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link href="/about">
                <a className="nav-link">About Us</a>
              </Link>
            </li>
          </ul>
          <div className="social-buttons desktop">
          <SocialButtons />
          </div>
        </div>
      </nav>
    </header>
    <div className="social-buttons mobile">
      <SocialButtons />
    </div>
  </Fragment>
);
