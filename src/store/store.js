import {configureStore} from '@reduxjs/toolkit'
import userSlice from '../slices/userSlice'
import LoggedUser from '../slices/LoggedUser'

export const store = configureStore({
    reducer:{
        users:userSlice,
        loggedUsers:LoggedUser
    }
})