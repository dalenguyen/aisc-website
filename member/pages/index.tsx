import Link from 'next/link';
import Head from 'next/head';
import Meta from '../components/meta';
import { Fragment } from 'react';

export default () => {
  return (
    <Fragment>
      <Head>
        <Meta />
      </Head>
      <Link href="/login">
        <a>Login</a>
      </Link>
    </Fragment>
  )
}