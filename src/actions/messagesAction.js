import {
    SET_MESSAGE,
    SEND_MESSAGE,
    SET_MESSAGES
} from './types';

export const sendMessage = (event, user, content) => {
    event.preventDefault()
    
    return {
    type: SEND_MESSAGE,
    payload: {user, content}
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