import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

import './ServicePanel.css';
import {setName} from '../../actions/personalAction';
import Chat from '../Chat/Chat';
import UserList from '../UserList/UserList';


const ServicePanel = () => {
    const socket = useSelector(state => state.personal.socket);
    //const users = useSelector(state => state.users.users);
    const bot_users = useSelector(state => state.users.bot_users);
    //const agent_users = useSelector(state => state.users.agent_users);
    const dispatch = useDispatch();
    const users = useSelector(state =>state.users.users);

     useEffect(() => {

        dispatch(setName(`Service Agent`))
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
    }, [users]);

    // useEffect(() => {
    //     console.log(`use effect : ${users}`)
    // }, [users])

    let match = useRouteMatch();

    return (
    
        <div>
            <div id = "chat">
                <Switch>
                    <Route path={`${match.path}/:chatId`}>
                        <Chat />
                    </Route>
                    <Route path={match.path}>
                        <h3>Please select a user</h3>
                    </Route>
                </Switch>
            </div>
            <div id = "buttonContainer">
                <button className="showBotUser">Bot</button>
                <button className="showAgentUser">Agents</button>
            </div>
            <div className = "list">
                <UserList bot_users={bot_users} match={match}/>
                <li>
            {bot_users.map((bot_user, i) => <ul><Link to={`${match.url}/${bot_user}`}>{bot_user}</Link></ul>)}
    {/*users.map((user, i) => <button onClick={() => openChat(name === {user})}><div key={i}>{user}</div></button>)*/}
            <ul><Link to={`${match.url}/bob`}>Bob</Link></ul>
                <ul><Link to={`${match.url}/fred`}>Fred</Link></ul>
            </li>
            {/*users: {JSON.stringify(users)}*/}
            </div>
        </div>
        
    );
}

export default ServicePanel;