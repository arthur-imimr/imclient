import {
    SET_MESSAGE,
    SEND_MESSAGE,
    LOAD_MESSAGES
} from './types';

export const sendMessage = (event) => {
    event.preventDefault()
    return {
    type: SEND_MESSAGE,
    payload: event
    }
}

export const loadMessages = (messages) => ({
    type: LOAD_MESSAGES,
    payload: messages
})

export const setMessage = (content) => ({
    type: SET_MESSAGE,
    payload: content
})