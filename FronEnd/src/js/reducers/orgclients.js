import { REQUEST_ORGCLIENTS, SET_ORGCLIENTS, DELETE_CLIENT } from '../actions/actionTypes';

const initialState = {
    isFetching: false,
    clients: [],
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case REQUEST_ORGCLIENTS:
            return {...state, isFetching: action.isFetching}
        case SET_ORGCLIENTS:
            return { ...action.clients}
        case DELETE_CLIENT:
            return { ...action.clients}
        default:
            return state;
    }
};