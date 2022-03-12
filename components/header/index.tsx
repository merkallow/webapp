import { ReactNode, FC } from 'react'
import styled from "styled-components";
import Blockies from 'react-blockies'
import Button from '../Button';
import useLogout from '../../hooks/logout';


type Props = { 
    // All other props
  [x:string]: any;
   }
const Header: FC<Props> = ({...rest}) => {
  const {handleLoggedOut, loggingOut} = useLogout()
  return (
    <div  {...rest} className='d-flex justify-content-between p-2' >
      <div className='d-flex align-items-center'>Merkallow</div>
      <div className='d-flex '>
        <Blockies seed={''}  className='rounded'/>
        <Button className='mx-2' onClick={handleLoggedOut} style={{opacity:`${loggingOut ? '0.5':'1'}`}}>
        {
          loggingOut ? 'Logging out'
          :
          'Logout'
        }
        </Button>

      </div>
    </div>
  )
}

export default Header;
