 import {
     ADD_USER,
     REMOVE_USER,
     SET_BOT_USERS,
     SET_AGENT_USERS

 } from '../actions/types';

const initialState = {
    users: [],
    bot_users : [],
    agent_users : []
}

export const usersReducer = (state = initialState, action ) => {
    switch (action.type) {

    case ADD_USER:
        return { ...state, users: [...state.users, ...action.payload] }

    case REMOVE_USER:
        const newUsersState = state.users.filter(action.payload)
        return { ...state, users: newUsersState}

    case SET_BOT_USERS:
        return { ...state, bot_users: action.payload}

    case SET_AGENT_USERS:
        return { ...state, agent_users: action.payload }
    
    default:
        return state
    }
}
