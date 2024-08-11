import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  currentAdmin : null,
  error:null,
  loading:false
}


const adminSlice = createSlice({
  name : 'admin',
  initialState,
  reducers:{

    signInStart : (state)=>{
      state.loading = true,
      state.error = null
    },
    signInSuccess : (state,action)=>{
      state.loading = false,
      state.currentUser = action.payload,
      state.error = null
    },
    signInFailure : (state,action)=>{
      state.loading = false,
      state.error = action.payload
    },
    updateStart :(state)=>{
      state.loading = true,
      state.error = null
    },
    updateSuccess :(state,action)=>{
      state.currentUser = action.payload
      state.loading = false,
      state.error = null
    },
    updateFailure : (state,action)=>{
      state.loading = false,
      state.error = action.payload
    },
   
    signOutSuccess : (state)=>{
      state.currentUser = null,
      state.loading = false,
      state.error = null
    }

  }
})

export const {signInFailure,signInStart,signInSuccess ,updateFailure ,updateStart,updateSuccess,signOutSuccess} = adminSlice.actions;

export default adminSlice.reducer;
