import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from 'next/app'
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../state";

function MyApp({ Component, pageProps }: AppProps) {
  return <> 
  <ReduxProvider store={store}>
    <Component {...pageProps} /> 
  </ReduxProvider>
    </>  
}

export default MyApp
