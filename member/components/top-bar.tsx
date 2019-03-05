import * as React from 'react';
import { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from './user-context-wrapper';
import Router from 'next/router';
import { ensureFirebase } from '../utils/firebase';
const firebase = ensureFirebase();


export default () => {
  const logout = async () => {
    await firebase.auth().signOut();
    Router.push('/login');
  }

  const user = useContext(AuthContext);
  return (
    user ? (
      <ul className="navbar-nav ml-auto">
        <div className="topbar-divider d-none d-sm-block"></div>
        {/* <!-- Nav Item - User Information --> */}
        <li className="nav-item dropdown no-arrow">
          <a className="nav-link dropdown-toggle"
            href="#" id="userDropdown" role="button"
            data-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              {user.displayName || user.email}
            </span>
            <img className="img-profile rounded-circle"
              src={user.photoURL || `https://source.unsplash.com/QAB-WJcbgJk/60x60`}
            />
          </a>
          {/* <!-- Dropdown - User Information --> */}
          <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="userDropdown">
            <a className="dropdown-item" href="#">
              <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
              Profile
                      </a>
            <a className="dropdown-item" href="#">
              <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
              Settings
                      </a>
            <a className="dropdown-item" href="#">
              <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
              Activity Log
                      </a>
            <div className="dropdown-divider"></div>
            <button
              className="dropdown-item"
              onClick={() => logout()}
            >
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              Logout
                  </button>
          </div>
        </li>
      </ul>) : (
        <Fragment>
          Not logged in
      </Fragment>
      )
  );
}