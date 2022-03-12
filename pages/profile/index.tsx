import React, { useEffect} from 'react';
import useLogout from '../../hooks/logout'
import {useSelector, useDispatch} from 'react-redux'
import { AppState } from '../../state';
import { getProjectAsync } from '../../state/projects';


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
	const {data, loading} = useSelector<AppState, AppState['project']>(state => state.projects)
	const token =  useSelector<AppState, AppState['user']['accessToken']>(state => state.user.accessToken)
	useEffect(()=> {
		if(!token) return;
		dispatch(getProjectAsync(token))
	},[token])
	if(loading ==='pending') return <p>Loading</p>
	if(data.length === 0) return <p>
		Create a project to get started
	</p>

	return (
		<div className="Profile">
			
			<div>
				<h1>Your Projects</h1>
				{
					data.map((item:Project)=> {
						return <>
							<p key={item.name}>
								{item?.name}
							</p>
						</>
					})
				}
			</div>
	
		</div>
	);
};


export default Profile


