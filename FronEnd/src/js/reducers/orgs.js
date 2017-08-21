import {REQUEST_ORGS, SET_ORGS} from '../actions/actionTypes';

const initialState = {
    orgs:[],
    isFetching: true
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case REQUEST_ORGS:
            return {...state, isFetching: action.isFetching}
        case SET_ORGS:
            return {...state, orgs:action.orgs, isFetching: action.isFetching}
        default:
            return state;
    }
};