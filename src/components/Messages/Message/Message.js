import React from 'react';

import './Message.css';
import {useSelector} from 'react-redux';


const Message = ({message}) => {


    console.log(JSON.stringify(message, null, 4));
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
                <p className="messageText colorWhite">{message.content}</p>
              </div>
            </div>
            )
            : (
              <div className="messageContainer justifyStart">
                <div className="messageBox backgroundLight">
                  <p className="messageText colorDark">{message.content}</p>
                </div>
                <p className="sentText pl-10 ">{message.userId}</p>
              </div>
            )
      );
}

export default Message;