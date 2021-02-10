import { CREATE, FETCH_ALL, UPDATE, DELETE, LIKE } from '../constants/actionTypes'

// import api (fetched from backend server)
import * as api from '../api/index'

// import thunk as middleware so we can use async, import it at index.js


// action creators to fetch data and pass it into redux store
export const getPosts = () => async (dispatch) => { //thanks to redux-thunk to do this
    try {
        const { data } = await api.fetchPosts() // fetching from db

        dispatch({type: FETCH_ALL, payload: data}) // assigned the fetched data from db to dispatch --> redux store

    } catch (error) {
        console.log(error.message)
    }   
}

// action creators to post/save data and pass it into redux store
export const createPost = (post) => async (dispatch) => { //thanks to redux-thunk to do this
    try {
        const { data } = await api.createPost(post) // saving into db
        dispatch({type: CREATE, payload: data}) // assigned the fetched data from db to dispatch --> redux store
    } catch (error) {
        console.log(error.message)
    }
}


// action creators to update a post using id
export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post)
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

// action creator to delete a post using id
export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)
        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(error)
    }
}

// action creators to count the number of likes
export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id)
        dispatch({ type: LIKE, payload: data })
    } catch (error) {
        console.log(error)
    }
}