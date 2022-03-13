import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { addListToProjectAsync } from '../../../state/projects'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../../state'




const AddAddress = () => {
    const [addressList, setAddressList] = useState<any>([''])
    const dispatch = useDispatch()
    const accessToken = useSelector<AppState >(state => state.user.accessToken)
    const {crud} = useSelector<AppState, AppState['projects']>(state => state.projects)

    const handleAdd = ()=>{
 const copy =[...addressList, '']
    setAddressList(copy)
    }

    const handleSubmit =(e:FormEvent)=>{
        e.preventDefault()
        const data = {
            addresses:addressList,
            accessToken,
        } as {
            addresses:string[],
            accessToken:string
        }

        dispatch(addListToProjectAsync(data))
    }

    const handleChange =(e:ChangeEvent<HTMLInputElement>, idx:number)=>{
        let copy =[...addressList]
       copy[idx] = e.target.value
       setAddressList(copy)
    }

    const handleRemove = (idx:number)=>{
        const copy = [...addressList]
        console.log(copy)
        setAddressList(copy)
    }
 
  return <div>
     Add Address to Projects <button onClick={handleAdd}>+ </button>
     <br />
     <form  onSubmit={handleSubmit}>
    
      {
          addressList.map((i:string, idx:number )=>{
           return (<>
           <div className='my-2'> <input onChange={(e)=>handleChange(e,idx )} value={addressList[idx]} /> <button type='button' onClick={()=>handleRemove(idx)}>X</button></div>
           </>)
          })
      }

      <button disabled={crud}>{crud ? 'sending': 'submit'}</button>
      </form>
      </div>
}

export default AddAddress