import io from 'socket.io-client';
import {
    SET_NAME,
    SET_SOCKET,
    JOIN_ROOM
} from '../actions/types';

const initialState = {
    name : {},
    socket : {},
    room: {}
}

export const personalReducer = (state = initialState, action ) => {
   switch (action.type) {

   case SET_NAME:
       state.name = action.payload
       return state

   case SET_SOCKET:
        state.socket = action.payload
        return state 

   case JOIN_ROOM:  
        console.log(action.payload)
       state.socket.emit('join', action.payload)
       state.room = state.socket.id
       return state     

   default:
       return state
   }
}