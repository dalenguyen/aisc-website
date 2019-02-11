import { Fragment } from 'react';
import Link from 'next/link';

export default () => (
  <Fragment>
    <style jsx>{`

    .main-navbar .nav-item a {
      color: black;
      font-weight: 500;
      letter-spacing: 0.07em;
    }

    .main-navbar .dropdown-menu a {
      color: black;
    }

    .navbar {
      box-shadow: 0px 13px 18px -12px rgba(171, 183, 186, 1);
      padding-left: 3rem;
      padding-right: 3rem;
    }

    @media (max-width: 430px) {
      .navbar {
        padding-left: 1rem;
        padding-right: 1rem;
      }
    }

  `}</style>
    <header className="main-navbar">
      <nav
        className="navbar navbar-expand-md fixed-top navbar-light"
        style={{ backgroundColor: 'white' }}
      >
        <a href="/" className="navbar-brand">
          aggregate intellect
      </a>
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
              <Link href="//tdls.a-i.science">
                <a className="nav-link">TDLS</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="//blog.a-i.science">
                <a className="nav-link">Blog</a>
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link"
                href="https://www.youtube.com/channel/UCfk3pS8cCPxOgoleriIufyg"
                target="_blank">YouTube</a>
            </li>
          </ul>
          <ul className="list-inline social-buttons">
            <li className="list-inline-item">
              <a
                href="https://www.youtube.com/c/TorontoDeepLearningSeries"
                target="_blank"
              >
                <i className="fa fa-youtube fa-2x" />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://www.reddit.com/user/tdls_to" target="_blank">
                <i className="fa fa-reddit fa-2x" />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://twitter.com/tdls_to" target="_blank">
                <i className="fa fa-twitter fa-2x" />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://github.com/TDLS" target="_blank">
                <i className="fa fa-github fa-2x" />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://www.instagram.com/tdls_to/" target="_blank">
                <i className="fa fa-instagram fa-2x" />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="mailto:events@a-i.science" target="_blank">
                <i className="fa fa-envelope fa-2x" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  </Fragment>
);
