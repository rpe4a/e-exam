import {REQUEST_QUESTIONSBASE, SET_QUESTIONSBASE, DELETE_QUESTION, DELETE_DIRECTORY} from '../actions/actionTypes';

const initialState = {
    isFetching: false,
    directories: [],
    questions:[]
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case REQUEST_QUESTIONSBASE:
            return {...state, isFetching: action.isFetching}
        case SET_QUESTIONSBASE:
            return {...action.questionBase}
        case DELETE_QUESTION:
            return {...state, questions: action.questions}
        case DELETE_DIRECTORY:
            return {...state, directories: action.directories}
        default:
            return state;
    }
};