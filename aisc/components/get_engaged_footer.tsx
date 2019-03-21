import { Fragment } from 'react';
import Link from 'next/link';

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
        ["Code of Conduct", "/code-of-conduct"]
      ].map(([name, link]) => (
        <li key={name}>
          <Link href={link}>
            <a>
              <p className="card-title">{name}</p>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  </Fragment>
);