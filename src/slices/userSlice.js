import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name:'users',
    initialState:[],
    reducers:{
        addUser:(state,action)=>{
            return action.payload
        },
        deleteUser:(state,action)=>{
            return state.filter((user)=>user.id!==action.payload)
        },
        clearUsers:(state,action)=>{
            return []
        },
        searchUser: (state,action)=>{
            const searchTerm = action.payload.toLowerCase();
            const regex = new RegExp('.*' + searchTerm + '.*', 'i'); // 'i' flag for case-insensitive search
            return state.filter((user) =>
              regex.test(user.name) || regex.test(user.email) || regex.test(user.mobile)
            );
          }
    }
})

export const {addUser,deleteUser,clearUsers,searchUser} = userSlice.actions;

export default userSlice.reducer