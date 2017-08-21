import {/*ADD_QUESTION, GET_QUESTIONS, */REQUEST_QUESTION, SET_QUESTION} from './actionTypes';
import api from '../utils/webApiConfigure';
import {find} from 'lodash/collection';
import {directoryTypes, typeQuestionName, WebApiRequests } from '../utils/constants';
import {getDirectories } from '../actions/direcroriesActions';

export const getQuestions = () => {
    return api.get(WebApiRequests.Issues.GETALL);
}

/*export const _getQuestions = () => { 
    const questions = [
        {
            id: 1,
            name: 'Вопрос 1',
            description: 'бла-бла-бла',
            type: 1,
            dir: 1,
            point: 1,
            isShuffleAnswer: false,
            answers: []
        },
        {
            id: 2,
            name: 'Вопрос 2',
            description: 'бла-бла-бла',
            type: 2,
            dir: 1,
            point: 1,
            isShuffleAnswer: false,
            answers: []
        },
        {
            id: 3,
            name: 'Вопрос 3',
            description: 'бла-бла-бла',
            type: 3,
            dir: 2,
            point: 1,
            isShuffleAnswer: false,
            answers: []
        },
        {
            id: 4,
            name: 'Вопрос 4',
            description: 'бла-бла-бла',
            type: 4,
            dir: 3,
            point: 1,
            isShuffleAnswer: false,
            answers: []
        }
    ];

    return {
        type: GET_QUESTIONS,
        questions
    }
};*/

export const getQuestion = (id) => {
    return () => {
        return api.get(`${WebApiRequests.Issues.GETBYID}/${id}`)
    }
};

function _requestQuestion(){
    return {
        type: REQUEST_QUESTION,
        isFetching: true
    }
}

function _getQuestion(question){
    return {
        type: SET_QUESTION,
        isFetching: false,
        question
    }
}

export const reviewQuestion = (id) => {
    return (dispatch) => {
        dispatch(_requestQuestion());

        api.all([getDirectories(directoryTypes.question), getQuestion(id).call(null)])
            .then(api.spread(function (dirs, q) {
                const directories = dirs.data;
                const question = {...q.data, typeName: typeQuestionName[q.data.type], dirName: find(directories, ['id', q.data.dir]).name };
                dispatch(_getQuestion(question))
            }));
    }
}

/*export const _mergeQuestion = (question) => {
    return {
        type: ADD_QUESTION,
        question
    }
};*/



export const mergeQuestion = (data) => {
    return () => {
        if (data.id != 0) {
            return api.put(WebApiRequests.Issues.PUT, data)
        } else {
            return api.post(WebApiRequests.Issues.POST, data)
        }
    }
};
