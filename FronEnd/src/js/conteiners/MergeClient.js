import React, {Component} from 'react'
import FormMergeClient from '../components/FormMergeClient';
import AlertsCollection from '../components/AlertsCollection';

class MergeClient extends Component {
    render() {
        const alerts = [
            'Добавляйте Ваших будующих экзаменуемых.',
            'Обязательно указывайте директории, к которым будет привязан Ваш экзаменуемый, это понадобится при его назначении на экзамены.',
            'При редактировании экзаменуемого, Вам разрешено только менять его директории, это сделано в целях безопастности Нашей системы.',
            'В дальнейшем пользователь может сам настроить его персональные данные в личном кабинете.',
        ]

        return (
            <div>
                <h2>{(this.props.params.id == 0) ? 'Добавление экзаменуемого' : 'Редактирование экзаменуемого'}</h2>
                <div className='row'>
                    <div className='col-md-6'>
                        <FormMergeClient clientid={this.props.params.id} />
                    </div>
                    <div className='col-md-5 col-md-offset-1'>
                        <AlertsCollection alerts={alerts} styles='alert alert-info' />
                    </div>
                </div>
            </div>
        )
    }
}



export default MergeClient