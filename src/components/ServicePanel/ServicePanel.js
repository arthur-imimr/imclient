import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { useSelector, useDispatch } from "react-redux";

import './ServicePanel.css';

import ServiceChat from '../ServiceChat/ServiceChat';
import { addUser } from '../../actions/usersAction';

let socket;

const ServicePanel = ({location}) => {
    const [name, setName] = useState('');
    // const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    // const [messages, setMessages] = useState([]);
    // const [users, setUsers] = useState([]);
    const users = useSelector(state => state.users);
    const ENDPOINT = 'localhost:5000';
    const dispatch = useDispatch();
    

     useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit('requestList', {} , (error) => {
             if(error) {
                 alert(error);
             }
        });
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('usersList', ({users}) => {
            dispatch(addUser(users));

        })
    }, []);

    useEffect(() => {
        console.log(`use effect : ${users}`)
    }, [users])

     const openChat = (event) => {
         return "";
     }

    return (
    
        <div>
            <div id = "chat">
            </div>
            <div className = "list">
    {/*users.map((user, i) => <button onClick={() => openChat(name === {user})}><div key={i}>{user}</div></button>)*/}
            users: {JSON.stringify(users)}
            </div>
        </div>
        
    );
}

export default ServicePanel;