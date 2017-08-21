import {REQUEST_QUESTION, SET_QUESTION} from '../actions/actionTypes';

const initialState = {
    isFetching: true,
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case REQUEST_QUESTION:
            return {...state, isFetching: action.isFetching}
        case SET_QUESTION:
            return {...action.question}
        default:
            return state;
    }
};