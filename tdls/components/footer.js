import Link from 'next/link';
import { Fragment } from 'react';
import UsefulLinksSection from '../components/useful-links-section';

export default () => (
  <Fragment>
    <style jsx>{`
      .footer {
        background-color: #5a5a5a;
        color: #fff;
        margin-top: 30px;
        padding-top: 20px;
        padding-bottom: 20px;
      }
      .footer a {
        color: white;
      }
    `}</style>
    <footer className="footer navbar-expand-lg navbar-dark">
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <div className="copyright">
              &copy; 2018-2019&nbsp;
              <a href="//a-i.science">
                Aggregate Intellect Inc.
              </a>
            </div>
          </div>
          <div className="col-sm-3">
            <ul className="list-unstyled">
              <Link href="/code-of-conduct">
                <a>Code of Conduct</a>
              </Link>
            </ul>
          </div>
          <div className="col-sm-3">
            <h6>Useful Links</h6>
            <UsefulLinksSection />
          </div>
        </div>
      </div>
    </footer>
  </Fragment>
);
