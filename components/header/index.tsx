import { ReactNode, FC, useEffect } from 'react'
import styled from "styled-components";
import Blockies from 'react-blockies'
import Button from '../Button';
import {useSelector, useDispatch}  from 'react-redux'
import { logoutOut } from '../../state/user'
import { AppState } from '../../state';
import { useRouter } from 'next/router';


type Props = { 
    // All other props
  [x:string]: any;
   }
const Header: FC<Props> = ({...rest}) => {
  const router = useRouter()
  const {loggedIn, crud} = useSelector<AppState, AppState['user']>(state => state.user)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(loggedIn===false) router.push('./login')
  }, [loggedIn])

  const handleLoggedOut  = ()=> dispatch(logoutOut())

  return (
    <div  {...rest} className='d-flex justify-content-between p-2' >
      <div className='d-flex align-items-center'>Merkallow</div>
      <div className='d-flex '>
        <Blockies seed={''}  className='rounded'/>
        <Button className='mx-2' onClick={handleLoggedOut} style={{opacity:`${crud==='pending' ? '0.5':'1'}`}}>
        {
         loggedIn ? 'Logout'
          :
          'Login'
        }
        </Button>

      </div>
    </div>
  )
}

export default Header;
