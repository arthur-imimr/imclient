import React, { useEffect } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import {v4 as uuid} from 'uuid';
import {setId, setSocket} from './actions/personalAction'
import io from 'socket.io-client'
import {addMessage, setMessages} from './actions/messagesAction'
import {setAgentUsers, setBotUsers,addUser} from './actions/usersAction'

import {useSelector, useDispatch} from 'react-redux';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import ServicePanel from './components/ServicePanel/ServicePanel';
import { ifStatement } from '@babel/types';

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

            let payload;

            socket.on('connect', () => {
                console.log("connected to the server");
            });

            socket.on('disconnect', () => {
                console.log("disconnected from the server");
            });

            //DISPLAY MESSAGE FROM OTHER USER
            socket.on('addMessageResponse', (content) => {
                dispatch(addMessage({
                    id: content.id,
                    userId: content.userId,
                    roomId: content.roomId,
                    content: content.content,
                    createdAt: content.createdAt}));
                
            })


            //UPDATE USER LIST FOR AGENT
            socket.on('addUserResponse', ({user, name}) => {
                dispatch(addUser({name:name, user:user}))
            })

            //JOIN ROOM NOTIFICATION
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
            //LOAD OLD MESSAGES
            socket.on('getMessagesByRoomIdResponse', ({content}) => {
                console.log(`proc message load`)
                //FILTER MESSAGES BY TYPE
                content.filter(x => x.isImage != undefined).forEach((message) => {
                        socket.emit('getAudio', { id: message.dataId });
                        payload = message;
                });

                console.log(content);
                dispatch(setMessages(content.filter(x => x.isImage == undefined)))
            })

            //load user lists on service page load
            socket.on('getAgentUsersResponse', ({ users }) => {
                dispatch(setAgentUsers(users));
            })

            socket.on('getBotUsersResponse', ({ users }) => {
                dispatch(setBotUsers(users));
            })

            //GET AUDIO DATA FROM ID
            socket.on('addAudioResponse', (audioPayload) => {
                console.log(`audio response`);
                console.log(audioPayload.id);                
                payload = audioPayload;
                socket.emit('getAudio', {id: payload.dataId});


            })

            //PUT AUDIO DATA INTO MESSAGE DISPLAY
            socket.on('getAudioResponse', ({ data }) => {
                console.log(`audio data get`);
                console.log(data);
                dispatch(addMessage({
                    id: payload.id,
                    userId: payload.userId,
                    roomId: payload.roomId,
                    content: data,
                    createdAt: payload.createdAt
                }));

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
