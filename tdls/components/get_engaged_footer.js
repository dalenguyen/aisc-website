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
        ["Contribute", "/get-engaged#contribute"],
        ["For Organizations", "/get-engaged#for-organizations"],
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