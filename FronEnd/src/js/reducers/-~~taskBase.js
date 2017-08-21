import { REQUEST_TASKBASE, SET_TASKBASE, DELETE_TASK, DELETE_DIRECTORY } from '../actions/actionTypes';

const initialState = {
    isFetching: false,
    directories: [],
    tasks:[]
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case REQUEST_TASKBASE:
            return {...state, isFetching: action.isFetching}
        case SET_TASKBASE:
            return {...action.taskBase}
        case DELETE_TASK:
            return {...state, tasks: action.tasks}
        case DELETE_DIRECTORY:
            return {...state, directories: action.directories}
        default:
            return state;
    }
};