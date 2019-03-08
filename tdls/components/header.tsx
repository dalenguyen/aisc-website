import { Fragment, Component } from 'react';
import Link from 'next/link';
import LiveButton from './live-button';
import DonateButton from './donate-button';
import './header.scss';
import { AllEvents } from '../../common/types';
import getConfig from 'next/config'
const { SITE_ABBREV } = getConfig().publicRuntimeConfig;

export default ({ allEvents, before = null }: { allEvents: AllEvents, before?: Component | null }) => {
  return (
    <Fragment>
      <header className="main-navbar">
        <nav
          className="navbar navbar-expand-md fixed-top navbar-inverse"
          style={{ backgroundColor: 'white' }}
        >
          {before}

          <Link href="/">
            <a className="navbar-brand">
              {
                !before && (
                  <img src="/static/images/tdls_logo.svg"
                    style={{ height: '40px', width: 'auto' }} />
                )
              }
              &nbsp;
              {SITE_ABBREV}
            </a>
          </Link>
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
                  <a className="nav-link">
                    Events <i className="fa fa-search"></i>
                  </a>
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
              <DonateButton />
            </div>
          </div>
        </nav>
      </header>
      <div className="social-buttons mobile">
        <DonateButton />
      </div>
    </Fragment>
  )
};
