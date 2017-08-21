import { REQUEST_USERINFO, SET_USERSTATISTICS, REQUEST_USEREXAMS, SET_USEREXAMS, REQUEST_USERSUBSCRIPTIONS, SET_USERSUBSCRIPTION, UNSUBSCRIPTION_USER, DELETE_USEREXAM } from '../actions/actionTypes';

const initialState = {
    info: {},
    isFetching: true,
    exams: [],
    subscriptions: []
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case REQUEST_USERINFO:
        case REQUEST_USEREXAMS:
        case REQUEST_USERSUBSCRIPTIONS:
            return {...state, isFetching : action.isFetching }
        case SET_USERSTATISTICS:
            return {...state, info : action.info, isFetching: action.isFetching }
        case SET_USEREXAMS:
            return {...state, exams: action.exams, isFetching: action.isFetching  }
        case SET_USERSUBSCRIPTION:
            return {...state, subscriptions: action.requests, isFetching: action.isFetching }
        case UNSUBSCRIPTION_USER:
            return {...state, subscription: action.subscriptions }
        case DELETE_USEREXAM:
            return {...state, exams: action.exams }
        default:
            return state;
    }
};