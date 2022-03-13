import { useRouter } from 'next/router'
import MainLoader from '../components/MainLoader';

import React, { useEffect, useState } from 'react';

import { Auth } from '../types';

const LS_KEY = 'login-with-metamask:auth';

interface State {
	auth?: Auth;
}

const Home = () => {
  const router = useRouter();
  const [state, setState] = useState<State>({});


	// const handleLoggedIn = (auth: Auth) => {
	// 	localStorage.setItem(LS_KEY, JSON.stringify(auth));
	// 	setState({ auth });
	// };

	// const handleLoggedOut = () => {
	// 	localStorage.removeItem(LS_KEY);
	// 	setState({ auth: undefined });
	// };

	const { auth } = state;


useEffect(()=> {
// Access token is stored in localstorage
const ls = window.localStorage.getItem(LS_KEY);
const auth = ls && JSON.parse(ls);
setState({ auth });

  if (typeof window !== 'undefined' && !auth) {
    router.push('/login');
  } else {
	router.push('/profile');
  }
},[auth, router])

return  <MainLoader  />

}

export default Home
