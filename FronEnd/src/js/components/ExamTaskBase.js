import React, {Component} from 'react'
import AlertsCollection from '../components/AlertsCollection';
import Base from './Base';
import ExamTaskBaseThing from './ExamTaskBaseThing';
import ExamTaskBaseDirectoryView from './ExamTaskBaseDirectoryView';
import {some/*, filter*/} from 'lodash/collection';
import DirectoryView from './DirectoryView';

class ExamTaskBase extends Component {
    constructor(props) {
        super(props)

        this._selectTask = this._selectTask.bind(this)
    }

    _selectTask(t) {
        t.checked = some(this.props.tasks, { id: t.id })
    }

    render() {
        const alerts = [
            'Здесь представлена Ваша база заданий.',
            'Используя ее, Вы должны выбрать задания, которые будут использоваться в экзамене.',
        ]
        const {taskBase, checkTask, uncheckTask, error} = this.props;

        return (
            <div className='row'>
                <div className='col-md-12'>
                    <AlertsCollection styles='alert alert-info' alerts={alerts} />
                    <AlertsCollection styles='alert alert-danger' header='Ошибки' alerts={[error]} />
                </div>
                <div className='col-md-12'>
                    <Base base={{ directories: taskBase.directories, elements: taskBase.elements }}
                        handlers = {{ checkTask: checkTask, uncheckTask: uncheckTask }}
                        changeDirectoryThing={this._selectTask}
                        DynamicThingComponent={ExamTaskBaseThing}
                        DynamicDirectoryViewComponent={DirectoryView(ExamTaskBaseDirectoryView)}
                        />
                </div>
            </div>
        )
    }
}

ExamTaskBase.propTypes = {
    taskBase: React.PropTypes.object.isRequired,
    checkTask: React.PropTypes.func.isRequired,
    uncheckTask: React.PropTypes.func.isRequired,
    error: React.PropTypes.string,
    tasks: React.PropTypes.array,
}

export default ExamTaskBase