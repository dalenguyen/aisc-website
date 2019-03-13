import { useEffect, useState, useRef } from "react";
import * as React from 'react';
import Router from 'next/router'
import { authStateChecker } from '../utils/firebase';

const { waitOnAuth, logout, getAuth } = authStateChecker();

type AuthContext = {
  user: firebase.User, logout: () => Promise<void>
} | "checking" | null;

export const AuthContext = React.createContext<AuthContext>(null);

export default ({ children }: { children: React.ReactNode }) => {
  const [{ user }, setUserState] = useState<{
    user: firebase.User | "checking" | null
  }>(
    { user: 'checking' }
  );

  const prevUser = usePrevious(user);

  const checkLogin = async () => {
    const user = await waitOnAuth() || null;
    setUserState({ user });
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

  useEffect(() => {
    if (prevUser !== null && user === null) {
      // logged out
      Router.push('/login');
    }
  }, [user])

  let context: AuthContext;

  if (user === 'checking') {
    context = 'checking';
  } else if (user === null) {
    context = null;
  } else {
    context = { user, logout };
  }

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  )
}

function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}