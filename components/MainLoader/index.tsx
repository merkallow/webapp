import { ReactNode, FC } from 'react'
import { TailSpin } from 'react-loader-spinner'




const MainLoader:FC = () => (  
    <div className='h-100 vh-100 d-flex justify-content-center align-items-center'>
<TailSpin ariaLabel="loading-indicator" />
</div>

   )

export default MainLoader;




