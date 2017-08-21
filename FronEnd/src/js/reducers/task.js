import {REQUEST_TASK, SET_TASK} from '../actions/actionTypes';

const initialState = {
    isFetching: true,   
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case REQUEST_TASK:
            return {...state, isFetching: action.isFetching}
        case SET_TASK:
            return {...action.task}
        default:
            return state;
    }
};