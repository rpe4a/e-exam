import React, {Component} from 'react';
import FormMergeQuestion from '../components/FormMergeQuestion';

class MergeQuestion extends Component {
    render() {
        return (
            <div>
                <h2>{(this.props.params.id == 0) ? 'Добавление вопроса' : 'Редактирование вопроса'}</h2>
                <div className='row'>
                    <div className='col-md-12'>
                        <FormMergeQuestion questionid={this.props.params.id}/>      
                    </div>
                </div>
            </div>
        );
    }
}

export default MergeQuestion;