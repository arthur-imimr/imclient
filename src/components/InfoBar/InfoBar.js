import React from 'react';

import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';

import './InfoBar.css';
import {useSelector} from 'react-redux';

const InfoBar = () => {
    const id = useSelector('');

    return(
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon} alt="online icon"/>
             <h3>{id}</h3> 
        
        </div>
        <div className="rightInnerContainer">
            <a href="/"><img src={closeIcon} alt="close icon" /></a>

        
        </div>
    </div>
    )
}

export default InfoBar;