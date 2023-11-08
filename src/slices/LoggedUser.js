import { createSlice } from "@reduxjs/toolkit";

const loggedUser = createSlice({
  name: "userData",
  initialState: {},
  reducers: {
    addLoggedUser: (state, action) => {
      return action.payload
    },
  },
});  

export const { addLoggedUser} = loggedUser.actions;
export default loggedUser.reducer;