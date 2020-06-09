import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './ServiceChat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import Message from '../Messages/Message/Message';

let socket;

const ServiceChat = ({name}) => {
    //const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const ENDPOINT = 'localhost:5000';
    // useEffect(() => {
    //     const { name } = "service operator";

    //     socket = io(ENDPOINT);
    //     setName(name);
    //     // setRoom(room);

    //     socket.emit('join', { name }, (error) => {
    //         if(error) {
    //             alert(error);
    //         }
    //     });

    //     return () => {
    //         socket.emit('disconnect');

    //         socket.off();
    //     }

    // }, [ENDPOINT, location.search]);

    // useEffect(() => {
    //     socket.on('message', (message) => {
    //         setMessages(messages => [...messages, message]);
    //     })

    // }, []);



    // function for sending messages

    const sendMessage = (event) => {
        event.preventDefault();

        if(message) {
            socket.emit('sendMessage', message,  ()=>setMessage(''));
        }
    }

    return (
            <div className = "chat">
                <InfoBar />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />                    
            </div>
    );
}

export default ServiceChat;