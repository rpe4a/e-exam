import React, {Component} from 'react';
import Question from './Question';
import Pagination from './Pagination';
import QuestionPaginatorView from './QuestionPaginatorView';
/*import TestTimer from './TestTimer';*/
/*import classnames from 'classnames';*/
import {find, some} from 'lodash/collection'

class Task extends Component {
    constructor(props) {
        super(props);

        this.ChangeQuestion = this.ChangeQuestion.bind(this);
        this.SkipQuestion = this.SkipQuestion.bind(this);
        this.AnswerQuestion = this.AnswerQuestion.bind(this);
        this.PickAnswer = this.PickAnswer.bind(this);
        this.EditorChange = this.EditorChange.bind(this);
        this.FinishTask = this.FinishTask.bind(this);
        /*this.TimeOut = this.TimeOut.bind(this);*/
        this._getFirstQuestion = this._getFirstQuestion.bind(this);
        /*this.GetElapsedTime = this.GetElapsedTime.bind(this);*/
    }

    ChangeQuestion(e) {
        e.preventDefault();
        this.props.pickQuestion(this.props.task, e.target.id)
    }

    SkipQuestion(e) {
        e.preventDefault();
        const id = e.target.dataset.questionId;

        this.props.skipQuestion(this.props.task, id)
    }

    PickAnswer(e) {
        const questionId = e.target.dataset.questionId,
            id = e.target.id,
            value = e.target.value;

        this.props.pickAnswer(this.props.task, id, questionId, value)
    }

    EditorChange(id, questionId, value) {
        this.props.pickAnswer(this.props.task, id, questionId, value)
    }

    AnswerQuestion(e) {
        e.preventDefault();
        const id = e.target.dataset.questionId;

        this.props.answeredQuestion(this.props.task, id)
    }

    checkFinishButton() {
        var {questions} = this.props.task;

        return some(questions, ['answered', false]);
    }

    /*TimeOut() {

        this.props.timeOut(this.props.test)
            .then(() => {
                this.props.addFlashMessage({
                    type: 'warning',
                    text: 'Время теста истекло.'
                })
            })
            .then(() => {
                this.FinishTest();
            });
    }*/

    _getFirstQuestion() {
        const {task} = this.props;

        return find(task.questions, (q) => { return q.picked; }) || task.questions[0];
    }

    FinishTask() {

        this.props.finishTest(this.props.task)
            .then(() => {
                this.props.addFlashMessage({
                    type: 'success',
                    text: 'Ваш результат успешно сохранен. Можете закончить экзамен или перейти к следующему заданию.'
                })
                this.context.router.goBack()
            })
    }

    /*GetElapsedTime(time) {
        this.props.putElapsedTime(this.props.test, time);
    }*/

    render() {
        const {task} = this.props;

        return (
            <div  className='row margin-b-2'>
                <div className='col-md-12'>
                    <h3 className='margin-t-0'>{task.name} </h3>
                    <Question question={this._getFirstQuestion() }
                        SkipQuestion={this.SkipQuestion}
                        AnswerQuestion={this.AnswerQuestion}
                        PickAnswer={this.PickAnswer}
                        EditorChange={this.EditorChange}/>
                </div>
                <div className='col-md-6'>
                    <Pagination items={task.questions} pickItem={this.ChangeQuestion} DynamicPaginatorView={QuestionPaginatorView} />
                </div>
                <div className='col-md-6 text-right'>
                    {/*<span>Оставщееся время:
                        <TestTimer ref='timer' timeTestInterval={test.time * 60000}
                            startTestTime={test.startTime}
                            TimeOut ={this.TimeOut}
                               elapsedTime={test.elapsedTime} 
                               GetElapsedTime={this.GetElapsedTime} />
                    </span>*/
                    }
                    <button onClick={this.context.router.goBack} type='button' className='btn btn-default margin-l-1'>Назад</button>
                    <button disabled={this.checkFinishButton() } onClick={this.FinishTask} className='btn btn-primary margin-l-1'>Закончить</button>
                </div>
            </div>
        );
    }
}

Task.propTypes = {
    task: React.PropTypes.object.isRequired,
    pickQuestion: React.PropTypes.func.isRequired,
    skipQuestion: React.PropTypes.func.isRequired,
    answeredQuestion: React.PropTypes.func.isRequired,
    pickAnswer: React.PropTypes.func.isRequired,
    /*putElapsedTime: React.PropTypes.func.isRequired,*/
    finishTest: React.PropTypes.func.isRequired,
/*    timeOut: React.PropTypes.func.isRequired,*/
    addFlashMessage: React.PropTypes.func.isRequired,

};

Task.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default Task;