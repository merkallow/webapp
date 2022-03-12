import { combineReducers } from '@reduxjs/toolkit'
import user from './user'
import projects from './projects'

const reducer = combineReducers({
    user,
    projects,
   
  })
  
  export default reducer