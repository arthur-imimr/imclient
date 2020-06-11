
import {
    SET_NAME,
    SET_SOCKET,
    SET_ID,
    SET_CHAT_ID
} from '../actions/types';

const initialState = {
    name : {},
    socket : {},
    id: '',
    chatId: ''
}

export const personalReducer = (state = initialState, action ) => {
   switch (action.type) {
   case SET_ID:
       
       return {...state, id: action.payload}

   case SET_NAME:
       return {...state, name: action.payload}

   case SET_SOCKET:
        return {...state, socket: action.payload}; 

   case SET_CHAT_ID:
       return {...state, chatId: action.payload};

   default:
       return state
   }
}