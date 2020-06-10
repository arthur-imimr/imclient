import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
//import io from 'socket.io-client'
import { setName } from '../../actions/personalAction';

import './Join.css';

//let socket;

const Join = ({location}) => {
    const name = useSelector(state => state.personal.name);
    const socket = useSelector(state => state.personal.socket)

    const dispatch = useDispatch();


     useEffect(() => {

     }, []);

     
    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => dispatch(setName(event.target.value))}/></div>

                <Link onClick={event => (!name) ? event.preventDefault().then(socket.emit('addUser', {name})) : null} to={`/chat`}>
                    <button className="button mt-20" type="submit">Sign In</button>
                </Link>

                <Link to={`/service`}>
                    <button className="button mt-20" type="submit">Service</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;

