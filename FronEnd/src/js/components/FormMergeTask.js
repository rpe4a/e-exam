import React, {Component} from 'react'
import InputFieldGroup from '../components/InputFieldGroup';
import SelectFieldGroup from '../components/SelectFieldGroup';
/*import TextAreaGroup from '../components/TextAreaGroup';*/
import Button from '../components/Button';
import {connect} from 'react-redux';
import {getTaskOptions, getTask, mergeTask} from '../actions/taskActions';
import AlertsCollection from '../components/AlertsCollection';
import TaskQuestionBase from '../components/TaskQuestionBase';
import TaskVariants from '../components/TaskVariants';
import {without, uniqBy} from 'lodash/array'
import {find, reject, reduce} from 'lodash/collection'
import AddTaskVariant from '../components/AddTaskVariant';
import Validation from '../validation/FormMergeTask';
import {addFlashMessage } from '../actions/flashMessageActions';
import {taskTypes} from '../utils/constants';
import classnames from 'classnames';
import TextEditor from '../components/TextEditor';

const defaultState = {
    id:0,
    name: '',
    description: '',
    dir: '',
    type: '1',
    errors: {},
    pickedQuestions: [],
    variants:[],
    isLoding: false,
    invalid: false
}

const types = [
    {
        name: 'Тест',
        id: taskTypes.test
    },
    {
        name: 'Свободная форма ответа',
        id: taskTypes.freeform
    }
]

class FormMergeTask extends Component {

    constructor(props) {
        super(props);
        
        this.state = defaultState;

        this.onChange = this.onChange.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.checkQuestion = this.checkQuestion.bind(this);
        this.uncheckQuestion = this.uncheckQuestion.bind(this);
        this.AddVariant = this.AddVariant.bind(this);
        this.DeleteVariant = this.DeleteVariant.bind(this);
        this.getSorteredVariant = this.getSorteredVariant.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.isValid = this.isValid.bind(this);
        this.checkCommonErrors = this.checkCommonErrors.bind(this);
        this.checkQuestionErrors = this.checkQuestionErrors.bind(this);
        this.checkVariantsErrors = this.checkVariantsErrors.bind(this);
        this.checkTaskErrors = this.checkTaskErrors.bind(this);
        this.onChangeTextEditor = this.onChangeTextEditor.bind(this);
    }
    
    componentDidMount() {
        if (this.props.taskid != 0) {
            this.props.getTask(this.props.taskid)
                .then((t) => {
                    const {variants} = t.data;
                    
                    this.setState({...t.data, pickedQuestions: this.getPickedQuestions(variants)})
                })
        }
        this.props.getTaskOptions();
    }

    getPickedQuestions(variants){
        let questions = reduce(variants, (array, v) => {return array.concat([...v.questions])}, [])
        return uniqBy(questions, 'id') //убираем дубликаты
    }

