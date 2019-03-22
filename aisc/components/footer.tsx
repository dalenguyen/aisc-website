import { Fragment } from 'react';
import UsefulLinksSection from '../components/useful-links-section';
import GetEngaged from '../components/get_engaged_footer';
import FollowUs from '../components/follow_us';

export default () => (
  <Fragment>
    <style jsx>{`
      .footer {
        /* background-color: #111; */
        /* color: #fff; */
        margin-top: 30px;
        padding-top: 20px;
        padding-bottom: 20px;
      }
      
      .footer a {
        color: white;
      }
      .footer h5 {
        text-decoration: underline;
        text-underline-position: under;
        color: #fff5cd;
      }
      @media (max-width: 576px) {
        .footer {
          text-align: center;   
          padding-bottom: 60px;
        }
      }
    `}</style>
    <footer className="footer bg-black navbar-expand-lg navbar-dark text-center">
      <div className="container">
        <div className="row">
          <div className="col-12 offset-sm-2 col-sm-3">
            <h5 className="mb-3">Get Engaged</h5>
            <GetEngaged />
          </div>
          <div className="col-12 col-sm-3">
            <h5 className="mb-3">Follow Us</h5>
            <FollowUs />
          </div>
          <div className="col-12 col-sm-3">
            <h5 className="mb-3">Useful Links</h5>
            <UsefulLinksSection />
          </div>
        </div>
        <div className="copyright text-center mt-4">
          &copy; 2018-2019&nbsp;
          <a href="//a-i.science">
            Aggregate Intellect Inc.
          </a>
        </div>
      </div>
    </footer>

    <script
      src="https://code.jquery.com/jquery-3.3.1.min.js"
      integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
      crossOrigin="anonymous"></script>
    <script
      src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
      integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
      crossOrigin="anonymous">
    </script>
  </Fragment>
);
