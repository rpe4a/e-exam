import React, {Component} from 'react'
import TaskPickedQuestion from '../components/TaskPickedQuestion';
import {without} from 'lodash/array'
import {some} from 'lodash/collection'
import Validation from '../validation/AddTaskVariant';
import InputFieldGroup from '../components/InputFieldGroup';
import classnames from 'classnames';
import shortid from 'shortid';
import AlertsCollection from '../components/AlertsCollection';

const defaultState = {
    id: 0,
    name: '',
    questions: [],
    isRandomOrder: false,
    invalid: true,
    errors: {}
}

class AddTaskVariant extends Component {
    constructor(props) {
        super(props)

        this.state = defaultState

        this.onChangeRandomOrder = this.onChangeRandomOrder.bind(this);
        this.onCheckVariantQuestion = this.onCheckVariantQuestion.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onUnCheckVariantQuestion = this.onUnCheckVariantQuestion.bind(this);
        this.addVariant = this.addVariant.bind(this);
        this._getQuestionView = this._getQuestionView.bind(this);
    }

    onChangeRandomOrder(e) {
        this.setState({ isRandomOrder: e.target.checked })
    }

    isValid() {
        const { errors, isValid } = Validation(this.state);

        if (!isValid) {
            this.setState({ errors });
        }

        return isValid;
    }

    componentWillReceiveProps() {
        this.setState(defaultState)
    }

    onChangeName(e) {
        e.preventDefault();
        this.setState({ name: e.target.value })
    }

    onCheckVariantQuestion(question) {
        this.setState({ questions: [...this.state.questions, question,] })
    }

    onUnCheckVariantQuestion(question) {
        this.setState({ questions: without(this.state.questions, question) })
    }

    addVariant(e) {
        e.preventDefault();
        if (this.isValid()) {
            const { name, questions, isRandomOrder} = this.state;
            this.props.addFlashMessage({
                type: 'success',
                text: 'Вариант успешно добавлен.'
            })
            this.props.addVariant({ id: shortid.generate(), name, questions, isRandomOrder })
            this.setState(defaultState)
        }
    }

    _getQuestionView() {
        const {pickedQuestions} = this.props, {questions} = this.state;
        if (pickedQuestions.length > 0)
            return (
                pickedQuestions.map((q) => {
                    const checked = (questions.length > 0) ? some(questions, q) : false; //проверяем, если какие вопросы уже добавлены в вариант
                    return <TaskPickedQuestion key={q.id}
                        question={q}
                        checked={checked}
                        onCheckVariantQuestion={this.onCheckVariantQuestion}
                        onUnCheckVariantQuestion={this.onUnCheckVariantQuestion}/>
                }))
        else
            return (
                <div className=' alert alert-warning'>
                    <strong>Упс! </strong>Похоже Вы еще не выбрали вопросы для составления вариантов.Сделайте это на вкладке Вопросы.
                </div>
            )

    }

    render() {
        const {errors} = this.state;

        const alerts = [
            'Вы можете добавлять неограниченное количество вариантов.',
            'Вам необязательно включать все вопросы, которые вы выбрали из Вашей базы вопросов в текущий вариант.',
            'Параметр случайного перемещивания, говорит системе, что при генерации данного варианта теста пользователю, вопросы будут идти в произвольном порядке.',
        ]

        return (
            <div className='row'>
                <div className='col-md-12'>
                    <AlertsCollection styles='alert alert-info' alerts={alerts} />
                </div>
                <div className='col-md-12'>
                    <div className='panel panel-default '>
                        <div className='panel-body row'>
                            <div className='col-md-8'>
                                <label className={classnames('control-label', { 'text-danger': errors.questions }) }>Выберите вопросы для варианта</label>
                                <div>{(errors.questions) ? <span className='text-danger'>{errors.questions}</span> : ''}</div>
                                {this._getQuestionView() }
                                <InputFieldGroup
                                    label='Название варианта'
                                    name='name'
                                    type='text'
                                    placeholder='Введите название'
                                    value={this.state.name}
                                    error={errors.name}
                                    onChange={this.onChangeName}
                                    />
                                <div className='form-group'>
                                    <div className='checkbox'>
                                        <label>
                                            <input type='checkbox'
                                                name='isRandomOrder'
                                                checked={this.state.isRandomOrder}
                                                onChange={this.onChangeRandomOrder}
                                                />Случайно перемешивать вопросы?
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='panel-footer'>
                            <button type='button' title='Добавить вариант' onClick={this.addVariant} className='btn btn-success'>Добавить вариант</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddTaskVariant.propTypes = {
    pickedQuestions: React.PropTypes.array.isRequired,
    addVariant: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
}

export default AddTaskVariant