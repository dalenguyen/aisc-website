import Link from 'next/link';
import { Fragment } from 'react';
import Header from '../components/header';
import firebase from 'firebase/app';
import Head from 'next/head';
import Meta from '../components/meta';


export default () => {
  const loginWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    const { user } = await firebase.auth().signInWithPopup(provider);
    if (user && !user.isAnonymous) {
      const { email } = user;
    }
  }

  return (
    <Fragment>
      <Head>
        <Meta />
      </Head>
      <Header />
      <div className="container">
        {/* <!-- Outer Row --> */}
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                {/* <!-- Nested Row within Card Body --> */}
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Member Area</h1>
                      </div>
                      <p>Use one of the methods below to log in.</p>
                      <form className="user">
                        <button
                          type="button"
                          role="button"
                          onClick={loginWithGoogle}
                          className="btn btn-google btn-user btn-block">
                          <i className="fab fa-google fa-fw"></i> Login with Google
                       </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </Fragment>
  )
}