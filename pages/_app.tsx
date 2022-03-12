import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from 'next/app'
import { Provider as ReduxProvider } from "react-redux";
import  store  from "../state";
import Header from '../components/Header';
import ProtectedRoutes from '../components/ProtectedRoutes';

function MyApp({ Component, pageProps, router }: AppProps) {
  return <> 
    <ReduxProvider store={store}>
  <Header />
  <ProtectedRoutes router = {router}>
    <Component {...pageProps} /> 
 
  </ProtectedRoutes>
  </ReduxProvider>
    </>  
}

export default MyApp
