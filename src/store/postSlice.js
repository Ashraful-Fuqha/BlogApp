import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts : [],
    status: true,
    error: null
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        getPostsLoading: (state, action) => {
            state.status = action.payload
        },

        getPostsLoaded: (state, action) => {
            state.status = false,
            state.posts.push(action.payload)
        },

        getPostsFailed : (state, action) => {
            state.status = false,
            state.error = action.payload
        }
    }
})

export const {getPostsLoading, getPostsLoaded, getPostsFailed} = postSlice.actions

export default postSlice.reducer