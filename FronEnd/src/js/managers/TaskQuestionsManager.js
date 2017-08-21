import {filter} from 'lodash/collection';
import {taskTypes, questionTypes}  from '../utils/constants';

class TaskQuestionsManager {
    constructor(questions) {
        this.questions = questions;
        this.taskTypes = taskTypes;
        this.questionTypes = questionTypes; 
    }

    _getTestQuestions() {
        return filter(this.questions, function name(q) {
            return q.type != questionTypes.full;
        })
    }

    _getFreeFormQuestions() {
        return filter(this.questions, function name(q) {
            return q.type == questionTypes.full;
        })
    }
    
    GetQuestions(type) {
        switch (type) {
            case this.taskTypes.test:
                return this._getTestQuestions();
            case this.taskTypes.freeform:
                return this._getFreeFormQuestions();
            default:
                throw new Error(`QuestrionsManager - founded wrong type of question @:${type}`)
        }
    }
}

export default TaskQuestionsManager;