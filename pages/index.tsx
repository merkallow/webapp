import { useRouter } from 'next/router'
import { TailSpin } from 'react-loader-spinner'

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
  
},[auth])

return (<>
<div className='h-100 vh-100 d-flex justify-content-center align-items-center'>
<TailSpin ariaLabel="loading-indicator" />
</div>
</>)

}

export default Home
