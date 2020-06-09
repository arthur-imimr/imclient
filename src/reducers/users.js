 import {
     ADD_USER,
     REMOVE_USER,
     GET_AGENT_USERS,
     GET_BOT_USERS

 } from '../actions/types';

export const usersReducer = (state = {}, action ) => {
    switch (action.type) {

    case ADD_USER:
        return { ...state, ...action.payload }

    case REMOVE_USER:
        return { ...state, ...action.payload }

    case GET_AGENT_USERS:
        return { ...state, ...action.payload }

    case GET_BOT_USERS:
        return { ...state, ...action.payload }
    
    default:
        return state
    }
}
