import {usersReducer} from './users'
import {personalReducer} from './personal'
import {messagesReducer} from './messages'
import {combineReducers} from 'redux';

const allReducer = combineReducers({
    users: usersReducer,
    personal: personalReducer,
    messages: messagesReducer

})

export default allReducer;