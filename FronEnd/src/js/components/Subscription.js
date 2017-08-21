import React, {Component} from 'react';
import SubscriptionManager from '../managers/SubscriptionManager';
import {subscriptionStatus} from '../utils/constants';

class Subscription extends Component {
    constructor(props) {
        super(props)

        this.unSubscription = this.unSubscription.bind(this)
        this.deleteSubscription = this.deleteSubscription.bind(this);
        this.SubscriptionManager = SubscriptionManager.Create(props.subscription.status)
    }

    unSubscription(e) {
        e.preventDefault()
        e.stopPropagation();
        if (confirm(this.SubscriptionManager.GetConfirmMessage())) {
            this.props.unSubscription(this.props.subscription.id).then(() => {
                this.props.addFlashMessage({
                    type: 'success',
                    text: this.SubscriptionManager.GetSuccessMessage()
                })
            });
        }
    }

    deleteSubscription(e) {
        e.preventDefault()
        e.stopPropagation();
        this.props.deleteSubscription(this.props.subscription.id).then(() => {
            this.props.addFlashMessage({
                type: 'success',
                text: this.SubscriptionManager.GetSuccessMessage()
            })
        });
    }

    render() {
        const {name, status} = this.props.subscription;

        return (
            <li className='list-group-item'>
                <div className='row'>
                    <div className='col-md-9'>
                        <strong>{name} </strong>
                        {status == subscriptionStatus.processing && <small className='text-warning'> (Заявка ожидает подтверждения) </small>}
                        {status == subscriptionStatus.rejected && <small className='text-danger'> (Заявка отклонена) </small>}
                    </div>
                    <div className='col-md-3'>
                        {status == subscriptionStatus.accepted && <button type='button' onClick={this.unSubscription} className='btn btn-sm btn-danger pull-right'>Отписаться</button>}
                        {(status == subscriptionStatus.processing || status == subscriptionStatus.rejected) && <button type='button' onClick={this.deleteSubscription} className='btn btn-sm btn-default pull-right'>Удалить</button>}
                    </div>
                </div>
            </li>
        );
    }
}

Subscription.propTypes = {
    subscription: React.PropTypes.object.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    unSubscription: React.PropTypes.func.isRequired,
}

export default Subscription;