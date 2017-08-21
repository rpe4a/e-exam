import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getUserRequests, handleUserRequests } from '../actions/userRequestActions';
import { addFlashMessage } from '../actions/flashMessageActions';
import AlertsCollection from '../components/AlertsCollection';
import UserRequests from '../components/UserRequests';
import PreLoader from '../components/PreLoader';
import {subscriptionStatus} from '../utils/constants';

class UserRequestsPage extends Component {
    constructor(props) {
        super(props);

        this._getView = this._getView.bind(this);
    }


    componentDidMount() {
        this.props.getUserRequests();
    }

    _getView() {
        const {userRequests, addFlashMessage, handleUserRequests} = this.props;
        if (userRequests.isFetching)
            return <PreLoader />
        if (userRequests.userRequests.length <= 0)
            return <AlertsCollection header='Внимание' alerts={['На Вашу организацию никто не подписывался']} styles='alert alert-warning' />

        return <UserRequests userRequests={userRequests.userRequests} addFlashMessage={addFlashMessage} acceptUserRequests={handleUserRequests.bind(null, subscriptionStatus.accepted)} rejectUserRequests={handleUserRequests.bind(null, subscriptionStatus.rejected)} />

    }

    render() {
        const alerts = [
            'Сюда попадают заявки пользователей.',
            'Любой пользователь может подать заявку в Вашу организацию.',
            'Вы должны принять решение добавлять пользователя или нет.',
            'Если Вы хотите принять пользователя, обязательно выберите директорию.',
        ]

        return (
            <div className='row'>
                <div className='col-md-12'>
                    <AlertsCollection alerts={alerts} styles='alert alert-info' />
                </div>
                <div className='col-md-12'>
                    {this._getView()}
                </div>
            </div>
        )
    }
}

UserRequestsPage.propTypes = {
    userRequests: React.PropTypes.object.isRequired,
    getUserRequests: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    handleUserRequests: React.PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        userRequests: state.userRequests,
    }
}

export default connect(mapStateToProps, { getUserRequests, handleUserRequests, addFlashMessage })(UserRequestsPage)