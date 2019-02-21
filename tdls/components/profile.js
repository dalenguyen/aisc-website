export function nameToLink(name, link) {
  if (!link) {
    return name;
  } else {
    return (
      <a key={name} className="person-name" href={link} target="_blank">
        {name}&nbsp;
        {icon(link)}
      </a>
    );
  }
}

function icon(link) {
  if (link.startsWith("https://www.linkedin.com/")) {
    return (
      <i className="fa fa-linkedin-square"></i>
    )
  } else {
    return (
      <i className="fa fa-external-link"></i>
    );
  }
}