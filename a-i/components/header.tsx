import { Fragment } from 'react';
import "./header.scss";

export default () => (
  <Fragment>
    <header className="masthead">
      <div className="container d-flex h-100 align-items-center">
        <div className="mx-auto text-center">
          <img className="mx-auto my-0 brand-title" src="/static/img/a-i-logo-gold.png" />
          {/* <h1 className="mx-auto my-0 text-uppercase">Aggregate Intellect</h1> */}
          <h2 className="text-white-50 mx-auto mt-2 mb-5">Redefining Scientific Discovery</h2>
          <a href="#about" className="btn btn-primary js-scroll-trigger">
            Get Started
          </a>
        </div>
      </div>
    </header>
  </Fragment>
);
