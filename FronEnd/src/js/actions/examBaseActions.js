import { REQUEST_EXAMBASE, SET_EXAMBASE, DELETE_EXAM, DELETE_DIRECTORY } from './actionTypes';
import {reject} from 'lodash/collection';
import api from '../utils/webApiConfigure';
import {directoryTypes } from '../utils/constants';
import {getExams } from '../actions/examActions';
import {getDirectories, deleteDirectory} from '../actions/direcroriesActions';

export const _getExamBase = (examBase) => {
    return {
        type: SET_EXAMBASE,
        examBase,
        isFetching: false
    }
};

export const _requestExamBase = () => {
    return {
        type: REQUEST_EXAMBASE,
        isFetching: true
    }
};

export const getExamBase = () => {
    return (dispatch) => {

        dispatch(_requestExamBase());

        api.all([getDirectories(directoryTypes.exam), getExams()])
            .then(api.spread(function (dirs, es) {
                const directories = dirs.data;
                const exams = es.data;
                dispatch(_getExamBase({ directories, exams }))
            }));
    }
};

function _deleteExam(exams){
    return {
        type: DELETE_EXAM,
        exams
    }
}

function _deleteDirectory(directories){
    return {
        type: DELETE_DIRECTORY,
        directories
    }
}

export const deleteExamDirectory = (directory) =>  {
    return (dispatch, getState) => {
        return deleteDirectory(directory).then(() => {
            let {directories} = getState().examBase;
            dispatch(_deleteDirectory(reject(directories, (d) => { return d.id == directory.id })));
        })
    }
};


export const deleteExam = (id) =>  {
    return (dispatch, getState) => {
        return api({ method: 'delete', url: '/api/exams', data: { id: id } })
            .then(() => {
                let {exams} = getState().examBase;
                dispatch(_deleteExam(reject(exams, (t) => { return t.id == id })));
            })
    }
};
