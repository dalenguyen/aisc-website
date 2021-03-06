import { Fragment } from "react";
import '../scss/grayscale.scss';

if (typeof window !== 'undefined') {
  require('jquery-slim');
  require('bootstrap');
}

export default () => {
  return (
    <Fragment>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <link
        href="https://fonts.googleapis.com/css?family=Varela+Round"
        rel="stylesheet"
      />
      <link rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
        integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
        crossOrigin="anonymous"
      />
      <link href="https://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet" />
    </Fragment>
  );
}