import {
    ADD_USER,
    REMOVE_USER,
    SET_BOT_USERS,
    SET_AGENT_USERS
} from './types';

export const addUser = (user) => ({
    type: ADD_USER,
    payload: user
})

export const removeUser = (id) => ({
    type: REMOVE_USER,
    payload: id
})

export const setBotUsers = (bot_users) => ({
    type: SET_BOT_USERS,
    payload: bot_users
})

export const setAgentUsers = (agent_users) => ({
    type: SET_AGENT_USERS,
    payload: agent_users
})

