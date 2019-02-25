import { Fragment, Component } from 'react';
import Link from 'next/link';
import LiveButton from './live-button';
import SocialButtons from './social-buttons';
import './header.scss';

export default ({ allEvents, before = null }: { allEvents: any[], before: Component | null }) => {
  return (
    <Fragment>
      <header className="main-navbar">
        <nav
          className="navbar navbar-expand-md fixed-top navbar-inverse"
          style={{ backgroundColor: 'white' }}
        >
          {before}
          <a href="/" className="navbar-brand">
            <img src="/static/images/tdls_logo.svg"
              style={{ height: '40px', width: 'auto' }} />
            &nbsp;
          TDLS
      </a>
          <LiveButton allEvents={allEvents} />
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <i className="fa fa-navicon"></i>
            </span>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <Link href="/events">
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
  )
};
