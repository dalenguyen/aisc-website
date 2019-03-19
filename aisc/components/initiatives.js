import { Fragment } from 'react';
import getConfig from 'next/config'
const { SITE_ABBREV } = getConfig().publicRuntimeConfig;


export default () => (
  <Fragment>
    <style jsx>{`
      .useful-links a {
        color: white;
      }
    `}</style>
    <ul className="useful-links list-unstyled">
      {[
        [SITE_ABBREV, "https://aisc.a-i.science/"],
        ["Blog", "https://blog.a-i.science/"],
        // ["Live Papers", "#"],
        // ["Spotlight", "#"],
        // ["Podcast", "#"]
      ].map(([name, link]) => (
        <li key={name}>
          <a href={link}>
            <p className="card-title">{name}</p>
          </a>
        </li>
      ))}
    </ul>
  </Fragment>
);