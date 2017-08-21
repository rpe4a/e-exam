import {REQUEST_DIRECTORIES, SET_DIRECTORIES, ADD_DIRECTORY} from '../actions/actionTypes';

const initialState = {
    isFetching: false,
    directories: [],
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case REQUEST_DIRECTORIES:
            return {...state, isFetching: action.isFetching} 
        case SET_DIRECTORIES:
            return {...state, directories: action.directories, isFetching: action.isFetching} 
        case ADD_DIRECTORY:
            state.directories.push(action.directoty)
            return {...state}
        default:
            return state;
    }
};