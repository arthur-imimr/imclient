import {
    SET_MESSAGE,
    SEND_MESSAGE,
    SET_MESSAGES
} from '../actions/types';
import { isSwitchStatement } from 'typescript';

const initialState = {
    message: '',
    messages : [{user:'', content:''}]
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
        console.log(state);
        state.messages.push(state.message)
        return state

    case SET_MESSAGES:
        state.messages.push(action.payload)
        return state

    default:
        return state
    }
}
