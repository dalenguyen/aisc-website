export function nameToLink(name, link) {
  if (!link) {
    return name;
  } else {
    return (
      <a key={name} className="person-name" href={link} target="_blank">
        {name}&nbsp;
        <i className="fa fa-linkedin-square"></i>
      </a>
    );
  }
}