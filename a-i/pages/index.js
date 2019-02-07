import { Fragment } from 'react';

import Head from 'next/head';
import Jumbotron from 'react-bootstrap/Jumbotron';

import Header from '../components/header';
import AIThemes from '../components/ai-themes';

export default () => (
  <Fragment>
    <Head>
      <title>Aggregate Intellect</title>
      <meta name="description"
        content="Redefining scientific discovery" />
      <AIThemes />
    </Head>
    <Header />
    <style jsx>{`
      main {
        margin-top: 100px;
      }
      h1.intro {
        font-size: 8vw;
      } 
      p.intro.lead {
        font-size: 4vw;
      }
    `}
    </style>
    <main>
      <Jumbotron className="intro text-center">
        <h1 className="intro">aggregate intellect</h1>
        <p className="intro lead">
          Redefining Scientific Discovery
        </p>
        <p>
          Coming soon.
        </p>
      </Jumbotron>
      <section className="container text-center">
        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css" />
            <h5 className="card-title">Subscribe to receive updates about us</h5>
            <div id="mc_embed_signup">
              <form action="https://science.us20.list-manage.com/subscribe/post?u=c7831af29c0c46bd5ec4c04c7&amp;id=9e6c32b697"
                method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate"
                target="_blank" noValidate>
                <div id="mc_embed_signup_scroll">
                  <div className="mc-field-group text-center">
                    <input placeholder="Email address" type="email" name="EMAIL" className="required email text-center" id="mce-EMAIL" />
                  </div>
                  <div
                    style={{ position: 'absolute', left: '-5000px' }}
                    aria-hidden="true"><input type="text"
                      name="b_c7831af29c0c46bd5ec4c04c7_9e6c32b697"
                      tabIndex="-1" /></div>
                  <div className="clear text-center"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe"
                    className="button" /></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  </Fragment>
);