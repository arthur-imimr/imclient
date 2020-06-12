import React, {useRef, useEffect} from 'react';

import './Message.css';
import {useSelector} from 'react-redux';


const Message = ({message}) => {

  const el = useRef();
    console.log(JSON.stringify(message, null, 4));

  let formattedMessageContent
  let audioFile = false;

  const toBlob = base64 => {
    const raw = base64.split(";base64,");
    const b = atob(raw[1]);
    const blob = new Blob([new Uint8Array(b.length).fill(0).map((_, i) => b.charCodeAt(i))]);
    return blob.slice(0, blob.size, raw[0].substr(5));
  }

  if (message.content.includes(";base64,")) {
    formattedMessageContent = toBlob(message.content);
    audioFile = true;
  }
  useEffect(() => {
    if (el && el.current)
      el.current.src = URL.createObjectURL(formattedMessageContent);
  },[formattedMessageContent])

    const name = useSelector(state => state.personal.name)
    const id = useSelector(state=>state.personal.id)

    let isSentByCurrentUser = false;

    //const trimmedName = name.trim().toLowerCase();

     if(id == message.userId) {
         isSentByCurrentUser = true;
     }

  return (
    
        isSentByCurrentUser
          ? (
            <div className="messageContainer justifyEnd">
              <p className="sentText pr-10">{name}</p>
              <div className="messageBox backgroundBlue">
            {audioFile ? <p><audio ref={el} controls volume="true" autoPlay /></p> : <p className="messageText colorDark">{message.content}</p>}
            {/*<p className="messageText colorDark">{message.content}</p>*/}
              </div>
            </div>
            )
            : (
              <div className="messageContainer justifyStart">
                <div className="messageBox backgroundLight">
            {audioFile ? <p><audio ref={el} controls volume="true" autoPlay /></p>: <p className="messageText colorDark">{message.content}</p>  }
            {/*<p className="messageText colorDark">{message.content}</p>*/} 
                </div>
                <p className="sentText pl-10 ">{message.userId}</p>
              </div>
            )
      );
}

export default Message;