import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getExamWithUserGroup, mergeUserGroup} from '../actions/examActions';
import {getMergeDirectories} from '../actions/direcroriesActions';
import {directoryTypes} from '../utils/constants';
import InputFieldGroup from '../components/InputFieldGroup';
import MultiSelectFieldGroup from '../components/MultiSelectFieldGroup';
import {xor} from 'lodash/array';
import Button from '../components/Button';
import {addFlashMessage } from '../actions/flashMessageActions';

const defaultState = {
    id:0,
    name: '',
    availableFrom: '',
    availableAt: '',
    groups: [],
    isLoding: false,
    invalid: false
}

class FormMergeUserGroup extends Component {
    constructor(props) {
        super(props);
        
        this.state = defaultState;

        this.onMultipleChange = this.onMultipleChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getExamWithUserGroup(this.props.examid).then((exam) => {
            this.setState({...exam.data})
        })

        this.props.getMergeDirectories(directoryTypes.client)
    }

    onChange(e){
        e.preventDefault();
    }

    onMultipleChange(e) {
        e.preventDefault();

        const {groups} = this.state;
        this.setState({ groups: xor(groups, [e.target.value]) });
    }
    
    onSubmit(e){
        e.preventDefault();
        this.setState({isLoding: true })

        this.props.mergeUserGroup(this.state).then(() => {
                this.props.addFlashMessage({
                    type: 'success',
                    text: 'Группы успешно назначены. Ваши пользователи могут перейти к прохождению экзамена.'
                })

                this.context.router.push('/organization/exambase');

            }).catch(() =>{
                this.setState({ isLoding: false })
            })
    }
    
    render() {
        const {directories, isFetching} = this.props.usergroups;
        const {name, availableFrom, availableAt, groups, isLoding, invalid}= this.state;

        return (
             <form onSubmit={this.onSubmit}>
                <InputFieldGroup
                        label='Название экзамена'
                        name='name'
                        type='text'
                        placeholder=''
                        onChange={this.onChange}
                        value={name}
                        disabled={true}
                        />
                <InputFieldGroup
                        label='Доступен с'
                        name='name'
                        type='text'
                        onChange={this.onChange}
                        placeholder=''
                        value={availableFrom}
                        disabled={true}
                        />
                <InputFieldGroup
                        label='Доступен до'
                        name='name'
                        onChange={this.onChange}
                        type='text'
                        placeholder=''
                        value={availableAt}
                        disabled={true}
                        />
                <MultiSelectFieldGroup 
                        name='dirs'
                        label='Группы пользователей'
                        onChange = {this.onMultipleChange}
                        value={groups}
                        options={directories}
                        isFetching={isFetching}
                        EmptyText='Вы еще не создавали групп.'
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
        );
    }
}

FormMergeUserGroup.propTypes = {
    examid: React.PropTypes.string.isRequired,
    getExamWithUserGroup:  React.PropTypes.func.isRequired,
    getMergeDirectories:  React.PropTypes.func.isRequired,
}

FormMergeUserGroup.contextTypes = {
    router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        usergroups: state.mergedirectories,
    }
}

export default connect(mapStateToProps, { getExamWithUserGroup, getMergeDirectories, mergeUserGroup, addFlashMessage})(FormMergeUserGroup);