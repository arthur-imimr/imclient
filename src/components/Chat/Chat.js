import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import io from 'socket.io-client';
import {setMessage} from '../../actions/messagesAction';

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

const Chat = ({location}) => {
    const socket = useSelector(state => state.personal.socket);
    const id = useSelector(state => state.personal.id);
    const name = useSelector(state => state.personal.name);
    const messages = useSelector(state => state.messages.messages);
    const message = useSelector(state => state.messages.message);

    const dispatch = useDispatch();

    useEffect(() => {

        socket.emit('join', {id})

    }, [name]);

    // function for sending messages

    const sendMessage = (event) => {
        event.preventDefault();

        if(message) {
        socket.emit('addMessage', {sessionId:id, message}, () => dispatch(setMessage('')));
        }

    }

    return (
        <div className ="outerContainer">
            <div className = "chat">
                <InfoBar />
                <Messages messages={messages}/>
                <Input sendMessage={sendMessage} />                    
            </div>
        </div>
        
    );
}

export default Chat;
