import React, { useEffect } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import {v4 as uuid} from 'uuid';
import {setId, setSocket} from './actions/personalAction'
import io from 'socket.io-client'
import {addMessage, setMessages} from './actions/messagesAction'
import {setAgentUsers, setBotUsers} from './actions/usersAction'

import {useSelector, useDispatch} from 'react-redux';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import ServicePanel from './components/ServicePanel/ServicePanel';

const App = () => {
    const id = useSelector(state => state.personal.id);
    const messages =useSelector(state=> state.messages.messages);
    const dispatch = useDispatch();
    const setName = useSelector(state => state.personal.name);
    const chatId = useSelector(state => state.personal.chatId);

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
            let agentJoined = false;

            socket.on('connect', () => {
                console.log("connected to the server");
            });

            socket.on('disconnect', () => {
                console.log("disconnected from the server");
            });


            socket.on('addMessageResponse', (content) => {
                dispatch(addMessage({
                    id: content.id,
                    userId: content.userId,
                    roomId: content.roomId,
                    content: content.content,
                    createdAt: content.createdAt}));
                
            })


            //LISTENER adduserresponse
            //on adduser, dispatch getagent and getbot users


            //load old messages on room join
            socket.on('joinResponse', ({id, name}) => {
                console.log(name);
                //user detects service join
                
                if (name==true) { 


                    console.log(`responding to self join`)
                    dispatch(addMessage({ id, userId: `System Message`, roomId: id, content: ` Agent has joined ${id}`, createdAt: Date.now().toString() }))
                    
                }
                //user first join
                else {
                    console.log(`responding to agent join`)
                    
                    if (!agentJoined) {
                    dispatch(addMessage({ id, userId: `System Message`, roomId: id, content: ` An agent joined room ${id}`, createdAt: Date.now().toString() }))
                    agentJoined = true;
                    }

                }
            })

            socket.on('getMessagesByRoomIdResponse', ({content}) => {
                console.log(`proc message load`)
                dispatch(setMessages(content))
            })

            //load user lists on service page load
            socket.on('getAgentUsersResponse', ({ users }) => {
                dispatch(setAgentUsers(users));
            })

            socket.on('getBotUsersResponse', ({ users }) => {
                dispatch(setBotUsers(users));
            })

            socket.on('addAudioResponse', ({payload}) => {
                
                socket.emit('getAudio', {dataId: payload.dataId});

                socket.on('getAudioResponse', ({data}) => {
                    dispatch(addMessage({
                        id: payload.id,
                        userId: payload.userId,
                        roomId: payload.roomId,
                        content: data,
                        createdAt: payload.createdAt
                    }));

                })
            })

            


            dispatch(setSocket(socket));

            return () => {
                socket.disconnect();
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
