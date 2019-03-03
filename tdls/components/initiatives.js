import { Fragment } from 'react';


export default () => (
  <Fragment>
    <style jsx>{`
      .useful-links a {
        color: white;
      }
    `}</style>
    <ul className="useful-links list-unstyled">
      {[
        ["TDLS", "https://tdls.a-i.science/"],
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