import { Fragment } from 'react';
import SharedThemes from '../shared/shared-themes';

export default () => (
  <Fragment>
    <SharedThemes />
    <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
    <link href="/static/modal-video.css" rel="stylesheet" />
    <link href="/static/main.css" rel="stylesheet" />
    <link rel="icon" type="image/png" href="/static/images/tdls_logo.png" />
  </Fragment>
);
