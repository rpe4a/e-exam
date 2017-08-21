/*import {unionBy} from 'lodash/array'*/
import {getExamBase} from '../actions/examBaseActions';
import {getClientBase } from '../actions/clientBaseActions';

export const getAssignExamData = () => {
    return (dispatch) => {
        return new window.Promise((resolve) => {
            dispatch(getClientBase())
            resolve()
        }).then(() => {
            dispatch(getExamBase())
        })
    }
};