import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAsync } from '../../state/user';
import { AppState } from '../../state';

import { Auth } from '../../types';
import Button from '../../components/Button';
import MainLoader from '../../components/MainLoader';

const LS_KEY = 'login-with-metamask:auth';

interface Props {
	onLoggedIn: (auth: Auth) => void;
}

let web3: Web3 | undefined = undefined; // Will hold the web3 instance

const Login : NextPage = () => {
	const dispatch = useDispatch()
	const { loggedIn,  loading, crud } = useSelector<AppState, AppState['user']>(state=> state?.user)
    const router = useRouter()

//	const [loading, setLoading] = useState(false); // Loading button state

	useEffect(()=>{
		if(loggedIn) router.push('/profile')
	},[loggedIn])
	const handleClick = async () => {
		// Check if MetaMask is installed
		if (!(window).ethereum) {
			window.alert('Please install MetaMask first.');
			return;
		}

		if (!web3) {
			try {
				// Request account access if needed
				await (window).ethereum.enable();

				// We don't know window.web3 version, so we use our own instance of Web3
				// with the injected provider given by MetaMask
				web3 = new Web3((window).ethereum);
			} catch (error) {
				window.alert('You need to allow MetaMask.');
				return;
			}
		}

		
		const coinbase = await web3.eth.getCoinbase();
		if (!coinbase) {
				window.alert('Please activate MetaMask first.');
				return;
			}
			
		const publicAddress = coinbase.toLowerCase();
			dispatch(loginUserAsync(publicAddress))
           
	
	};

	const ongoingCrud = crud ==='pending'
	if(loading ==='pending') return <MainLoader />
	return (
		<div className='d-flex justify-content-center align-items-center text-center' style={{
			height:'80vh'
		}}>
			<div>
			<p>
			Whew! No email or password to remember
				<br />
				only MetaMask is needed to login
			</p>
			<Button onClick={handleClick} disabled={ongoingCrud} style={{opacity:`${ongoingCrud ? '0.5':'1'}`}}>
			{ongoingCrud ? 'Loading...' : 'Login with MetaMask'}
			</Button>
			</div>
		
		</div>
	);
};


export default Login