    isValid(){
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
    onChangeTextEditor(e) {
        this.setState({ description: e.target.getContent() });
    }
    onChangeType(e){
        e.preventDefault();
        this.setState({ type: e.target.value, pickedQuestions:[], variants:[] });
    }
    checkQuestion(question){
        this.setState({pickedQuestions: [...this.state.pickedQuestions, question]})
    }

    uncheckQuestion(question){
        this.setState({pickedQuestions: reject(this.state.pickedQuestions, {id: question.id})})
    }

    AddVariant(variant){
        this.setState({variants: [...this.state.variants, variant]})
    }

    DeleteVariant(variant){
        this.setState({variants: without(this.state.variants, variant)})
    }

    getSorteredVariant(SortedQuestionVariant){
        let {variants} = this.state;
        let variant = find(variants, (v) => {return v.id == SortedQuestionVariant.id})
        
        variant.questions = SortedQuestionVariant.questions

        this.setState({variants: [...variants]})
    }

    onSubmit(e){
        e.preventDefault();
        if(this.isValid()){
            this.setState({isLoding : true})
            this.props.mergeTask(this.state).then(() => {
                this.props.addFlashMessage({
                    type: 'success',
                    text: 'Задание успешно сохранено. Можете перейти к созданию экзамена.'
                })

                if (this.props.taskid == 0) {
                    this.setState(defaultState)
                }else{
                    this.context.router.push('/organization/taskbase');
                }
            }).catch(() =>{
                this.setState({ isLoding: false })
            })
        }
    }

    getErrorTabView(){
        return (<i className='fa fa-exclamation-circle fa-lg text-danger' title='Допушены ошибки'></i>)
    }

    checkCommonErrors(){
        const {name, description, dir} = this.state.errors
        return (name || description || dir); 
    }
    
    checkQuestionErrors(){
        const {pickedQuestions} = this.state.errors
        return !!pickedQuestions;
    }

    checkVariantsErrors(){
        const {variants} = this.state.errors
        return !!variants;
    }

    checkTaskErrors(){
        const {description} = this.state.errors
        return !!description;
    }

    render () {

        const {questionBase, addFlashMessage} = this.props,
        {isFetching, directories} = this.props.mergedirectories,
        {name, description, dir, type, errors, pickedQuestions, variants, isLoding, invalid} = this.state,
        
        alerts = [
            'Вы подошли к важной части создания экзамена, просим Вас быть предельно внимательными.',
            'Не переживайте, все важные детали мы вынесли для Вас в Замечания.',
            'От выбранного Вами типа задания, будут зависить доступные вопросы для выбора из Вашей базы вопросов.',
            'Обязательно выберите Директорию.',
        ];
        
        return (
            <form onSubmit={this.onSubmit}>
                <ul className='nav nav-tabs'>
                    <li className='active'>  
                        <a href='#common' data-toggle='tab'><span>Общие параметры </span>{this.checkCommonErrors() && this.getErrorTabView()}</a>
                    </li>
                    <li>
                        <a href='#task' data-toggle='tab'><span>Описание </span>{this.checkTaskErrors() && this.getErrorTabView()}</a>
                    </li>
                    <li>
                        <a href='#questions' data-toggle='tab'><span>Вопросы <span title='Количество выбранных вопросов' className='badge'>{pickedQuestions.length}</span></span>{this.checkQuestionErrors() && this.getErrorTabView()}</a>
                    </li>
                    <li>
                        <a href='#addvariants' data-toggle='tab'>Добавить вариант</a>
                    </li>
                    <li>
                        <a href='#variants' data-toggle='tab'><span>Варианты <span title='Количество вариантов' className='badge'>{variants.length}</span></span>{this.checkVariantsErrors() && this.getErrorTabView()}</a>
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
                                    label='Тип задания'
                                    onChange = {this.onChangeType}
                                    disabledValue='Выберите тип задания'
                                    value={type}
                                    options={types}
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
                    <div className='tab-pane' id='task'>
                        <div className='form-group'>
                            <label className={classnames('control-label', { 'text-danger': errors.description }) }>Тело задания</label>
                            <TextEditor type='big' error={errors.description} content={description} onChange={this.onChangeTextEditor}></TextEditor>
                        </div>
                    </div>
                    <div className='tab-pane' id='questions'>
                        <TaskQuestionBase questionBase={questionBase}
                          pickedQuestions={pickedQuestions}
                          checkQuestion={this.checkQuestion} 
                          uncheckQuestion={this.uncheckQuestion}
                          taskType={+type} 
                          error={errors.pickedQuestions}/>
                    </div>
                    <div className='tab-pane' id='addvariants'>
                        <AddTaskVariant pickedQuestions={pickedQuestions} addVariant={this.AddVariant} addFlashMessage={addFlashMessage} />
                    </div>
                    <div className='tab-pane' id='variants'>
                        <TaskVariants deleteVariant={this.DeleteVariant} getSorteredVariant={this.getSorteredVariant}  variants={variants} error={errors.variants}/>    
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

FormMergeTask.propTypes = {
    questionBase: React.PropTypes.object.isRequired,
    taskid: React.PropTypes.string.isRequired,
    mergedirectories: React.PropTypes.object.isRequired,
    getTaskOptions: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    mergeTask: React.PropTypes.func.isRequired,
    getTask: React.PropTypes.func.isRequired,
}

FormMergeTask.contextTypes = {
    router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        questionBase: state.base,
        mergedirectories: state.mergedirectories,
    }
}


export default connect(mapStateToProps, { mergeTask, getTaskOptions, addFlashMessage, getTask})(FormMergeTask);