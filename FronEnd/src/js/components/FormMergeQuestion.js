import React, {Component} from 'react'
import InputFieldGroup from '../components/InputFieldGroup';
import SelectFieldGroup from '../components/SelectFieldGroup';
import Button from '../components/Button';
import {connect} from 'react-redux';
import {getMergeDirectories } from '../actions/direcroriesActions';
import {getQuestion, mergeQuestion } from '../actions/questionsActions';
import {addFlashMessage } from '../actions/flashMessageActions';
import Validation from '../validation/FormMergeQuestion';
import TextEditor from '../components/TextEditor';
import QuestionAnswers from '../components/QuestionAnswers';
import AlertsCollection from '../components/AlertsCollection';
import {reject, find} from 'lodash/collection';
import classnames from 'classnames';
import {directoryTypes, questionTypes} from '../utils/constants';

const typesCollection = [
    {
        id: questionTypes.single,
        name: 'Выбор одного правильного ответа'
    },
    {
        id: questionTypes.multiple,
        name: 'Выбор нескольких правильных ответов'
    },
    {
        id: questionTypes.conformity,
        name: 'Установка соответствия'
    },
    {
        id: questionTypes.free,
        name: 'Ввод текстового ответа'
    },
    {
        id: questionTypes.full,
        name: 'Свободный ответ'
    },
];

const defaultState = {
    name: '',
    description: '',
    type: 1,
    id: 0,
    dir: '',
    point: '',
    isShuffleAnswer: false,
    errors: {},
    answers: [],
    isLoding: false,
    invalid: false
}

class FormMergeQuestion extends Component {
    constructor(props) {
        super(props)

        this.state = defaultState;

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTextEditor = this.onChangeTextEditor.bind(this);
        this.onChangeShuffleAnswer = this.onChangeShuffleAnswer.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
        this.deleteAnswer = this.deleteAnswer.bind(this);
        this.setRightAnswer = this.setRightAnswer.bind(this);
        this.clearAnswers = this.clearAnswers.bind(this);
        this.checkCommonErrors = this.checkCommonErrors.bind(this);
        this.checkQuestionErrors = this.checkQuestionErrors.bind(this);
        this.checkAnswersErrors = this.checkAnswersErrors.bind(this);
        this.getAnswerCount = this.getAnswerCount.bind(this);
    }

    isValid() {
        const { errors, isValid } = Validation(this.state);

        if (!isValid) {
            this.setState({ errors });
        }

        return isValid;
    }

    componentDidMount() {
        if (this.props.questionid != 0) {
            this.props.getQuestion(this.props.questionid)
                .then((q) => { this.setState({...q.data})})
        } 
        this.props.getMergeDirectories(directoryTypes.question);
    }

    onChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    onChangeTextEditor(e) {
        this.setState({ description: e.target.getContent() });
    }

    onChangeShuffleAnswer(e) {
        this.setState({ [e.target.name]: e.target.checked });
    }

    clearAnswers(e) {
        const type = +e.target.value;
                                                        //если тип вопроса = свободный ответ, то сами добавляем ответ 
        this.setState({ [e.target.name]: type, answers: type == questionTypes.full ? [{id: 0, body: 'Свободный ответ', isRight: true}] : [] });
    }

    addAnswer(answer) {
        this.setState({ answers: [...this.state.answers, answer] })
    }

    deleteAnswer(answer) {
        this.setState({ answers: reject(this.state.answers, { id: answer.id }) })
    }

