import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchblogs = createAsyncThunk('fetchBlogs',async () =>{
    const respones = await fetch("https://onlinetestapi.gerasim.in/api/Blog/GetAllBlogs");
    return respones.data.data;
})
export const todoSlice = createSlice({
    name: "todo",
});
export default todoSlice.reducer;