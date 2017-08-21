import { REQUEST_EXAMBASE, SET_EXAMBASE, DELETE_EXAM, DELETE_DIRECTORY } from '../actions/actionTypes';

const initialState = {
    isFetching: false,
    directories: [],
    exams:[]
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case REQUEST_EXAMBASE:
            return {...state, isFetching: action.isFetching}
        case SET_EXAMBASE:
            return {...action.examBase}
        case DELETE_EXAM:
            return {...state, exams: action.exams}
        case DELETE_DIRECTORY:
            return {...state, directories: action.directories}
        default:
            return state;
    }
};