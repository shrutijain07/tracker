import { createSlice } from "@reduxjs/toolkit";

const activitySlice = createSlice({
    name: 'Activity',
    initialState:0,
    reducers: {
        incrementCount: (state,action)=>{
            return state + action.payload; // Explicitly return the new state
        }
    }
})
export const {incrementCount} = activitySlice.actions
export default activitySlice.reducer