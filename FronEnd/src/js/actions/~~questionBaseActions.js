import { REQUEST_QUESTIONSBASE, SET_QUESTIONSBASE, DELETE_QUESTION, DELETE_DIRECTORY } from './actionTypes';
import {reject} from 'lodash/collection';
import api from '../utils/webApiConfigure';
import {getDirectories, deleteDirectory } from '../actions/direcroriesActions';
import {getQuestions } from '../actions/questionsActions';
import {directoryTypes } from '../utils/constants';

export const _getQuestionBase = (questionBase) => {
    return {
        type: SET_QUESTIONSBASE,
        questionBase,
        isFetching: false
    }
};

export const _requestQuestionBase = () => {
    return {
        type: REQUEST_QUESTIONSBASE,
        isFetching: true
    } 
}; 

export const getQuestionBase = () => {
    return (dispatch) => {

        dispatch(_requestQuestionBase());

        api.all([getDirectories(directoryTypes.question), getQuestions()])
            .then(api.spread(function (dirs, qs) {
                const directories = dirs.data;
                const questions = qs.data;
                dispatch(_getQuestionBase({ directories, questions }))
            }));
    }
};

function _deleteQuestion(questions) {
    return {
        type: DELETE_QUESTION,
        questions
    }
}

function _deleteDirectory(directories) {
    return {
        type: DELETE_DIRECTORY,
        directories
    }
}

export const deleteQuestionDirectory = (directory) => {
    return (dispatch, getState) => {
        return deleteDirectory(directory).then(() => {
            let {directories} = getState().questionBase;
            dispatch(_deleteDirectory(reject(directories, (d) => { return d.id == directory.id })));
        })
    }
};


export const deleteQuestion = (question) => {
    return (dispatch, getState) => {
        return api({ method: 'delete', url: '/api/issues', data: question })
            .then(() => {
                let {questions} = getState().questionBase;
                dispatch(_deleteQuestion(reject(questions, (q) => { return q.id == question.id })));
            })
    }
};