import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Web3 from 'web3';
import jwtDecode from 'jwt-decode';
import { Auth } from "../../types";

let web3: Web3 | undefined = undefined; // Will hold the web3 instance
const LS_KEY = 'login-with-metamask:auth';

interface JwtDecoded {
	payload: {
		id: string;
		publicAddress: string;
	};
}

const handleAuthenticate = ({
  publicAddress,
  signature,
}: any) =>
// {
//	publicAddress: string;
//	signature: string;
// }
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`, {
    body: JSON.stringify({ publicAddress, signature }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }
  )
  .then((response) =>  {
    return response.json()
  });

  const handleSignMessage = async ({
		publicAddress,
		nonce,
	}: {
		publicAddress: string;
		nonce: string;
	}) => {
    web3 = new Web3((window).ethereum);
		try {
    	const signature = await web3?.eth.personal.sign(
				`I am signing my one-time nonce: ${nonce}`,
				publicAddress,
				'' // MetaMask will ignore the password argument here
			);

      
			return { publicAddress, signature };
		} catch (err) {
			throw new Error(
				'You need to sign the message to be able to log in.'
			);
		}
	};

	const handleSignup = (publicAddress: string) =>
		fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
			body: JSON.stringify({ publicAddress }),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		}).then((response) => response.json());

    const onLoggedIn = (auth:Auth)=>{
      localStorage.setItem(LS_KEY, JSON.stringify(auth));
  
     // router.push('/profile')
  }

export const loginUserAsync = createAsyncThunk(
  "users/auth-login",
  async (publicAddress:string, { dispatch }) => {  
    try {

          	// Look if user with current publicAddress is already present on backend
	const response = await	fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/users?publicAddress=${publicAddress}`
		)
			.then((response) => response.json())
			// If yes, retrieve it. If no, create it.
			.then((users) => {
              return  users.length ? users[0] : handleSignup(publicAddress)
            }
           
			)
			// Popup MetaMask confirmation modal to sign message
			.then(handleSignMessage)
			// Send signature to backend on the /auth route
			.then(handleAuthenticate)
			// Pass accessToken back to parent component (to save it in localStorage)
			// .then(onLoggedIn)
			.catch((err) => {
				window.alert(err);
			//	setLoading(false);
			});
const accessToken = response?.accessToken ?? null
  
if(!accessToken) {
  //
}
 
const {
  payload: { id },
} = jwtDecode<JwtDecoded>(accessToken);

const  userDetails = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
})
  .then((response) => response.json())
  .catch(window.alert);
    return {accessToken, details:userDetails};
    } catch (error) {
      

      
    }
  }
);


interface UsersState {
    user:{
      id:number,
      nonce:number,
      publicNumber:string,
      username:string | null
    }
    accessToken:string | null
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  }
  
  const initialState = {
    user:{},
    accessToken:null,
    loading: 'idle',
  } as UsersState

export const user = createSlice({
    name: "auth",
    initialState,
    reducers:{
    logoutOut:(state)=>{

    }
    },
   
    extraReducers: (builder) => {
      builder
        .addCase(loginUserAsync.pending, (state) => {
          state.loading = 'pending';   
        })
        .addCase(loginUserAsync.fulfilled, (state, {payload})=>{
          state.user = payload?.details;
          state.accessToken=payload?.accessToken
        })
        .addCase(loginUserAsync.rejected, (state, {payload})=>{
        //  state.user = {}
        })
        
    
    },
   });

  
export default user.reducer;