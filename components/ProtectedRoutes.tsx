import { ReactNode, FC, useState, useMemo, useEffect } from 'react'
import jwtDecode from 'jwt-decode';
import { LS_KEY } from '../constants';
import { AppState } from '../state';
import { useSelector, useDispatch } from 'react-redux';

//import { useAuthContext } from "../contexts";

//check if you are on the client (browser) or server
const isBrowser = () => typeof window !== "undefined";

const LOGIN_PAGE = '/login'

type Props = { 
    children: ReactNode,
    // All other props
  [x:string]: any;
   }

 

const ProtectedRoutes: FC<Props> = ({router, children}):any => {
  
    const  user = useSelector<AppState, AppState['user']['accessToken']>(state => state.user.accessToken)
  const isAuthenticated = user



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