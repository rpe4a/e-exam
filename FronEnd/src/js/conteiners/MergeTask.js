import React, {Component} from 'react'
import FormMergeTask from '../components/FormMergeTask';

class MergeTask extends Component {
    render () {
        return (
            <div>
                <h2>{(this.props.params.id == 0) ? 'Добавление задания' : 'Редактирование задания'}</h2>
                <div className='row'>
                    <div className='col-md-12'>
                        <FormMergeTask taskid={this.props.params.id}/>      
                    </div>
                </div>
            </div>
        )
    }
}

export default MergeTask