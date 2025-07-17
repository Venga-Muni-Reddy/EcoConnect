import { createSlice } from "@reduxjs/toolkit";

const TodoSlice = createSlice({
    name:'todo',
    initialState:[],
    reducers:{
        addTodo:(state,action)=>{state.push(action.payload)},
        removeTodo:(state,action)=>{state.splice(action.payload,1)}
    }
})

export const {addTodo,removeTodo} = TodoSlice.actions;
export default TodoSlice.reducer;