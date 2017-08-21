import { REQUEST_CLIENTBASE, SET_CLIENTBASE, DELETE_CLIENT, DELETE_DIRECTORY } from '../actions/actionTypes';

const initialState = {
    isFetching: false,
    directories: [],
    clients:[]
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case REQUEST_CLIENTBASE:
            return {...state, isFetching: action.isFetching}
        case SET_CLIENTBASE:
            return {...action.clientBase}
        case DELETE_CLIENT:
            return {...state, clients: action.clients}
        case DELETE_DIRECTORY:
            return {...state, directories: action.directories}
        default:
            return state;
    }
};