import {

    ADD_USER,
    REMOVE_USER,
    GET_BOT_USERS,
    GET_AGENT_USERS
} from './types';

export const addUser = (id) => ({
    type: ADD_USER,
    payload: id
})

export const removeUser = (id) => ({
    type: REMOVE_USER,
    payload: id
})

export const getBotUsers = ([bot_users]) => ({
    type: GET_BOT_USERS,
    payload: [bot_users]
})

export const getAgentUsers = ([agent_users]) => ({
    type: GET_AGENT_USERS,
    payload: [agent_users]
})

