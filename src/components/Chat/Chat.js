import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useParams} from 'react-router-dom';

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';


const Chat = () => {
    

    const socket = useSelector(state => state.personal.socket);
    const id = useSelector(state => state.personal.id);
    const messages = useSelector(state => state.messages.messages);
    const message = useSelector(state => state.messages.message);

    let { chatId } = useParams(); 
    const dispatch = useDispatch();

    chatId = chatId || id;
    useEffect(() => {
        console.log(`ownid:${id} chatid:${chatId}`);
        socket.emit('join', {roomId:chatId})

    }, [id]);


    // function for sending messages


    return (
       // <div className ="outerContainer">
            <div className="chat">

                <InfoBar chatId={chatId} />
                <Messages messages={messages}/>
                <Input chatId={chatId}/>                    
            </div>
       // </div>
        
    );
}

export default Chat;
