import React, {Component} from 'react'
import { Link } from 'react-router';
import InputFieldGroup from '../components/InputFieldGroup';
import SelectFieldGroup from '../components/SelectFieldGroup';
import Button from '../components/Button';
import {connect} from 'react-redux';
import {getMergeDirectories } from '../actions/direcroriesActions';
import {generateClients} from '../actions/clientsActions';
import {addFlashMessage } from '../actions/flashMessageActions';
import Validation from '../validation/FormCreateClients';
import {directoryTypes} from '../utils/constants';

const defaultState = {
    prefix: '',
    count: '',
    dir: '',
    errors: {},
    isLoding: false,
    invalid: false,
}

class FormCreateClients extends Component {
    constructor(props) {
        super(props)

        this.state = Object.assign({}, defaultState)

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
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

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({ errors: {}, isLoding: true })
            this.props.generateClients(this.state).then(() => {
                this.props.addFlashMessage({
                    type: 'success',
                    text: 'Экзаменуемыe успешно сгенерированы. Можете перейти к их назначению на экзамены.'
                })

                this.context.router.push('/organization/clientbase');
            })
            .catch(() =>{
                this.setState({ isLoding: false })
            })
        }
    }

    render() {
        const {isFetching, directories} = this.props.mergedirectories;
        const {prefix, count, dir, errors, isLoding, invalid} = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <InputFieldGroup
                    label='Шаблон для имени'
                    name='prefix'
                    type='text'
                    placeholder='Введите шаблон'
                    value={prefix}
                    error={errors.prefix}
                    onChange={this.onChange}
                    />
                <InputFieldGroup
                    label='Количество генерируемых пользователей (максимум 100)'
                    name='count'
                    type='text'
                    placeholder='Введите количество'
                    value={count}
                    error={errors.count}
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
                <div className='form-group'>
                    <Button
                        text='Сгенерировать'
                        isLoding={isLoding}
                        invalid={invalid}
                        className='btn btn-primary'
                        />
                    <Link to={'/organization/clientbase'} className='btn btn-default margin-l-1'>Назад</Link>
                </div>
            </form>
        )
    }
}

FormCreateClients.propTypes = {
    mergedirectories: React.PropTypes.object,
    getMergeDirectories: React.PropTypes.func.isRequired,
    generateClients: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
}

FormCreateClients.contextTypes = {
    router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        mergedirectories: state.mergedirectories,
    }
}

export default connect(mapStateToProps, { getMergeDirectories, addFlashMessage, generateClients })(FormCreateClients)