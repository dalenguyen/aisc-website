
export function getYouTubeId(url: string) {
  if (!url) {
    return null;
  }
  const frags = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (frags[2] !== undefined) {
    const id = frags[2].split(/[^0-9a-z_\-]/i)[0];
    return id;
  } else {
    return url;
  }
}


export function ytThumb(url: string) {
  const id = getYouTubeId(url);
  return `https://img.youtube.com/vi/${id}/0.jpg`;
}
