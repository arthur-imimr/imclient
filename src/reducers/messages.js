import {
    SET_MESSAGE,
    SEND_MESSAGE,
    LOAD_MESSAGES
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
        state.message = action.payload 
        return state

    //message is sent
    case SEND_MESSAGE:
        state.messages.push(state.message)
        state.socket.emit('sendMessage', state.message,  ()=>state.message = '');
        return state

    case LOAD_MESSAGES:
        return action.payload

    default:
        return state
    }
}
