import React, {Component} from 'react'
import InputFieldGroup from '../components/InputFieldGroup';
import MultiSelectFieldGroup from '../components/MultiSelectFieldGroup';
import Button from '../components/Button';
import {connect} from 'react-redux';
import {getMergeDirectories } from '../actions/direcroriesActions';
import {getClient, mergeClient } from '../actions/clientsActions';
import {addFlashMessage } from '../actions/flashMessageActions';
import Validation from '../validation/FormMergeClient';
import {directoryTypes} from '../utils/constants';
import {xor} from 'lodash/array';

const defaultState = {
    id: 0,
    name: '',
    password: '',
    confirmpassword: '',
    dirs: [],
    isAuto: true,
    errors: {},
    isLoding: false,
    invalid: false,
}

class FormMergeClient extends Component {
    constructor(props) {
        super(props)

        this.state = Object.assign({}, defaultState)

        this.onChange = this.onChange.bind(this);
        this.onMultipleChange = this.onMultipleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this._IsEditMode = this._IsEditMode.bind(this);
    }

    componentDidMount() {
        const {clientid} = this.props;

        if (clientid != 0) {
            this.props.getClient(clientid).then((c) => { this.setState({...c.data})})
        }

        this.props.getMergeDirectories(directoryTypes.client);
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

    onMultipleChange(e) {
        e.preventDefault();

        const {dirs} = this.state;
        this.setState({ dirs: xor(dirs, [e.target.value]) });
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) { 
            this.setState({ errors: {}, isLoding: true })
            this.props.mergeClient(this.state).then(() => {
                this.props.addFlashMessage({
                    type: 'success',
                    text: 'Экзаменуемый успешно сохранен. Можете перейти к его назначению на экзамены.'
                })

                if (this.props.clientid == 0) {
                    this.setState(Object.assign({}, defaultState))
                } else {
                    this.context.router.push('/organization/clientbase');
                }
            }).catch(() =>{
                this.setState({ isLoding: false })
            })
        }
    }

    _IsEditMode(){
        return this.props.clientid != 0;
    }

    render () {
        const {isFetching, directories} = this.props.mergedirectories;
        
        const {name, password, confirmpassword, dirs, isAuto, errors, isLoding, invalid} = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    type='hidden'
                    name='isAuto'
                    value={isAuto}
                    disabled='true'
                    />
                <InputFieldGroup
                    label='Имя экзаменуемого'
                    name='name'
                    type='text'
                    placeholder='Введите имя'
                    value={name}
                    error={errors.name}
                    onChange={this.onChange}
                    disabled={this._IsEditMode()}
                    />
                <InputFieldGroup
                    label='Пароль экзаменуемого'
                    name='password'
                    type='password'
                    visible={this._IsEditMode()}
                    placeholder='Введите пароль'
                    value={password}
                    error={errors.password}
                    onChange={this.onChange}
                    disabled={this._IsEditMode()}
                    />
                <InputFieldGroup
                    label='Повторите пароль'
                    name='confirmpassword'
                    type='password'
                    placeholder='Повторите пароль'
                    visible={this._IsEditMode()}
                    value={confirmpassword}
                    error={errors.confirmpassword}
                    onChange={this.onChange}
                    disabled={this._IsEditMode()}
                    />
                <MultiSelectFieldGroup 
                        name='dirs'
                        label='Директория'
                        onChange = {this.onMultipleChange}
                        /*disabledValue='Выберите директорию'*/
                        value={dirs}
                        options={directories}
                        error={errors.dirs}
                        isFetching={isFetching}
                        EmptyText='Вы еще не создавали директорий.'
                    /> 
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

FormMergeClient.propTypes = {
    mergedirectories: React.PropTypes.object,
    clientid: React.PropTypes.string.isRequired,
    getMergeDirectories: React.PropTypes.func.isRequired,
    getClient: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    mergeClient: React.PropTypes.func.isRequired,
}

FormMergeClient.contextTypes = {
    router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        mergedirectories: state.mergedirectories,
    }
}

export default connect(mapStateToProps, { getMergeDirectories, getClient, addFlashMessage, mergeClient })(FormMergeClient)