/*import {unionBy} from 'lodash/array'*/
import {REQUEST_TASK, SET_TASK} from './actionTypes';
import BaseManager from '../actions/baseActions';
import {getMergeDirectories, getDirectories} from '../actions/direcroriesActions';
import api from '../utils/webApiConfigure';
import {directoryTypes, typeTaskName, WebApiRequests } from '../utils/constants';
import {find} from 'lodash/collection';

export const getTaskOptions = () => {
    return (dispatch) => {
        return new window.Promise((resolve) => {
            getMergeDirectories(directoryTypes.task).call(null, dispatch)
            resolve()
        }).then(() => {
            const QuestionBaseActions = BaseManager.Create(directoryTypes.question);
            QuestionBaseActions.getBase().call(null, dispatch)
        })
    }
};

export const getTasks = () => {
    return api.get(WebApiRequests.Task.GETALL);
}
 
export const getTask = (id) => {
    return () => {
        return api.get(`${WebApiRequests.Task.GETBYID}/${id}`)
    }
}

function _requestTask(){
    return {
        type: REQUEST_TASK,
        isFetching: true
    }
}

function _getTask(task){
    return {
        type: SET_TASK,
        isFetching: false,
        task
    }
}

export const reviewTask = (id) =>  {
    return (dispatch) => {
        dispatch(_requestTask());

        api.all([getDirectories(directoryTypes.task), getTask(id).call(null)])
            .then(api.spread(function (dirs, t) {
                const directories = dirs.data;
                const task = {...t.data, typeName: typeTaskName[t.data.type], dirName: find(directories, ['id', t.data.dir]).name };
                dispatch(_getTask(task))
            }));

    }
};

export const mergeTask = (data) => {
    return () => {
        if (data.id != 0) {
            return api.put(WebApiRequests.Task.PUT, data)
        } else {
            return api.post(WebApiRequests.Task.POST, data)
        }
    }
};

