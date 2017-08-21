import React, {Component} from 'react'
import FormMergeExam from '../components/FormMergeExam';

class MergeExam extends Component {
    render () {
        return (
            <div>
                <h2>{(this.props.params.id == 0) ? 'Добавление экзамена' : 'Редактирование экзамена'}</h2>
                <div className='row'>
                    <div className='col-md-12'>
                        <FormMergeExam examid={this.props.params.id}/>      
                    </div>
                </div>
            </div>
        )
    }
}

export default MergeExam