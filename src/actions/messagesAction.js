import {
    SET_MESSAGE,
    ADD_MESSAGE,
    SET_MESSAGES
} from './types';

export const addMessage = (content) => {
    
    return {
    type: ADD_MESSAGE,
    payload: content
    }
}

export const setMessages = (messages) => ({
    type: SET_MESSAGES,
    payload: messages
})

export const setMessage = (content) => ({
    type: SET_MESSAGE,
    payload: content
})