import React from 'react';

import './Message.css';
import {useSelector} from 'react-redux';


const Message = ({message: {user, content}}) => {
    const name = useSelector(state => state.personal.name)

    let isSentByCurrentUser = false;

    //const trimmedName = name.trim().toLowerCase();

     if(user === name) {
         isSentByCurrentUser = true;
     }

    return (
        isSentByCurrentUser
          ? (
            <div className="messageContainer justifyEnd">
              <p className="sentText pr-10">{name}</p>
              <div className="messageBox backgroundBlue">
                <p className="messageText colorWhite">{content}</p>
              </div>
            </div>
            )
            : (
              <div className="messageContainer justifyStart">
                <div className="messageBox backgroundLight">
                  <p className="messageText colorDark">{content}</p>
                </div>
                <p className="sentText pl-10 ">{user}</p>
              </div>
            )
    );
}

export default Message;