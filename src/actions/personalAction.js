import {
    SET_NAME,
    SET_SOCKET,
    JOIN_ROOM
} from './types';

//import { emitAction } from '../app/websockets/client';

export const setName = (letter) => {
    let name = [];
    name = [...name, letter]
    // socket.emit('join', {name})
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

export const joinRoom = (_roomId) => {


    return{
        type: JOIN_ROOM,
        payload: _roomId
    }
}


