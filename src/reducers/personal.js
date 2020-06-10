
import {
    SET_NAME,
    SET_SOCKET,
    SET_ID
} from '../actions/types';

const initialState = {
    name : {},
    socket : {},
    id: {}
}

export const personalReducer = (state = initialState, action ) => {
   switch (action.type) {
   case SET_ID:
       state.id = action.payload
       return state

   case SET_NAME:
       state.name = action.payload
       return state

   case SET_SOCKET:
        state.socket = action.payload
        return state 

   default:
       return state
   }
}