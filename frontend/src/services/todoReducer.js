import { createSlice } from "@reduxjs/toolkit";

const initialState = { userName: "", id: "", title: "", tasks: [] };

const todoSlice = createSlice({
  name: "todoInfo",
  initialState,
  reducers: {
    updateTodoInfo: (state, action) => {
      const data = action.payload;
      state.userName = data.userName ? data.userName : state.userName;
      if(data.id){
        state.id = data.id;
        state.title = data.title;
        state.tasks = data.tasks;
      }
      return state;
    }
  },
});

export const { updateTodoInfo } = todoSlice.actions;
export default todoSlice.reducer;
