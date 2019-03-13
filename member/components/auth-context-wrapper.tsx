import { useEffect, useState } from "react";
import * as React from 'react';
import Router from 'next/router'
import { authStateChecker } from '../utils/firebase';

const { waitOnAuth, logout, getAuth } = authStateChecker();

export const AuthContext = React.createContext<{
  user: firebase.User, logout: () => Promise<void>
} | null>(null);

export default ({ children }: { children: React.ReactNode }) => {
  const [{ user }, setUserState] = useState<{ user: firebase.User | null }>(
    { user: null }
  );
  const checkLogin = async () => {
    const user = await waitOnAuth() || null;
    setUserState({ user });

    if (!user || !user.email) {
      Router.push('/login');
    }
  }

  const subscribeToAuth = async () => {
    const auth = await getAuth();
    auth.onAuthStateChanged((user) => {
      setUserState({ user });
    });
  }

  useEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    subscribeToAuth();
  }, []);

  return (
    <AuthContext.Provider value={user && { user, logout } || null}>
      {children}
    </AuthContext.Provider>
  )
}