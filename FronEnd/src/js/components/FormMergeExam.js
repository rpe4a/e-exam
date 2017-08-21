import React, {Component} from 'react'
import InputFieldGroup from '../components/InputFieldGroup';
import DatePicker from '../components/DatePicker';
import TextEditor from '../components/TextEditor';
import SelectFieldGroup from '../components/SelectFieldGroup';
import Button from '../components/Button';
import ExamTaskBase from '../components/ExamTaskBase';
import AlertsCollection from '../components/AlertsCollection';
import Validation from '../validation/FormMergeExam';
import {connect} from 'react-redux';
import {getExamOptions, getExam, mergeExam} from '../actions/examActions';
import {addFlashMessage } from '../actions/flashMessageActions';
import classnames from 'classnames';
import {reject} from 'lodash/collection'

const defaultState = {
    id: 0,
    name: '',
    description: '',
    dir: '',
    availableFrom: '',
    availableAt: '',
    time: '',
    tasks: [],
    errors: {},
    isLoding: false,
    invalid: false
}

class FormMergeExam extends Component {
    constructor(props) {
        super(props)

        this.state = defaultState;

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onChangeDate = this.onChangeDate.bind(this)
        this.onChangeTextEditor = this.onChangeTextEditor.bind(this)
        this.checkTask = this.checkTask.bind(this)
        this.uncheckTask = this.uncheckTask.bind(this)
    }
    componentDidMount() {
        if (this.props.examid != 0) {
            this.props.getExam(this.props.examid).then((e) => {
                this.setState({...e.data })
            });
        }
        this.props.getExamOptions();
    }

    isValid() {
        const { errors, isValid } = Validation(this.state);

        if (!isValid) {
            this.setState({ errors });
        }

        return isValid;
    }

    onChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    onChangeDate(date) {
        this.setState(date);
    }

    checkTask(task) {
        this.setState({ tasks: [...this.state.tasks, task] })
    }

    uncheckTask(task) {
        this.setState({ tasks: reject(this.state.tasks, { id: task.id }) })
    }

    onChangeTextEditor(e) {
        this.setState({ description: e.target.getContent() });
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({ isLoding: true })
            this.props.mergeExam(this.state).then(() => {
                this.props.addFlashMessage({
                    type: 'success',
                    text: 'Экзамен успешно сохранен. Можете перейти к его назначению пользователям.'
                })

                if (this.props.examid == 0) {
                    this.setState(defaultState)
                } else {
                    this.context.router.push('/organization/exambase');
                }
            }).catch(() => {
                this.setState({ isLoding: false })
            })

        }
    }

    _getaAvailableFromMinDate() {
        return new Date();
    }

    _getaAvailableAtMinDate() {
        return new Date(this._getaAvailableFromMinDate().valueOf() + 1000 * 3600 * 24)
    }

    getErrorTabView() {
        return (<i className='fa fa-exclamation-circle fa-lg text-danger' title='Допушены ошибки'></i>)
    }

    checkCommonErrors() {
        const {name, dir, availableAt, availableFrom, time} = this.state.errors
        return (name || dir || availableAt || availableFrom || time);
    }

    render() {

        const {taskBase} = this.props,
            {isFetching, directories} = this.props.mergedirectories;
        const {name, description, availableFrom, availableAt, time, dir, errors, tasks, isLoding, invalid} = this.state;

        let alerts = [
            'В данном разделе вы можете создать экзамен с помощью Вашей базы заданий.',
            'Параметры "Доступен с" и "Доступен до" отвечают за период доступа пользователей к Вашему экзамену.',
            'В разделе описание, Вы можете написать информацию необходимую для прохождения экзамена или какие-либо пояснения к экзамену. Вообщем все, что Вы посчитаете необходимым.',
            'Обязательно выберите Директорию.',
        ]

        return (
            <form onSubmit={this.onSubmit}>
                <ul className='nav nav-tabs'>
                    <li className='active'>
                        <a href='#common' data-toggle='tab'><span>Общие параметры </span>{this.checkCommonErrors() && this.getErrorTabView() }</a>
                    </li>
                    <li>
                        <a href='#description' data-toggle='tab'><span>Описание экзамена </span>{errors.description && this.getErrorTabView() }</a>
                    </li>
                    <li>
                        <a href='#addtasks' data-toggle='tab'>Задания <span title='Количество ответов' className='badge'>{tasks.length}</span>{errors.tasks && this.getErrorTabView() }</a>
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
                                <DatePicker
                                    label='Доступен с'
                                    name='availableFrom'
                                    placeholder='Выберите дату'
                                    value={availableFrom}
                                    error={errors.availableFrom}
                                    minDate={this._getaAvailableFromMinDate() }
                                    onChange={this.onChangeDate}
                                    />
                                <DatePicker
                                    label='Доступен до'
                                    name='availableAt'
                                    placeholder='Выберите дату'
                                    value={availableAt}
                                    error={errors.availableAt}
                                    minDate={this._getaAvailableAtMinDate() }
                                    onChange={this.onChangeDate}
                                    />
                                <InputFieldGroup
                                    label='Продолжительность экзамена (минуты)'
                                    name='time'
                                    type='text'
                                    placeholder='Введите количество минут'
                                    value={time}
                                    error={errors.time}
                                    onChange={this.onChange}
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
                            </div>
                            <div className='col-md-5 col-md-offset-1'>
                                <AlertsCollection styles='alert alert-info' alerts={alerts} />
                            </div>
                        </div>
                    </div>
                    <div className='tab-pane' id='description'>
                        <div className='form-group'>
                            <label className={classnames('control-label', { 'text-danger': errors.description }) }>Описание экзамена</label>
                            <TextEditor type='big' error={errors.description} content={description} onChange={this.onChangeTextEditor}></TextEditor>
                        </div>
                    </div>
                    <div className='tab-pane' id='addtasks'>
                        <ExamTaskBase taskBase={taskBase}
                            tasks={tasks}
                            checkTask={this.checkTask}
                            uncheckTask={this.uncheckTask}
                            error={errors.tasks}/>
                    </div>
                </div>
                <div className='form-group'>
                    <Button
                        text='Сохранить'
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

FormMergeExam.propTypes = {
    taskBase: React.PropTypes.object.isRequired,
    examid: React.PropTypes.string.isRequired,
    mergedirectories: React.PropTypes.object.isRequired,
    getExamOptions: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    mergeExam: React.PropTypes.func.isRequired,
    getExam: React.PropTypes.func.isRequired,
}

FormMergeExam.contextTypes = {
    router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        taskBase: state.base,
        mergedirectories: state.mergedirectories,
    }
}

export default connect(mapStateToProps, { getExam, getExamOptions, addFlashMessage, mergeExam })(FormMergeExam);