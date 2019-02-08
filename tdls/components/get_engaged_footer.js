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
        ["Contribute", "/get-engaged/#get-engaged-contribute"],
        ["For Organizations", "/get-engaged-organization"],
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