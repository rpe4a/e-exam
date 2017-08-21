import React, {Component} from 'react'
import {connect} from 'react-redux';
import {getMergeDirectories} from '../actions/direcroriesActions';
import CheckButton from '../components/CheckButton';
import UserRequest from '../components/UserRequest';
import { Link } from 'react-router';
import {some, reject} from 'lodash/collection';
import {directoryTypes} from '../utils/constants';
import SelectFieldGroup from '../components/SelectFieldGroup';
import Button from '../components/Button';

const defaultState = {
    dir: '',
    pickedUserRequests: [],
    isAcceptLoding: false,
    isRejectLoding: false,
}

class UserRequests extends Component {
    constructor(props) {
        super(props);

        this.state = defaultState;

        this.checkedAll = this.checkedAll.bind(this);
        this.unCheckedAll = this.unCheckedAll.bind(this);
        this.CheckRequest = this.CheckRequest.bind(this);
        this.UnCheckRequest = this.UnCheckRequest.bind(this);
        this.onChange = this.onChange.bind(this);
        this.AcceptRequests = this.AcceptRequests.bind(this);
        this.RejectRequests = this.RejectRequests.bind(this);
        this._isAccept = this._isAccept.bind(this);
        this._isReject = this._isReject.bind(this);
        this._successHandle = this._successHandle.bind(this);
    }

    componentDidMount() {
        this.props.getMergeDirectories(directoryTypes.client);
    }

    checkedAll() {
        this.setState({ pickedUserRequests: this.props.userRequests })
    }

    unCheckedAll() {
        this.setState({ pickedUserRequests: [] })
    }

    CheckRequest(request) {
        this.setState({ pickedUserRequests: [...this.state.pickedUserRequests, request] })
    }

    UnCheckRequest(request) {
        this.setState({ pickedUserRequests: reject(this.state.pickedUserRequests, { id: request.id }) })
    }

    onChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    _isAccept() {
        const {dir, pickedUserRequests} = this.state;

        return !dir || pickedUserRequests.length == 0;
    }

    _isReject() {
        const { pickedUserRequests} = this.state;

        return pickedUserRequests.length == 0;
    }

    _successHandle() {
        this.props.addFlashMessage({
            type: 'success',
            text: 'Пользователь(и) успешно обработан(ы).'
        })
        this.setState(defaultState)
    }

    AcceptRequests(e) {
        e.preventDefault();
        this.setState({isAcceptLoding: true});
        this.props.acceptUserRequests(this.state).then(this._successHandle()).catch(() => {
            this.setState(defaultState)
        })

    }

    RejectRequests(e) {
        e.preventDefault();
        this.setState({isRejectLoding: true});
        this.props.rejectUserRequests(this.state).then(this._successHandle())
    }

    render() {
        const {userRequests, mergedirectories} = this.props;
        const {dir, pickedUserRequests, isAcceptLoding, isRejectLoding} = this.state;

        return (
            <div className='panel panel-default'>
                <div className='panel-heading'>
                    <form className='form-inline'>
                        <CheckButton className='btn btn-default' doSomeThingChecked={this.checkedAll} doSomeThingUnChecked={this.unCheckedAll}/>
                        <div className='form-group margin-lr-1'>
                            <SelectFieldGroup
                                    name='dir'
                                    onChange = {this.onChange}
                                    disabledValue='Выберите директорию'
                                    value={dir}
                                    options={mergedirectories.directories}
                                    isFetching={mergedirectories.isFetching}
                                    EmptyText='Вы еще не создавали директорий.'
                                    />
                        </div>
                        <div className='btn-group'>
                            <Button invalid={this._isAccept() } isLoding={isAcceptLoding} text='Принять' onClick={this.AcceptRequests} className='btn btn-primary'></Button>
                            <Button invalid={this._isReject() } isLoding={isRejectLoding} text='Отклонить' onClick={this.RejectRequests} className='btn btn-primary'></Button>
                        </div>
                        <Link to='/organization/clientbase' className='btn btn-default pull-right'>Назад</Link>
                    </form>
                </div>
                <ul className='list-group'>
                    {userRequests.map((r, i) => {
                        let checked = some(pickedUserRequests, { id: r.id })
                        return <UserRequest key={i} userRequest={r} checked={checked} checkRequest={this.CheckRequest} unCheckRequest={this.UnCheckRequest} />
                    }) }
                </ul>
            </div>

        )
    }
}

UserRequests.propTypes = {
    userRequests: React.PropTypes.array.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    getMergeDirectories: React.PropTypes.func.isRequired,
    acceptUserRequests: React.PropTypes.func.isRequired,
    rejectUserRequests: React.PropTypes.func.isRequired,
    mergedirectories: React.PropTypes.object.isRequired,
}

function mapStateToProps(state) {
    return {
        mergedirectories: state.mergedirectories
    }
}

export default connect(mapStateToProps, { getMergeDirectories })(UserRequests)