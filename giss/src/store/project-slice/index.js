
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState ={
    isLoading : false,
    projectList : [],
}

export const addNewProject = createAsyncThunk(
    'project/addNewProject',
    async (formData)=>{
        const result = await axios.post('http://localhost:5000/api/admin/projects/add',
            formData,
            {
                headers:{
                    "Content-Type": "application/json",
                }
            }
        )
        return result?.data;
    } 
)

export const fetchAllProjects = createAsyncThunk(
    'project/fetchAllProjects',
    async ()=>{
        const response = await axios.get('http://localhost:5000/api/admin/projects/get');
        return response?.data;
    }
)

export const deleteProject = createAsyncThunk(
    'project/deleteProject',
    async (id)=>{
        const response = await axios.delete(`http://localhost:5000/api/admin/projects/delete/${id}`);
        return response?.data;
    }
)

const AdminProductSlice = createSlice({
    name: 'adminProject',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(addNewProject.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(addNewProject.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.projectList = action.payload.data;
        })
        .addCase(addNewProject.rejected, (state)=>{
            state.isLoading = false;
            state.projectList = [];
        })
        .addCase(fetchAllProjects.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(fetchAllProjects.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.projectList = action.payload.data;
        })
        .addCase(fetchAllProjects.rejected, (state)=>{
            state.isLoading = false;
            state.projectList = [];
        })
    }
})

export default AdminProductSlice.reducer;