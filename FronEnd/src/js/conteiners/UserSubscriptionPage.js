import React, {Component} from 'react'
import {connect} from 'react-redux';
import {getUserSubscription, unSubscription, deleteSubscription} from '../actions/userActions';
import UserSubscription from '../components/UserSubscription';
import AlertsCollection from '../components/AlertsCollection';
import {addFlashMessage } from '../actions/flashMessageActions';
import PreLoader from '../components/PreLoader';
import { Link } from 'react-router';


class UserSubscriptionPage extends Component {
    constructor(props){
        super(props)

        this._getView = this._getView.bind(this)
    }

    componentDidMount() {
        this.props.getUserSubscription();
    }

    _getView() {
        const {userSubscriptions, addFlashMessage, unSubscription, deleteSubscription} = this.props;

        if (userSubscriptions.isFetching)
            return <PreLoader />
        if (userSubscriptions.subscriptions.length <= 0)
            return <AlertsCollection header='Внимание' alerts={['У вас нет подписок на организации']} styles='alert alert-warning' />

        return (<UserSubscription userSubscription={userSubscriptions.subscriptions} addFlashMessage={addFlashMessage} unSubscription={unSubscription} deleteSubscription={deleteSubscription}/>)
    }

    render() {
        const alerts = [
            'Здесь представлены Ваши подписки на организации.',
            'Подписка на тут или иную организацию дает Вам возможность, читать новости и получать экзамены от организаций.',
            'Вы можете подавать заявки на подписку. На усмотрения модератора организации, он может принять Вашу заявку или отклонить.',
            'Вы можете отписываться от организаций или удалять заявки.'
        ]

        return (
            <div className='row margin-t-2'>
                <div className='col-md-12'>
                    <Link to='/user/addsubscription' className='btn btn-primary margin-b-2'>Добавить подписку</Link>    
                    <AlertsCollection alerts={alerts} styles='alert alert-info' />
                </div>

                <div className='col-md-12'>
                    {this._getView()}
                </div>
            </div>
        );
    }
}

UserSubscriptionPage.propTypes = {
    userSubscriptions: React.PropTypes.object.isRequired,
    getUserSubscription: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    unSubscription: React.PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        userSubscriptions: {subscriptions:state.user.subscriptions, isFetching: state.user.isFetching },
    }
}

export default connect(mapStateToProps, { getUserSubscription, addFlashMessage, unSubscription, deleteSubscription })(UserSubscriptionPage);

