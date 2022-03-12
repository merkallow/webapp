import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Web3 from 'web3';
import jwtDecode from 'jwt-decode';
import { Auth } from "../../types";

let web3: Web3 | undefined = undefined; // Will hold the web3 instance
const LS_KEY = 'login-with-metamask:auth';



export const createProjectAsync = createAsyncThunk(
  "project/create",
  async (publicAddress:string, { dispatch }) => {  
    try {

    
    return {};
    } catch (error) {     
    }
  }
);



export const getProjectAsync = createAsyncThunk(
    "project/get",
    async (accessToken:string) => {  
       
      try { 

        const  getProjects = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects`, {
            // body: JSON.stringify({name }),
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
            .then((response) => response.json())

            console.log('get projects', getProjects)
          if(getProjects.length ===0) return []
      return getProjects
      } catch (error) {     
      }
    }
  );




interface ProjectState {
   data:[] | any,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  }
  
  const initialState = {
    data:[],
    loading: 'idle',

  } as ProjectState

export const project = createSlice({
    name: "project",
    initialState,
    reducers:{
    },
   
    extraReducers: (builder) => {
      builder
        .addCase(createProjectAsync.pending, (state) => {
          state.loading = 'pending';   
        })
        .addCase(createProjectAsync.fulfilled, (state, {payload})=>{
         // state.user = payload?.details;
         // state.accessToken=payload?.accessToken
        })
        .addCase(createProjectAsync.rejected, (state, {payload})=>{
        //  state.user = {}
        })
        
        .addCase(getProjectAsync.pending, (state) => {
          state.loading = 'pending';   
        })
        .addCase(getProjectAsync.fulfilled, (state, {payload})=>{
            state.loading='idle'
         state.data = payload;
        })
        .addCase(getProjectAsync.rejected, (state, {payload})=>{
        //  state.user = {}
        })
        
    
    },
   });

  
export default project.reducer;