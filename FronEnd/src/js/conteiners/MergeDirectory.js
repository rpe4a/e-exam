import React, {Component} from 'react';
import FormMergeDirectory from '../components/FormMergeDirectory';
import AlertsCollection from '../components/AlertsCollection';

class MergeDirectory extends Component {
    constructor (props) {
        super(props)
        
        this.isModify = this.isModify.bind(this)
    }

    isModify(){
        return this.props.params.id != 0;
    }

    render() {

        const alerts = [
            'Директории используются для группировки ваших вопросов, тестов, экзаменов, пользователей. Можете думать о них, как о папках на вашей операционной системе.',
        ]

        const {id} = this.props.params, {type} = this.props.location.query;

        return (
            <div>
                <h2>{this.isModify() ?  'Редактирование директории' : 'Добавление директории'}</h2>
                <div className='row'>
                    <div className='col-md-6'>
                        <FormMergeDirectory directoryid={id} type={type} isModify={this.isModify()}/>
                    </div>
                    <div className='col-md-5 col-md-offset-1'>
                        <AlertsCollection alerts={alerts} styles='alert alert-info' />
                    </div>
                </div>

            </div>
        );
    }
}

export default MergeDirectory;