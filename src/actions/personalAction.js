import {
    SET_NAME,
    SET_SOCKET,
    SET_ID
} from './types';

export const setName = (letter) => {
    let name = [];
    name = [...name, letter]
    return {
    type: SET_NAME,
    payload: name
    }
}

export const setSocket = (_socket) => {
    
        //socket = io("localhost:5000");
    return {
    type: SET_SOCKET,
    payload: _socket
    }
}

export const setId = (id) => ({
    type:SET_ID,
    payload:id
})


