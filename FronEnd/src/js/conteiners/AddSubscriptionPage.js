import React, {Component} from 'react';
import FormAddSubscription from '../components/FormAddSubscription';
import AlertsCollection from '../components/AlertsCollection';

class AddSubscriptionPage extends Component {
    render() {
        const alerts = [
            'Обязательно укажите Организацию и Сообщение.',
            'Справа представлена детальная информация о выбранной вами организации.',
            'Нельзя подписываться на одну организацию дважды.',
        ]

        return (
            <div className='row margin-t-2'>
                <div className='col-md-12'>
                    <AlertsCollection alerts={alerts} styles='alert alert-info' />
                </div>
                <div className='col-md-12'>
                    <FormAddSubscription />
                </div>
            </div>
        );
    }
}

export default AddSubscriptionPage;