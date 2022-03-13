import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Web3 from 'web3';
import axios from 'axios'
import jwtDecode from 'jwt-decode';
import { Auth } from "../../types";

let web3: Web3 | undefined = undefined; // Will hold the web3 instance


type CreatePro ={
    name:string,
    accessToken:string
}
export const createProjectAsync = createAsyncThunk(
  "project/create",
  async (data:CreatePro, { dispatch }) => { 
      const {name, accessToken} = data 
      
      const  createProjects = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects`,
      {name}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }
      )

const dat = createProjects?.data
     return dat

    
    


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

           
          if(getProjects.length ===0) return []
      return getProjects
      } catch (error) {     
      }
    }
  );




interface ProjectState {
   data:[] | any,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    openCreateModal:Boolean,
    crud:Boolean

  }
  
  const initialState = {
    data:[],
    loading: 'idle',
    openCreateModal:false,
    crud:false

  } as ProjectState

export const project = createSlice({
    name: "project",
    initialState,
    reducers:{
        openCreateModal:(state)=>{
            state.openCreateModal = true
        },
        closeCreateModal:(state)=>{
            state.openCreateModal = false
        }
    },
   
    extraReducers: (builder) => {
      builder
        .addCase(createProjectAsync.pending, (state) => {
          state.crud = true;   
        })
        .addCase(createProjectAsync.fulfilled, (state, {payload})=>{
            const copyState = state.data
            state.data = [...copyState, payload]
            state.openCreateModal= false
            state.crud = false
        })
        .addCase(createProjectAsync.rejected, (state, {payload})=>{
            state.crud = false
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

   export const {closeCreateModal, openCreateModal } = project.actions

  
export default project.reducer;