    setRightAnswer(e) {
        let answers = this.state.answers,
            answer = find(answers, (a) => { return a.id == e.target.id })

        answer.isRight = e.target.checked;
        this.setState({ answers: [...answers] })
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({ errors: {}, isLoding: true })
            this.props.mergeQuestion(this.state).then(() => {
                this.props.addFlashMessage({
                    type: 'success',
                    text: 'Вопрос успешно сохранен. Можете перейти к созданию теста.'
                })

                if (this.props.questionid == 0) {
                    this.setState(defaultState)
                }else{
                    this.context.router.push('/organization/questionbase');
                }
            }).catch(() =>{
                this.setState({ isLoding: false })
            })
        }
    }

    getErrorTabView(){
        return (<i className='fa fa-exclamation-circle fa-lg text-danger' title='Допушены ошибки'></i>)
    }

    getAnswerCount(){
        const {type, answers} = this.state;
        return type == questionTypes.full ? 0 : answers.length;
    }

    checkCommonErrors(){
        const {name, point} = this.state.errors
        return (name || point); 
    }

    checkQuestionErrors(){
        const {description} = this.state.errors
        return !!description;
    }

    checkAnswersErrors(){
        const {answers} = this.state.errors
        return !!answers;
    }

    render() {

        const {isFetching, directories} = this.props.mergedirectories,
        {name, dir, errors, description, type, point, isLoding, invalid, isShuffleAnswer, answers } = this.state,
        alerts = [
            'Созданные вопросы в дальнейшем, будут использоваться для составления Ваших тестов. Их можно удобно сгруппировать на основе созданных вами директорий.',
            'От выбранного Вами типа вопроса, будет так же зависить форма добавления ответов к этому вопросу.',
            'Иногда Вам нужно, чтобы ответы на вопрос, выдавались тестируемому в случайном порядке, это легко сделать просто установив соответствующий параметр.',
        ]

        return (
            <form onSubmit={this.onSubmit}>
                <ul className='nav nav-tabs'>
                    <li className='active'>
                        <a href='#common' data-toggle='tab'><span>Общие параметры </span>{this.checkCommonErrors() && this.getErrorTabView()}</a>
                    </li>
                    <li>
                        <a href='#question' data-toggle='tab'><span>Описание </span>{this.checkQuestionErrors() && this.getErrorTabView()}</a>
                    </li>
                    <li>
                        <a href='#answers' data-toggle='tab'><span>Ответы <span title='Количество ответов' className='badge'>{this.getAnswerCount()}</span>
                            </span>{this.checkAnswersErrors() && this.getErrorTabView()}
                        </a>
                    </li>
                </ul>
                <div className='tab-content padding-t-2 '>
                    <div className='tab-pane active' id='common'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <InputFieldGroup
                                    label='Название'
                                    name='name'
                                    type='text'
                                    placeholder='Введите название'
                                    value={name}
                                    error={errors.name}
                                    onChange={this.onChange}
                                    />
                                <SelectFieldGroup
                                    name='type'
                                    label='Тип вопроса'
                                    onChange = {this.clearAnswers}
                                    disabledValue='Выберите тип вопроса'
                                    value={type}
                                    options={typesCollection}
                                />
                                <SelectFieldGroup 
                                    name='dir'
                                    label='Директория'
                                    onChange = {this.onChange}
                                    disabledValue='Выберите директорию'
                                    value={dir}
                                    options={directories}
                                    error={errors.dir}
                                    isFetching={isFetching}
                                    EmptyText='Вы еще не создавали директорий.'
                                /> 
                                <InputFieldGroup
                                    label='Количество баллов за вопрос'
                                    name='point'
                                    type='text'
                                    placeholder='Введите количество баллов'
                                    value={point}
                                    error={errors.point}
                                    onChange={this.onChange}
                                    />
                                <div className='form-group'>
                                    <div className='checkbox'>
                                        <label>
                                            <input type='checkbox'
                                                name='isShuffleAnswer'
                                                checked={isShuffleAnswer}
                                                onChange={this.onChangeShuffleAnswer}
                                                />Перемешивать ответы?
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-5 col-md-offset-1'>
                                <AlertsCollection styles='alert alert-info' alerts={alerts} />
                            </div>
                        </div>
                    </div>
                    <div className='tab-pane' id='question'>
                        <div className='form-group'>
                            <label className={classnames('control-label', { 'text-danger': errors.description }) }>Тело вопроса</label>
                            <TextEditor type='big' error={errors.description} content={description} onChange={this.onChangeTextEditor}></TextEditor>
                        </div>
                    </div>
                    <div className='tab-pane' id='answers'>
                        <QuestionAnswers answers={answers}
                            error={errors.answers}
                            addAnswer={this.addAnswer}
                            deleteAnswer={this.deleteAnswer}
                            setRightAnswer={this.setRightAnswer}
                            questionType={type}>
                        </QuestionAnswers>
                    </div>
                </div>
                <div className='form-group'>
                    <Button
                        text='Сохранить вопрос'
                        isLoding={isLoding}
                        invalid={invalid}
                        className='btn btn-primary'
                        />
                    <button onClick={this.context.router.goBack} type='button' className='btn btn-default margin-l-1'>Назад</button>
                </div>
            </form>
        )
    }
}

FormMergeQuestion.propTypes = {
    mergedirectories: React.PropTypes.object,
    questionid: React.PropTypes.string.isRequired
}

FormMergeQuestion.contextTypes = {
    router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        mergedirectories: state.mergedirectories,

    }
}

export default connect(mapStateToProps, { getMergeDirectories, getQuestion, addFlashMessage, mergeQuestion })(FormMergeQuestion);