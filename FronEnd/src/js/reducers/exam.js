import {REQUEST_EXAM,SET_EXAM, CHANGE_TEST, CHANGE_EXAM} from '../actions/actionTypes';

const initialState = {
    isFetching: true,
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case REQUEST_EXAM:
            return {...state, isFetching: action.isFetching}
        case SET_EXAM:
            return {...action.exam, isFetching: action.isFetching}
        case CHANGE_TEST:
            return {...state, tasks: [...state.tasks, ...action.task] }
        case CHANGE_EXAM:
            return {...action.exam}
        default:
            return state;
    }
};