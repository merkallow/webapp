import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'

import React, { useEffect, useState } from 'react';

// import { Login } from '../Login';
// import { Profile } from '../Profile/Profile';
import { Auth } from '../types';

const LS_KEY = 'login-with-metamask:auth';

interface State {
	auth?: Auth;
}

const Home = () => {
  const router = useRouter();
  const [state, setState] = useState<State>({});

	useEffect(() => {
		// Access token is stored in localstorage
		const ls = window.localStorage.getItem(LS_KEY);
		const auth = ls && JSON.parse(ls);
		setState({ auth });
	}, []);

	const handleLoggedIn = (auth: Auth) => {
		localStorage.setItem(LS_KEY, JSON.stringify(auth));
		setState({ auth });
	};

	const handleLoggedOut = () => {
		localStorage.removeItem(LS_KEY);
		setState({ auth: undefined });
	};

	const { auth } = state;

  if (typeof window !== 'undefined' && !auth) {
  router.push('/login');
}

useEffect(()=> {

  if (typeof window !== 'undefined' && !auth) {
    router.push('/login');
  }
  router.push('/profile');
},[auth])

return "Loading, pls wait..."

}

export default Home
