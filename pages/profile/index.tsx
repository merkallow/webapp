import jwtDecode from 'jwt-decode';
import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router'
import { LS_KEY} from '../../constants'
import { Auth } from '../../types';
import useLogout from '../../hooks/logout'


interface Props {
	// auth: Auth;
	onLoggedOut: () => void;
}

interface State {
	loading: boolean;
	user?: {
		id: number;
		username: string;
	};
	username: string;
}

interface JwtDecoded {
	payload: {
		id: string;
		publicAddress: string;
	};
}


const Profile = (): JSX.Element => {
	const handleLoggedOut = useLogout()
	const [state, setState] = useState<State>({
		loading: false,
		user: undefined,
		username: '',
	});

    
    const [auth, setAuth] = useState<any>({
        accessToken:null
    })

    const authMem = useMemo(()=>auth?.accessToken, [auth])

	useEffect(() => {
        const ls = window.localStorage.getItem(LS_KEY);
        const authGen = ls && JSON.parse(ls);
        setAuth(authGen)
     
		const accessToken = auth?.accessToken ?? null;
        if(!accessToken) return;
		const {
			payload: { id },
		} = jwtDecode<JwtDecoded>(accessToken);

		fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
			.then((response) => response.json())
			.then((user) => setState({ ...state, user }))
			.catch(window.alert);
	}, [authMem]);

	
	const handleChange = ({
		target: { value },
	}: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, username: value });
	};

	const handleSubmit = () => {
		const { accessToken } = auth;
		const { user, username } = state;

		setState({ ...state, loading: true });

		if (!user) {
			window.alert(
				'The user id has not been fetched yet. Please try again in 5 seconds.'
			);
			return;
		}

		fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user.id}`, {
			body: JSON.stringify({ username }),
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			method: 'PATCH',
		})
			.then((response) => response.json())
			.then((user) => setState({ ...state, loading: false, user }))
			.catch((err) => {
				window.alert(err);
				setState({ ...state, loading: false });
			});
	};

    const [publicAddress, setPublicAddress] = useState('')
    
    useEffect(()=>{
		const accessToken = auth?.accessToken ?? null;
        
        if(!accessToken){
            return ;      
        }
        const {
            payload: { publicAddress:pubAddress },
        } = jwtDecode<JwtDecoded>(accessToken);

        setPublicAddress(pubAddress)

    },[authMem])


	const { loading, user } = state;

	const username = user && user.username;

	return (
		<div className="Profile">
			
			<div>
				My username is {username ? <pre>{username}</pre> : 'not set.'}{' '}
				My publicAddress is <pre>{publicAddress}</pre>
			</div>
			<div>
				<label htmlFor="username">Change username: </label>
				<input name="username" onChange={handleChange} />
				<button disabled={loading} onClick={handleSubmit}>
					Submit
				</button>
			</div>
	
		</div>
	);
};


export default Profile


