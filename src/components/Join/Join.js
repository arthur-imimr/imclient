import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import io from 'socket.io-client'
import { setName, setSocket } from '../../actions/personalAction';

import './Join.css';

let socket;

const Join = ({location}) => {
    const name = useSelector(state => state.personal.name);

    // const [room, setRoom] = useState('');
    const dispatch = useDispatch();
    const ENDPOINT = 'localhost:5000';


     useEffect(() => {
         socket = io(ENDPOINT);
         dispatch(setSocket(socket));
         
     }, [ENDPOINT, location.search]);

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event)=>dispatch(setName(event.target.value) )}/></div>
                {/* <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /></div> */}
                {/* <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}> */}
                <Link onClick={event => (!name) ? event.preventDefault() : null} to={`/chat`}>
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