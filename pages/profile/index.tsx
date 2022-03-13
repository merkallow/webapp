import { Modal, Button } from 'react-bootstrap'
import React, { ChangeEvent, FormEvent, useEffect, useState} from 'react';
import useLogout from '../../hooks/logout'
import {useSelector, useDispatch} from 'react-redux'
import { AppState } from '../../state';
import { getProjectAsync, closeCreateModal, openCreateModal as openModalAction, createProjectAsync } from '../../state/projects';


interface Props {
	// auth: Auth;
	onLoggedOut: () => void;
}

interface Project {
	id:number,
	name:string,
	userId:string
}



const Profile = (): JSX.Element => {
	const dispatch = useDispatch()
	const {data, loading, openCreateModal} = useSelector<AppState, AppState['project']>(state => state.projects)
	const [name, setName] = useState<any>('')
	const token =  useSelector<AppState, AppState['user']['accessToken']>(state => state.user.accessToken)

	const handleClose = ()=> dispatch(closeCreateModal())
	const handleOpen =()=>dispatch(openModalAction())

	useEffect(()=> {
		if(!token) return;
		dispatch(getProjectAsync(token))
	},[token])
	if(loading ==='pending') return <p>Loading</p>
	if(data.length === 0) return <div>
		 <Modal show={openCreateModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Projects</Modal.Title>
        </Modal.Header>
        <Modal.Body>
			<input />
		</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
          Create
          </Button>
        </Modal.Footer>
      </Modal>

	<Button variant='primary' onClick={handleOpen} >
		Create a project to get started
		</Button>	
		
	</div>

const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
	setName(e.target.value)
}

const handleSubmit = (e:FormEvent)=>{
	e.preventDefault()
	const data= {name, accessToken:token}
	dispatch(createProjectAsync(data))
}
	return (
		<div className="Profile">
			 <Modal show={openCreateModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Projects</Modal.Title>
        </Modal.Header>
			<form onSubmit={handleSubmit}>
        <Modal.Body>
			<input onChange={handleChange} value={name} />
		</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit} >
          Create sdd
          </Button>
        </Modal.Footer>
			</form>
      </Modal>

			<div>
			<Button variant='primary' onClick={handleOpen} >
		Create a project to get started
		</Button>	

				<h1>Your Projects</h1>
				{
					data.map((item:Project)=> {
						return <>
							<p key={item?.id}>
								{item?.name}
								<Button  className='mx-2' variant='success'>Generate </Button>
							</p>
						</>
					})
				}
			</div>
	
		</div>
	);
};


export default Profile


