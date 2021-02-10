import Posts from "../components/Posts/Posts"
import { CREATE, FETCH_ALL, UPDATE, DELETE, LIKE } from '../constants/actionTypes'

export default (state=[], action) => {
    switch (action.type) {
        case DELETE:
            return state.filter((post) => post._id !== action.payload)
        case UPDATE:
        case LIKE:
            return state.map((post) => post._id === action.payload._id ? action.payload : post)
        case FETCH_ALL:
            return action.payload // fetch posts
        case CREATE:
            return [...state, action.payload]
        default:
            return state
    }
}