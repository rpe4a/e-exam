import {GET_TEST, CHANGE_TEST, DELETE_TEST} from './actionTypes';
import {find, reject, some} from 'lodash/collection'
import {findIndex} from 'lodash/array'
import getDemoTestObj from '../data/demotest';
import {questionTypes } from '../utils/constants';

export const changeTest = (test) => {
    return {
        type: CHANGE_TEST,
        task: test
    };
};

export const deleteTest = () => {
    return {
        type: DELETE_TEST
    }
}

export const getTest = (test) => {
    return {
        type: GET_TEST,
        test
    }
}

export const pickQuestion = (test, id) => {
    return (dispatch) => {
        const {questions} = test;

        questions.forEach((q) => {
            q.picked = false;
        })

        const question = findById.call(questions, id)

        question.picked = true;

        dispatch(changeTest(test))
    }
};

function _changeQuestion(test, id, func) {
    const questions = test.questions;

    let question = find(questions, (q) => {
        return q.id == id
    });

    func(question);

    const index = findIndex(questions, (q) => {
        return q.id == id
    });

    id = _nextQuestionId(questions, index)

    return pickQuestion(test, id)
}

function _nextQuestionId(questions, index) {
    let id;

    for (let i = index + 1, length = questions.length; i <= length; i++) {
        if (questions[i] && (!questions[i].answered || questions[i].skiped)) {
            id = questions[i].id;
            break;
        } else {
            let q = find(questions, ['answered', false]);
            id = q ? q.id : questions[i - 1].id;
            break;
        }
    }

    return id
}

export const skipQuestion = (test, id) => {

    return _changeQuestion(test, id, (q) => {
        q.skiped = true;
    })
};


export const answeredQuestion = (test, id) => {

    return _changeQuestion(test, id, q => {
        q.answered = true;
    })
};

function _changeAnswer(question, answer, value) {
    let {userAnswers} = question;

    switch (question.type) {
        case questionTypes.multiple: {
            if (some(userAnswers, { id: answer.id }))
                question.userAnswers = reject(userAnswers, ['id', answer.id])
            else
                userAnswers.push({ id: answer.id, value: value })
            break;
        }
        case questionTypes.conformity:
            question.userAnswers = reject(userAnswers, ['id', answer.id])
            question.userAnswers.push({ id: answer.id, value: value })
            break;

        /*case questionTypes.free:
            userAnswers.length = 0;
            userAnswers.push({ id: answer.id, value: value })
            break;*/
        default:
            userAnswers.length = 0;
            userAnswers.push({ id: answer.id, value: value })
            break;
    }
}

function findById(id) {
    return find(this, (item) => { return item.id == id })
}

export const pickAnswer = (test, answerId, questionId, value) => {
    return (dispatch) => {
        let question = findById.call(test.questions, questionId)
        let answer = findById.call(question.answers, answerId)

        _changeAnswer(question, answer, value);

        dispatch(changeTest(test));
    }

};

export const finishTest = (test) => {
    return (dispatch) => {
        return new window.Promise((resolve) => {
            test.finish = true;
            console.log(test);
            dispatch(changeTest(test))
            resolve();
        })
    }
};

export const getDemoTest = () => {
    return (dispatch, getState) => {
        let demotest = {}
        if (getState().demoTest.id) {
            demotest = getState().demoTest
        } else {
            demotest = getDemoTestObj();
        }
        dispatch(getTest(demotest))
    }
};

export const clearDemoTest = () => {
    return (dispatch) => {
        dispatch(deleteTest({}))
    }
};

/*export const timeOut = (test) => {
    return (dispatch) => {
        return new window.Promise((resolve) => {
            const {questions} = test

            questions.forEach(q => {
                q.answered = true;
            });

            dispatch(changeTest(test));
            resolve();
        })
    }
};*/






