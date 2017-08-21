import { REQUEST_TASKBASE, SET_TASKBASE, DELETE_TASK, DELETE_DIRECTORY } from './actionTypes';
import {reject} from 'lodash/collection';
import {directoryTypes } from '../utils/constants';
import {getDirectories, deleteDirectory} from '../actions/direcroriesActions';
import {getTasks } from '../actions/taskActions';
import api from '../utils/webApiConfigure';

export const _getTaskBase = (taskBase) => {
    return {
        type: SET_TASKBASE,
        taskBase,
        isFetching: false 
    }
};

export const _requestTaskBase = () => {
    return {
        type: REQUEST_TASKBASE,
        isFetching: true
    }
};

export const getTaskBase = () => {
    return (dispatch) => {

        dispatch(_requestTaskBase());

        api.all([getDirectories(directoryTypes.task), getTasks()])
            .then(api.spread(function (dirs, ts) {
                const directories = dirs.data;
                const tasks = ts.data;
                dispatch(_getTaskBase({ directories, tasks }))
            }));
    }
};

function _deleteTask(tasks) {
    return {
        type: DELETE_TASK,
        tasks
    }
}

function _deleteDirectory(directories) {
    return {
        type: DELETE_DIRECTORY,
        directories
    }
}

export const deleteTaskDirectory = (directory) => {
    return (dispatch, getState) => {
        return deleteDirectory(directory).then(() => {
            let {directories} = getState().taskBase;
            dispatch(_deleteDirectory(reject(directories, (d) => { return d.id == directory.id })));
        })
    }
};


export const deleteTask = (id) => {
    return (dispatch, getState) => {
        return api({ method: 'delete', url: '/api/tasks', data: { id: id } })
            .then(() => {
                let {tasks} = getState().taskBase;
                dispatch(_deleteTask(reject(tasks, (t) => { return t.id == id })));
            })
    }
};
