import {
    ADD_MESSAGE,
    LOAD_MESSAGES
} from '../actions/types';

const initialState = {
    message : {},
    messages : []
}

export const messagesReducer = (state = initialState, action) => {
    switch (action.type) {

    case ADD_MESSAGE:
        return { ...state.message, ...action.payload }

    case LOAD_MESSAGES:
        return action.payload

    default:
        return state
    }
}
