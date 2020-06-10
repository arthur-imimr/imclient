import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { setMessage, sendMessage } from '../../actions/messagesAction';
import './Input.css';

const Input = ({sendMessage}) => {
    const message = useSelector(state=>state.messages.message)

    const dispatch = useDispatch()
    return (
    <form className="form">
        <input 
            className="input"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(event)=>dispatch(setMessage(event.target.value))}
            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        />
        <button className="sendButton" onClick={(event) => sendMessage(event)}>Send </button>
    </form>
    )

}

export default Input;