import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAsync } from '../../state/user';
import { AppState } from '../../state';

import { Auth } from '../../types';
import Button from '../../components/Button';

const LS_KEY = 'login-with-metamask:auth';

interface Props {
	onLoggedIn: (auth: Auth) => void;
}

let web3: Web3 | undefined = undefined; // Will hold the web3 instance

const Login : NextPage = () => {
	const dispatch = useDispatch()

	// const {
	// 	user,
	
	//   } = useSelector((state:AppState) => state);

	useEffect(()=>{
	//	dispatch(loginUserAsync())
	},[])
	// console.log('userss', user)

	// useEffect(() => {
	// 	id && dispatch(getInheritorsAsync(address));
	//   }, [address, dispatch, id]);


    const router = useRouter()
    // const onLoggedIn = (auth:Auth)=>{
    //     localStorage.setItem(LS_KEY, JSON.stringify(auth));
		
    //     router.push('/profile')
    // }
	const [loading, setLoading] = useState(false); // Loading button state

	// const handleAuthenticate = ({
	// 	publicAddress,
	// 	signature,
	// }: any) =>
	// // {
	// //	publicAddress: string;
	// //	signature: string;
	// // }
	// 	fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`, {
	// 		body: JSON.stringify({ publicAddress, signature }),
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		method: 'POST',
	// 	}).then((response) => response.json());

	// const handleSignMessage = async ({
	// 	publicAddress,
	// 	nonce,
	// }: {
	// 	publicAddress: string;
	// 	nonce: string;
	// }) => {
	// 	try {
	// 		const signature = await web3?.eth.personal.sign(
	// 			`I am signing my one-time nonce: ${nonce}`,
	// 			publicAddress,
	// 			'' // MetaMask will ignore the password argument here
	// 		);

	// 		return { publicAddress, signature };
	// 	} catch (err) {
	// 		throw new Error(
	// 			'You need to sign the message to be able to log in.'
	// 		);
	// 	}
	// };

	// const handleSignup = (publicAddress: string) =>
	// 	fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
	// 		body: JSON.stringify({ publicAddress }),
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		method: 'POST',
	// 	}).then((response) => response.json());

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
	//	setLoading(true);

		// Look if user with current publicAddress is already present on backend
		// fetch(
		// 	`${process.env.NEXT_PUBLIC_BACKEND_URL}/users?publicAddress=${publicAddress}`
		// )
		// 	.then((response) => response.json())
		// 	// If yes, retrieve it. If no, create it.
		// 	.then((users) => {
             
        //       return  users.length ? users[0] : handleSignup(publicAddress)
        //     }
           
		// 	)
		// 	// Popup MetaMask confirmation modal to sign message
		// 	.then(handleSignMessage)
		// 	// Send signature to backend on the /auth route
		// 	.then(handleAuthenticate)
		// 	// Pass accessToken back to parent component (to save it in localStorage)
		// 	.then(onLoggedIn)
		// 	.catch((err) => {
		// 		window.alert(err);
		// 		setLoading(false);
		// 	});
	};

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
			<Button onClick={handleClick} disabled={loading} style={{opacity:`${loading ? '0.5':'1'}`}}>
			{loading ? 'Loading...' : 'Login with MetaMask'}
			</Button>
			</div>
		
		</div>
	);
};


export default Login
