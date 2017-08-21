import React, {Component} from 'react';
import InputFieldGroup from '../components/InputFieldGroup';
import SelectFieldGroup from '../components/SelectFieldGroup';
import TextAreaGroup from '../components/TextAreaGroup';
import MergeDirectoryManager from '../managers/MergeDirectoryManager';
import Button from '../components/Button';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import {mergeDirectory, getDirectory } from '../actions/direcroriesActions';
import {addFlashMessage } from '../actions/flashMessageActions';
import Validation from '../validation/FormMergeDirectory';
import { bindActionCreators } from 'redux'
/*import PreLoader from '../components/PreLoader';*/

const defaultState = {
    name: '',
    description: '',
    parentId: '',
    errors: {},
    isLoding: false,
    invalid: false,
}

let DirectoryManager = null;


class FormMergeDirectory extends Component {
    constructor(props) {
        super(props)

        this.state = Object.assign({}, defaultState, { type: props.type })

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const {directoryid, type, isModify} = this.props;

        if (isModify) {
            this.props.getDirectory(directoryid, type).then((res) => { this.setState({...res.data})})
        }

        this.props.getDirectories();
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

        const {isModify} = this.props;

        if (this.isValid()) {
            this.setState({ errors: {}, isLoding: true })
            this.props.mergeDirectory(this.state, isModify).then(() => {
                this.props.addFlashMessage({
                    type: 'success',
                    text: `Директория успешно сохранена. ${DirectoryManager.GetSuccessMessage()}`
                })

                if (this.props.directoryid == 0) {
                    this.setState(Object.assign({}, defaultState, { type: this.props.type }))
                } else {
                    this.context.router.push(DirectoryManager.GetBackWardLinkPath());
                }
            })
            .catch(() => {
                this.setState({ isLoding: false })
            })
        }
    }

    render() {

        const {errors, name, description, isLoding, invalid, parentId} = this.state;
        const {isFetching, directories} = this.props.mergedirectories;

        return (
            <form onSubmit={this.onSubmit}>
                <InputFieldGroup
                    label='Название'
                    name='name'
                    type='text'
                    placeholder='Введите название'
                    value={name}
                    error={errors.name}
                    onChange={this.onChange}
                    />
                <TextAreaGroup
                    name='description'
                    label='Описание'
                    placeholder='Введите название'
                    value={description}
                    onChange={this.onChange}
                    error={errors.description}
                    />
                <SelectFieldGroup 
                        name='parentId'
                        label='Директория'
                        onChange = {this.onChange}
                        disabledValue='Выберите директорию'
                        value={parentId}
                        options={directories}
                        error={errors.parentId}
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
                    <Link to={DirectoryManager.GetBackWardLinkPath()} className='btn btn-default margin-l-1'>Назад</Link>
                </div>
            </form>
        );
    }
}

FormMergeDirectory.propTypes = {
    directories: React.PropTypes.array,
    directoryid: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    isModify: React.PropTypes.bool.isRequired,
    mergeDirectory: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    getDirectory: React.PropTypes.func.isRequired,
    getDirectories: React.PropTypes.func.isRequired,
}

FormMergeDirectory.contextTypes = {
    router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        mergedirectories: state.mergedirectories,
    }
}

function mapDispatchToProps(dispatch, props) {
    DirectoryManager = new MergeDirectoryManager.Create(props.type);
    return bindActionCreators({mergeDirectory, addFlashMessage, getDirectory, getDirectories: DirectoryManager.GetDirectories()}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormMergeDirectory);