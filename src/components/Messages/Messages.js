import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';

import {useSelector} from 'react-redux';
import './Messages.css';

const Messages = () => {
	const messages= useSelector(state => state.messages.messages)
/* <ScrollToBottom className="messages"> */
// (messages).map = (message, i) => <div key={i}><Message message={message} name={name} /></div>
/* </ ScrollToBottom> */
 //(messages).map() = (message, i) => <div key={i}><p>{name}: {message}</p></div>



 
return (
 <ScrollToBottom className="messages">

{(messages).map((message, i) => <div key={i}><Message message={message}/></div>)}
 </ScrollToBottom>
)
   



}

export default Messages;