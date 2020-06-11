import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { setMessage, addMessage } from '../../actions/messagesAction';
import './Input.css';

const Input = (props) => {
    const message = useSelector(state=>state.messages.message)
    const socket = useSelector(state=>state.personal.socket)
    const id = useSelector(state=>state.personal.id)
    const dispatch = useDispatch()


    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            dispatch(addMessage({ id, userId: id, roomId: props.chatId, content: message, createdAt: Date.now().toString()}))
            socket.emit('addMessage', { roomId: props.chatId, content: message}, () => dispatch(setMessage('')));
            dispatch(setMessage(''));
        }

    }
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