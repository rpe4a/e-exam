import React, {Component} from 'react'
import shortid from 'shortid';
import classnames from 'classnames';
import AlertsCollection from '../components/AlertsCollection';
import {questionTypes} from '../utils/constants';

class QuestionAnswerView extends Component {

    Delete(e) {
        e.preventDefault()
        this.props.deleteAnswer(this.props.answer);
    }

    render() {
        const {answer, setRightAnswer} = this.props;

        return (
            <div className='checkbox'>
                <label>
                    <input type='checkbox'
                        name='answer'
                        title='Правильный'
                        id={answer.id}
                        checked={answer.isRight}
                        onChange={setRightAnswer}
                        />{(answer.conformity) ? `${answer.body} - ${answer.conformity}` : answer.body}
                </label>
                <button className='close'  title='Удалить'><i className='fa fa-times' onClick={::this.Delete}></i></button>
            </div >
        );
    }
}

QuestionAnswerView.propTypes = {
    answer: React.PropTypes.object.isRequired,
    deleteAnswer: React.PropTypes.func.isRequired,
    setRightAnswer: React.PropTypes.func.isRequired,
}

class QuestionAnswersConteiner extends Component {
    render() {
        const {answers, deleteAnswer, setRightAnswer, questionType} = this.props;

        if(questionType == questionTypes.full)
            return false

        return (
            <div className='row'>
                <div className='col-md-12 form-group'>
                    {answers.map((a, i) => {
                        return <QuestionAnswerView answer={a} key={i} deleteAnswer={deleteAnswer} setRightAnswer={setRightAnswer}/>
                    }) }
                </div>
            </div>
        );
    }
}

QuestionAnswersConteiner.propTypes = {
    answers: React.PropTypes.array.isRequired,
    questionType: React.PropTypes.number.isRequired,
    deleteAnswer: React.PropTypes.func.isRequired,
    setRightAnswer: React.PropTypes.func.isRequired,
}

class AddQuestionAnswers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            invalid: true,
            body: '',
            conformity: '',
        }

        this.Add = this.Add.bind(this);
        this.checkButton = this.checkButton.bind(this)
        this.checkConformityButton = this.checkConformityButton.bind(this)
    }

    Add() {

        const answer = {
            id: shortid.generate(),
            body: this.state.body,
            conformity: this.state.conformity,
            isRight: false,
        }

        this.setState({ invalid: true, body: '', conformity: '' });
        this.props.addAnswer(answer);
    }

    checkButton(e) {
        const body = e.target.value;
        this.setState({ [e.target.name]: body, invalid: !body })

    }

    checkConformityButton(e) {
        const body = this.refs.body.value, conformity = this.refs.conformity.value;
        this.setState({[e.target.name]: e.target.value, invalid: !(body && conformity) })
    }

    _getAnswerView() {
        const {body, conformity} = this.state;

        switch (this.props.type) {
            case questionTypes.conformity:
                return (<div className='col-md-10 form-group'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <input type='text' name='body' ref='body' value={body} className='form-control' placeholder='Введите ответ' onChange={this.checkConformityButton}/>
                        </div>
                        <div className='col-md-6'>
                            <input type='text' name='conformity' ref='conformity' value={conformity} className='form-control' placeholder='Введите соответствие' onChange={this.checkConformityButton}/>
                        </div>
                    </div>
                </div>
                )
            case questionTypes.full:
                return (
                    <div className='col-md-12 form-group'>
                        <AlertsCollection styles='alert alert-info' alerts={['Добавление ответов к данному типу вопроса, не предустматривается.']}/>
                    </div>
                )
            default:
                return (
                    <div className='col-md-10 form-group'>
                        <input type='text' name='body' value={body} className='form-control' placeholder='Введите ответ' onChange={this.checkButton}/>
                    </div>
                )
        }
    }

    render() {
        const {type} = this.props;

        return (
            <div className='row'>
                {this._getAnswerView() }
                <div className={classnames('col-md-2', { 'hidden': type == questionTypes.full }) }>
                    <button type='button' disabled={this.state.invalid} title='Добавить ответ' className='btn btn-success btn-block' onClick={this.Add}><i className='fa fa-plus fa-lg'></i></button>
                </div>
            </div>
        );
    }
}

AddQuestionAnswers.propTypes = {
    type: React.PropTypes.number.isRequired,
    addAnswer: React.PropTypes.func.isRequired,
}

class QuestionAnswers extends Component {
    render() {
        const {answers, setRightAnswer, error, questionType, deleteAnswer, addAnswer} = this.props,
        alerts = [
            'Добавленные ответы автоматически прикрепяться к Вашему вопросу при сохранении.',
            'Вы можете добавлять неограниченное количество ответов на вопрос.',
            'Выбор правильных ответов, зависит от типа вопроса. Система будет использовать их для подсчета результатов тестируемых Вами пользователей.',
        ]

        return (
            <div className='row'>
                <div className='col-md-6'>
                    {(error) && <div className='form-group'><span className='text-danger'>{error}</span></div>}
                    <AddQuestionAnswers type={questionType} addAnswer={addAnswer} />
                    <QuestionAnswersConteiner answers={answers} questionType={questionType} deleteAnswer={deleteAnswer} setRightAnswer={setRightAnswer}/>
                </div>
                <div className='col-md-5 col-md-offset-1'>
                    <AlertsCollection styles='alert alert-info' alerts={alerts}/>
                </div>
            </div>
        )
    }
}

QuestionAnswers.propTypes = {
    answers: React.PropTypes.array.isRequired,
    addAnswer: React.PropTypes.func.isRequired,
    deleteAnswer: React.PropTypes.func.isRequired,
    setRightAnswer: React.PropTypes.func.isRequired,
    error: React.PropTypes.string,
    questionType: React.PropTypes.number.isRequired,
}

export default QuestionAnswers