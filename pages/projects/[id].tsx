import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../state'
import {getProjectDetailsAsync} from '../../state/projects'    

interface ProjectDetails {
	id:number,
	publicAddress:string,
	projecId:string
}


const Post = () => {
    const dispatch = useDispatch()
  const router = useRouter()
  const {loading, projectDetails} = useSelector<AppState, AppState['project']>(state => state.projects)
  const {accessToken} = useSelector<AppState, AppState['user']>(state => state.user)
  const { id } = router.query
  const dt ={
      accessToken,
      id:Number(id)
  }
  useEffect(()=>{
   dispatch(getProjectDetailsAsync(dt))
  },[])
  
if(loading ==='pending') return <p>Loading</p>
if(projectDetails.length === 0) return <p>Add Address to kickstart project
    <Link href="/projects/add-address">
          Add Address
        </Link>
     </p>

  return <div>
      Projects: {id}
      {
          projectDetails?.map((item:ProjectDetails) =>{
           return   <>
              <p>{ item.publicAddress}</p>
              </>
          })
      }
      </div>
}

export default Post