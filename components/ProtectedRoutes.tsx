import { ReactNode, FC, useState, useMemo, useEffect } from 'react'
import jwtDecode from 'jwt-decode';
import { LS_KEY } from '../constants';

//import { useAuthContext } from "../contexts";

//check if you are on the client (browser) or server
const isBrowser = () => typeof window !== "undefined";

const LOGIN_PAGE = '/login'

type Props = { 
    children: ReactNode,
    // All other props
  [x:string]: any;
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

const ProtectedRoutes: FC<Props> = ({router, children}):any => {
    const [auth, setAuth] = useState<any>({
        accessToken:null
    })
    const authMem = useMemo(()=>auth?.accessToken, [auth])

    const [state, setState] = useState<State>({
		loading: false,
		user: undefined,
		username: '',
	});




  //Identify authenticated user
  //const { user } = useAuthContext();
  //window.localStorage.getItem(LS_KEY);
  
  const isAuthenticated = auth

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


  let unprotectedRoutes = [
    LOGIN_PAGE
  ];

  

  /**
   * @var pathIsProtected Checks if path exists in the unprotectedRoutes routes array
   */
  let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

  if (isBrowser() && !isAuthenticated && pathIsProtected) {
    router.push(LOGIN_PAGE);
  }

  return children;
};

export default ProtectedRoutes;