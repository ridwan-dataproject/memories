// this file is used to communicate backend and client via api

import axios from 'axios'

// defined at server-> index.js, created at server->routes
const url = 'https://mernprojectmemories.herokuapp.com/posts'


// fetch api from database (backend server)
export const fetchPosts = () => axios.get(url)

// post or save new collection to database
export const createPost = (newPost) => axios.post(url, newPost)

// update a post using id
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost)

// delete a post using id
export const deletePost = (id) => axios.delete(`${url}/${id}`)


// count the likes of a post
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`)


/*
Client flow
accessing state: 
set up api from backend --> action creators --> 
--> fetching from db using async by redux thunk --> dispatch fetched data to reducers 
--> reducers --> combineReducers --> redux store using Provider 
--> imported to component --> execute using useSelector hook

example: Rendering posts list at Posts/Posts.js

calling action creator: 
set up api from backend --> action creators --> 
--> fetching from db using async by redux thunk --> dispatch fetched data to reducers 
--> reducers --> combineReducers --> redux store using Provider 
--> imported to component --> execute using useDispatch hook

example: rendering for the first time App.js to load Posts using getPosts(),
saving new post to database
*/