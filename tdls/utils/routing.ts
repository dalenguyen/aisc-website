import * as NProgress from 'nprogress';
import Router from 'next/router';
import 'nprogress/nprogress.css';

export default function configureLoadingProgressBar() {
  Router.onRouteChangeStart = () => NProgress.start();
  Router.onRouteChangeComplete = () => NProgress.done();
  Router.onRouteChangeError = () => NProgress.done();
}