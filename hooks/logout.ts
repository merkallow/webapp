import { useRouter } from 'next/router'
import { LS_KEY } from '../constants';
import { useState } from 'react';


export const useLogout = ()=>{
    const [loggingOut, setLoggingOut] = useState<Boolean>(false)
    const router = useRouter()
    const handleLoggedOut = () => {
        setLoggingOut(true)
        localStorage.removeItem(LS_KEY);
        setLoggingOut(false)
        router.push('./login')

    }

    return {handleLoggedOut, loggingOut};
}

export default useLogout;