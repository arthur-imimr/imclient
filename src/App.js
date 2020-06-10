import React, { useEffect } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import {v4 as uuid} from 'uuid';
import {setId, setSocket} from './actions/personalAction'
import io from 'socket.io-client'
import {setMessages} from './actions/messagesAction'
import {setAgentUsers, setBotUsers} from './actions/usersAction'

import {useSelector, useDispatch} from 'react-redux';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import ServicePanel from './components/ServicePanel/ServicePanel';

const App = () => {
    const id = useSelector(state => state.personal.id);
    const dispatch = useDispatch();
    //const id = useSelector(state => state.personal.id);

    useEffect(() => {   
        const id = Cookies.get('client_id');

        if (id) {
            dispatch(setId(id));
        }
        else { 
            const gen = uuid();
            Cookies.set("client_id", gen);
            dispatch(setId(id));
        }
    }, [])

    useEffect(() => {
        if (id) {
            const socket = io('http://localhost:5000');

            socket.on('connect', () => {
                console.log("connected to the server");
            });

            socket.on('disconnect', () => {
                console.log("disconnected from the server");
            });

            //on adding message
            socket.on('addMessageResponse', (message) => {
                dispatch(setMessages({user:message.user, content:message.content}));
            })


            //LISTENER adduserresponse
            //on adduser, dispatch getagent and getbot users


            //load old messages on room join
            socket.on('joinResponse', (name, room) => {
                socket.emit('getMessagesByRoomId', {sessionId:id});
                dispatch(setMessages({user:`System`, content:`${name} has joined Room ${room}`}))
            })
            
            socket.on('getMessagesByRoomId', (messages) => {
                dispatch(setMessages({user:messages[1], content:messages[3]}))
            })

            //load user lists on service page load
            socket.on('getAgentUsersResponse', ({users}) => {
                dispatch(setAgentUsers(users));
            })
                        
            socket.on('getBotUsersResponse', ({ users }) => {
                dispatch(setBotUsers(users));
            })

        

            dispatch(setSocket(socket));

            return () => {
                socket.disconnect();

                socket.off()
            }
        }
    }, [id]);

    return (
    <Router>
        <Route path ="/" exact component={Join} />
        <Route path ="/chat" component={Chat} />
        <Route path ="/service" component={ServicePanel} />
    </Router>
    )
};

export default App;
