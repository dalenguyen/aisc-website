import { Fragment } from 'react';
import fetch from 'isomorphic-unfetch'

import Header from '../components/header'
import Footer from '../components/footer'
import Head from 'next/head'
import SharedBodyScripts from '../components/shared-body-scripts'
const { SITE_NAME_FULL, SITE_ABBREV } = getConfig().publicRuntimeConfig;
import getConfig from 'next/config'

const About = ({ contributors }) => {
  return (
    <Fragment>
      <Head>
        <title>About {SITE_ABBREV} | {SITE_NAME_FULL}</title>
      </Head>
      <Header />
      <section className="container" id="about_us">
        <hr />
        <h2 className="mb-4">About {SITE_ABBREV}</h2>
        <p>
          <i>{SITE_NAME_FULL} is a community of intellectually curious individuals centred around technical review and discussion
        of advances in machine learning. </i>
        </p>
        <p>
          We are a welcoming, supportive community of machine learning practitioner and researchers. Our technical
          backgrounds are diverse; we come from industry and academia, with an array of experience, from avid learners to
          experts in their fields.
    </p>
        <p>
          Our group is centred around consistent meetings focused on meticulous but friendly discussions of advances in
          machine learning (typically scientific publications). In our discussions, we strive to cover both intuitive
          conceptual understanding and foundational mathematical details.
    </p>

        <h3 id="community">Our community in numbers! </h3>
        <div className="row community-charts">
          <div className="col-xl-4 col-lg-6 chart">
            <iframe width="100%" height="500" seamless frameBorder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQH-xE_OvO_ZtTr8cwjAxB-QFQy9IFM841n_QF5mcrk6UVZDC-ltEijN67TebY-AQcHDniTc53kEl2Y/pubchart?oid=1837496004&amp;format=interactive"></iframe>
          </div>
          <div className="col-xl-4 col-lg-6 chart">
            <iframe width="100%" height="500" seamless frameBorder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQH-xE_OvO_ZtTr8cwjAxB-QFQy9IFM841n_QF5mcrk6UVZDC-ltEijN67TebY-AQcHDniTc53kEl2Y/pubchart?oid=1981502753&amp;format=interactive"></iframe>
          </div>
          <div className="col-xl-4 col-lg-6 chart">
            <iframe width="100%" height="500" seamless frameBorder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQH-xE_OvO_ZtTr8cwjAxB-QFQy9IFM841n_QF5mcrk6UVZDC-ltEijN67TebY-AQcHDniTc53kEl2Y/pubchart?oid=2092973435&amp;format=interactive"></iframe>
          </div>
        </div>

        <h3 id="steering-committee">Steering Committee</h3>
        <div className="row profile-list">
          {[
            ['Amir Feizpour', 'Partnership Lead', '/static/images/amir.jpeg', 'https://www.linkedin.com/in/amirfzpr/'],
            ['Ehsan Amjadian', '"Lunch & Learn" Stream Lead', '/static/images/ehsan.jpeg', 'https://www.linkedin.com/in/ehsanamjadian/'],
            ['Felipe Pérez', '"Foundational" Stream Lead', '/static/images/felipe.jpeg', 'https://www.linkedin.com/in/felipe-perez-/'],
            ['Gordon Gibson', '“Fast Track” Stream Lead', '/static/images/gordon.jpeg', 'https://www.linkedin.com/in/gordon-gibson-874b3130/'],
            ['Lindsay Brin', 'Chief Phrasing Officer and Inclusivity Lead', '/static/images/lindsay.jpeg', 'https://www.linkedin.com/in/lindsaydbrin/'],
            ['Serena McDonnell', '"Main" Stream Lead', '/static/images/serena.jpeg', 'https://www.linkedin.com/in/serenamcdonnell/'],
            ['Xiyang Chen', '"Code Review" Stream Lead', '/static/images/xiyang.jpeg', 'https://www.linkedin.com/in/xiyangchen/'],
          ].map(profileCard)
          }
        </div>

        <h3 id="volunteers">{SITE_ABBREV} Friends</h3>

        <div className="row profile-list">
          {[
            ['Paul Finlay', 'Sound Engineer', '/static/images/paul.jpeg', 'https://www.linkedin.com/in/paulfinlay314/'],
            ['Helen Ngo', 'Former Steering Committee Member', '/static/images/helen.jpeg', 'https://www.linkedin.com/in/helen-ngo/'],
          ].map(profileCard)
          }
        </div>

        <section className="container">
          <h3>Website Contributors</h3>
          <p>We're open source, so feel free to clone <a target="_blank" href="https://github.com/Aggregate-Intellect/aisc-website">our GitHub repo</a>, make changes, and submit a pull request, and your
      GitHub handle would show up here</p>
          {
            contributors && (
              <article id="site-contributors" className="d-flex flex-row">
                {contributors.map(c =>
                  <div key={c.id}>
                    <a href={c.html_url} target="_blank" data-toggle="tooltip" title={`${c.login} contributed ${c.contributions} commit(s)`}>
                      <img className="rounded mr-3" src={c.avatar_url} width="50px" />
                    </a>
                  </div>
                )}
              </article>
            )
          }
        </section>

      </section>
      <Footer />
      <SharedBodyScripts />
    </Fragment>
  );
};

function profileCard([name, title, photo, linkedIn]) {
  return (
    <div key={name} className="col-lg-3 col-6">
      <div className="media-top">
        <img
          className="profile rounded-circle mr-3"
          src={photo} width="120px" />
        <div className="media-body">
          <a href={linkedIn}>
            <b>{name} <i className="fa fa-linkedin-square"></i></b>
          </a>
          <p>{title}</p>
        </div>
      </div>
    </div>
  );
}

About.getInitialProps = async function () {
  const contributors = await getContributors();
  if (contributors && contributors.length) {
    return { contributors }
  } else {
    return {}
  }
}

async function getContributors() {
  const url = `https://api.github.com/repos/Aggregate-Intellect/aisc-website/contributors`;
  const resp = await fetch(url, {
    method: 'GET',
    cache: 'default'
  });
  const raw = await resp.json();
  return raw;
}

export default About;