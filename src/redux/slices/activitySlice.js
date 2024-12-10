import { createSlice } from "@reduxjs/toolkit";

const activitySlice = createSlice({
    name: 'Activity',
    initialState:0,
    reducers: {
        incrementCount: (state,action)=>{
            state = state + action.payload
        }
    }
})
export const {incrementCount} = activitySlice.actions
export default activitySlice.reducer