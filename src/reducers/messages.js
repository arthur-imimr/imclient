import {
    SET_MESSAGE,
    ADD_MESSAGE,
    SET_MESSAGES
} from '../actions/types';
import { isSwitchStatement } from 'typescript';

const initialState = {
    message: '',
    messages : []
}

export const messagesReducer = (state = initialState, action) => {
    switch (action.type) {

    //message is set
    case SET_MESSAGE:
        //state.socket.emit('addCharacter', action.payload)
        return {...state, message: action.payload}

    
    //appending newest message object to messages array within state
    case ADD_MESSAGE:
        return {...state, messages: [ ...state.messages, action.payload ]}

    //overrides entire array with messages loaded from server
    case SET_MESSAGES:
        console.log(`overwriting entire array now`)
        return {...state, messages: action.payload}

    default:
        return state
    }
}
