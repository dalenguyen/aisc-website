import { useEffect, useState } from "react";
import * as React from 'react';
import Router from 'next/router'
import { ensureFirebase, authStateChecker } from '../utils/firebase';

const checkAuth = authStateChecker();
const firebase = ensureFirebase();

export const AuthContext = React.createContext<firebase.User | null>(null);

export default ({ children }: { children: React.ReactNode }) => {
  const [{ user }, setUserState] = useState<{ user: firebase.User | null }>(
    { user: null }
  );
  const checkLogin = async () => {

    const { currentUser: user } = await checkAuth(firebase.auth()) || { currentUser: null };
    if (!user || !user.email) {
      Router.push('/login');
    } else {
      setUserState({ user });
    }
  }

  useEffect(() => {
    checkLogin();
  }, [])

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  )
}