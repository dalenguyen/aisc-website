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
        ["Distill Pub", "https://distill.pub/about/"],
        ["Papers with Code", "https://paperswithcode.com/"],
        ["ArXiv", "https://arxiv.org/archive/cs"],
        ["Arxiv Sanity", "http://www.arxiv-sanity.com/"],
        ["State of the Art in AI", "https://www.stateoftheart.ai/"],
        ["TDLS Classic Papers", "https://docs.google.com/spreadsheets/d/1PTaFyE2AsgTd0p7A5aHvEw0lLzw-9OXJC8Wa1Bg10ug"],
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