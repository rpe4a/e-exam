/*import demotest from '../data/demotest';*/
import {GET_TEST, CHANGE_TEST, DELETE_TEST} from '../actions/actionTypes';
/*import shortid from 'shortid';*/
/*import {without} from 'lodash/array'*/

export default (state = {}, action = {}) => {
    switch (action.type) {
        case GET_TEST:
            return { ...state, ...action.test }
        case CHANGE_TEST:
            return { ...state, ...action.test }
        case DELETE_TEST:
            return {}
        default:
            return state;
    }
};