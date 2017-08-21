import { REQUEST_BASE, SET_BASE, DELETE_ELEMENT, DELETE_DIRECTORY } from '../actions/actionTypes';

const initialState = {
    isFetching: false,
    directories: [],
    elements:[]
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case REQUEST_BASE:
            return {...state, isFetching: action.isFetching}
        case SET_BASE:
            return { ...action.base}
        case DELETE_ELEMENT:
            return {...state, elements: action.elements}
        case DELETE_DIRECTORY:
            return {...state, directories: action.directories}
        default:
            return state;
    }
};