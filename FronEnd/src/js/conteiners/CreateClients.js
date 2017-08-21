import React, {Component} from 'react'
import FormCreateClients from '../components/FormCreateClients';
import AlertsCollection from '../components/AlertsCollection';

class CreateClients extends Component {
    render () {
        const alerts = [
            'Добавляйте Ваших будующих экзаменуемых.',
            'Система сама сгенирирурет, указанное Вами количество экзаменуемых.',
            'Думайте о шаблоне, как о приставке к генерируемым именам пользователей.',
            'Для количество генерируемых пользователей, мы установили лимит (макс 100), если вам не обходимо добавить больше данного ограничения, просто сделайте это в несколько итераций.',
            'Обязательно указывайте директорию.',
        ]

        return (
            <div>
                <h2>Сгенерировать нескольких экзаменуемых</h2>
                <div className='row'>
                    <div className='col-md-6'>
                        <FormCreateClients />
                    </div>
                    <div className='col-md-5 col-md-offset-1'>
                        <AlertsCollection alerts={alerts} styles='alert alert-info' />
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateClients