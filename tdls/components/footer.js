import Link from 'next/link';
import { Fragment } from 'react';
import UsefulLinksSection from '../components/useful-links-section';
import Initiatives from '../components/initiatives';
import GetEngaged from '../components/get_engaged_footer';
import FollowUs from '../components/follow_us';

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
    <footer className="footer navbar navbar-expand-lg navbar-dark container">
      <div className="row">
        <div className="col-6 col-sm-3">
          <h5>Initiatives</h5>
          <Initiatives />
        </div>
        <div className="col-6 col-sm-3">
          <h5>Get Engaged</h5>
          <GetEngaged />
        </div>
        <div className="col-6 col-sm-3">
          <h5>Follow Us</h5>
          <FollowUs />
        </div>
        <div className="col-6 col-sm-3">
          <h5>Useful Links</h5>
          <UsefulLinksSection />
        </div>
      </div>
      <div className="copyright">
        &copy; 2018-2019&nbsp;
          <a href="//a-i.science">
          Aggregate Intellect Inc.
          </a>
      </div>
      <ul className="list-unstyled">
        <Link href="/code-of-conduct">
          <a>Code of Conduct</a>
        </Link>
      </ul>
    </footer>
  </Fragment>
);
