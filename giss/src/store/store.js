import { configureStore } from "@reduxjs/toolkit";

// Authentication
import authReducer from './auth-slice'

// Admin
import adminProjectReducer from './project-slice'


const store = configureStore({
    reducer:{
        auth: authReducer,
        adminProject: adminProjectReducer
    }
})

export default store;