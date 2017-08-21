import { SET_USERREQUESTS, DELETE_USERREQUESTS, REQUEST_USERREQUESTS } from '../actions/actionTypes';

const initialState = {
    isFetching: true,
    userRequests: []
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case REQUEST_USERREQUESTS:
            return { ...state, isFetching: action.isFetching }
        case SET_USERREQUESTS:
            return { ...state, userRequests: action.userRequests, isFetching: action.isFetching }
        case DELETE_USERREQUESTS:
            return { ...state, userRequests: action.userRequests}
        default:
            return state;
    }
};