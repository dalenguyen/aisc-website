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
    <footer class="footer">
      <div class="container">
        <div class="footer__content">
          <a class="g-logo-small footer__logo" href="/">TED</a>
          <div class="footer__content__links">
            <nav class="footer__section" role="navigation">
              <h3 class="footer__title">
                Programs &amp; initiatives
              </h3>
              <ul class="footer__links">
                <li class="m5"><a class="footer__link" href="/about/programs-initiatives/tedx-program">TEDx</a></li>
                <li class="m5"><a class="footer__link" href="/about/programs-initiatives/ted-prize">TED Prize</a></li>
                <li class="m5"><a class="footer__link" href="/about/programs-initiatives/ted-fellows-program">TED Fellows</a></li>
                <li class="m5"><a class="footer__link" href="/about/programs-initiatives/ted-ed">TED Ed</a></li>
                <li class="m5"><a class="footer__link" href="/about/programs-initiatives/ted-translators">TED Translators</a></li>
                <li class="m5"><a class="footer__link" href="/about/programs-initiatives/ted-books">TED Books</a></li>
                <li class="m5"><a class="footer__link" href="/about/programs-initiatives/ted-institute">TED Institute</a></li>
              </ul>
            </nav>
            <nav class="footer__section" role="navigation">
              <h3 class="footer__title">
                Ways to get TED
              </h3>
              <ul class="footer__links">
                <li class="m5"><a class="footer__link" href="/read/ted-podcasts/ted-radio-hour">TED Radio Hour on NPR</a></li>
                <li class="m5"><a class="footer__link" href="/about/programs-initiatives/ted-talks/ways-to-get-ted-talks">More ways to get TED</a></li>
              </ul>
            </nav>
            <nav class="footer__section" role="navigation">
              <h3 class="footer__title">Follow TED</h3>
              <ul class="footer__links">
                <li class="m5"><a class="footer__link" target="_blank" href="//www.facebook.com/TED">Facebook</a></li>
                <li class="m5"><a class="footer__link" target="_blank" href="//twitter.com/tedtalks">Twitter</a></li>
                <li class="m5"><a class="footer__link" target="_blank" href="//www.pinterest.com/tednews">Pinterest</a></li>
                <li class="m5"><a class="footer__link" target="_blank" href="//instagram.com/ted">Instagram</a></li>
                <li class="m5"><a class="footer__link" target="_blank" href="//www.youtube.com/ted">YouTube</a></li>
                <li><a class="footer__link" href="http://blog.ted.com">TED Blog</a></li>
              </ul>
            </nav>
            <nav class="footer__section" role="navigation">
              <h3 class="footer__title">Our community</h3>
              <ul class="footer__links">
                <li class="m5"><a class="footer__link" href="/people/speakers">TED Speakers</a></li>
                <li class="m5"><a class="footer__link" href="/people/fellows">TED Fellows</a></li>
                <li class="m5"><a class="footer__link" href="/people/translators">TED Translators</a></li>
                <li class="m5"><a class="footer__link" rel="nofollow" href="/people/tedx">TEDx Organizers</a></li>
                <li class="m5"><a class="footer__link" href="/people">TED Community</a></li>
              </ul>
            </nav>
          </div>
          <div class="footer__content__forms">
            <form class="footer-newsletter footer__section footer__section--form p-r:.8">
              <h3 class="footer__title">Want personalized recommendations?</h3>
              <div class="c:black f:.9 m-b:2">
                Join
                <span class="f-w:700">
                  TED Recommends
                </span>
                and get the perfect ideas selected just for you.
              </div>
              <a class="ga-link bg:gray-dd b-r:.2 c:white hover/c:white d:i-b f:1 f-w:700 p-y:1 p-x:4 t-d:n" data-ga-action="getStarted" data-ga-category="footer" data-ga-label="recommends" href="/recommends?exploreCTASource=footer.link">
                Get started
              </a>
            </form>
            <form class="footer__section" style="display:none;">
              <h3 class="footer__title">Language Selector</h3>
              <p>TED.com translations are made possible by volunteer
                translators. Learn more about the
                <a href="/pages/open_translation_project">Open Translation Project</a>.</p>
              <select class="form-control" disabled="">
                <option>English</option>
              </select>
            </form>
          </div>
        </div>
      </div>
      <div class="footer__services">
        <div class="container footer__services__container">
          <nav role="navigation">
            <ul class="footer__links">
              <li><a class="footer__service" href="/about/our-organization/our-policies-terms/ted-talks-usage-policy">TED Talks Usage Policy</a></li>
              <li><a class="footer__service" href="/about/our-organization/our-policies-terms/privacy-policy">Privacy Policy</a></li>
              <li><a class="footer__service" href="/about/partner-with-ted">Advertising / Partnership</a></li>
              <li><a class="footer__service" href="/about/our-organization/our-policies-terms/ted-com-terms-of-use">TED.com Terms of Use</a></li>
              <li><a class="footer__service" href="/about/our-organization/jobs-at-ted">Jobs</a></li>
              <li><a class="footer__service" href="/about/our-organization/contact-us/press-and-media-information">Press</a></li>
              <li><a class="footer__service" href="//support.ted.com ">Help</a></li>
            </ul>
          </nav>
          <p class="footer__service footer__service--info" role="contentinfo">
            © TED Conferences, LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
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
            <h5>Useful Links</h5>
            <UsefulLinksSection />
          </div>
          <div className="col-sm-3">
            <h5>Useful Links</h5>
            <UsefulLinksSection />
          </div>
        </div>
      </div>
    </footer>
  </Fragment>
);
