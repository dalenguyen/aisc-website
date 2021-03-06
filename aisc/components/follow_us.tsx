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
        ["YouTube", "https://www.youtube.com/channel/UCfk3pS8cCPxOgoleriIufyg?view_as=subscriber&sub_confirmation=1"],
        ["LinkedIn", "https://www.linkedin.com/company/18994830/"],
        ["Twitter", "https://twitter.com/aisc_to"],
        ["Reddit", "https://www.reddit.com/user/tdls_to"],
        ["Instagram", "https://www.instagram.com/aisc_to/"],
        ["Email", "mailto:events@a-i.science"],
      ].map(([name, link]) => (
        <li key={name}>
          <a href={link} target="_blank">
            <p className="card-title">{name}</p>
          </a>
        </li>
      ))}
    </ul>
  </Fragment>
);