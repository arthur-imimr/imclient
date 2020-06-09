import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import io from 'socket.io-client';

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import {joinRoom} from '../../actions/personalAction'


let socket;
const Chat = () => {
    const socket = useSelector(state => state.personal.socket);
    const name = useSelector(state => state.personal.name);
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000';
    const dispatch = useDispatch();
    useEffect(() => {

        //socket =  personal.socket;
        // // setRoom(room);
        // socket = io(ENDPOINT)
        dispatch(joinRoom(name[0]))
        // //name = name.trim().toString()
        // socket.emit('join', personal.name, (error) => {
        //     if(error) {
        //         alert(error);
        //     }
        // });

        return () => {
            socket.emit('disconnect');

            socket.off();
        }

    }, []);

    useEffect(() => {
        socket.on('message', (message) => {
             setMessages(messages => [...messages, message]);
         })

    }, []);


    // function for sending messages

    const sendMessage = (event) => {
        event.preventDefault();

        if(message) {
            socket.emit('sendMessage', message,  ()=>setMessage(''));
        }
    }

    return (
        <div className ="outerContainer">
            <div className = "chat">
                <InfoBar />
                <Messages messages={messages} name={socket.name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />                    
            </div>
        </div>
        
    );
}

export default Chat;
