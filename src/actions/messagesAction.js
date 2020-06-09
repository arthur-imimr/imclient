import {
    ADD_MESSAGE,
    LOAD_MESSAGES
} from './types';

export const addMessage = ({user, content}) => ({
    type: ADD_MESSAGE,
    payload: {user, content}
})

export const loadMessages = (messages) => ({
    type: LOAD_MESSAGES,
    payload: messages
})