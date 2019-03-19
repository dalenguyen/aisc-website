import venues from '../data/venue';

const venuesByName = fromEntries(venues.map(v => [v.name, v]));

export function venueToLink(name) {
  const v = venuesByName[name];
  if (!v) {
    return name;
  } else {
    return (
      <a className="venue-name" href={v.url} target="_blank">
        {v.name}&nbsp;<i className="fa fa-external-link"></i>
      </a>
    );
  }
}


function fromEntries(iterable) {
  return [...iterable]
    .reduce((obj, { 0: key, 1: val }) => Object.assign(obj, { [key]: val }), {})
}

