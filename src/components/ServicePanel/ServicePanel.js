import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import './ServicePanel.css';

import Chat from '../Chat/Chat';


const ServicePanel = ({location}) => {
    const socket = useSelector(state => state.personal.socket);
    const users = useSelector(state => state.users.users);
    const bot_users = useSelector(state => state.users.bot_users);
    const agent_users = useSelector(state => state.users.agent_users);

     useEffect(() => {

        socket.emit('getBotUsers', {} , (error) => {
             if(error) {
                 alert(error);
             }
        });
         socket.emit('getAgentUsers', {}, (error) => {
             if (error) {
                 alert(error);
             }
         });
    }, [location.search]);

    useEffect(() => {
        console.log(`use effect : ${users}`)
    }, [users])



    return (
    
        <div>
            <div id = "chat">
                <Chat />
            </div>
            <div id = "buttonContainer">
                <button className="showBotUser"> </button>
                <button className="showAgentUser"> </button>
            </div>
            <div className = "list">

    {/*users.map((user, i) => <button onClick={() => openChat(name === {user})}><div key={i}>{user}</div></button>)*/}
            users: {JSON.stringify(users)}
            </div>
        </div>
        
    );
}

export default ServicePanel;