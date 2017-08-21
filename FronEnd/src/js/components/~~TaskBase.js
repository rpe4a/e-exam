import React, {Component} from 'react'
import Base from './Base';
import {find} from 'lodash/collection';
import TaskBaseThing from './TaskBaseThing';
import TaskBaseDirectoryView from './TaskBaseDirectoryView';
import DirectoryView from './DirectoryView';

class TaskBase extends Component {
    constructor(props) {
        super(props)

        this.DeleteTask = this.DeleteTask.bind(this)
        this.DeleteDirectory = this.DeleteDirectory.bind(this)
    }

    DeleteDirectory(e) {
        e.preventDefault();
        e.stopPropagation();

        if (confirm('Вы точно хотите удалить директорию и все ее содержимое?')) {
            const directory = find(this.props.taskBase.directories, (d) => { return d.id == e.target.id })
            this.props.deleteTaskDirectory(directory)
                .then(() => {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'Директория успешно удалена.'
                    })
                }).catch(() => { });
        }
    }

    DeleteTask(e) {
        e.preventDefault();
        e.stopPropagation();

        if (confirm('Вы точно хотите удалить задание?')) {
            this.props.deleteTask(e.target.id)
                .then(() => {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'Задание успешно удалено.'
                    })
                }).catch(() => { });
        }
    }

    render() {

        const {taskBase} = this.props;
        return (
            <div>
                <Base base={{ directories: taskBase.directories, elements: taskBase.tasks }}
                    handlers = {{ deleteThing: this.DeleteTask, deleteDirectory: this.DeleteDirectory }}
                    DynamicThingComponent={TaskBaseThing}
                    DynamicDirectoryViewComponent={DirectoryView(TaskBaseDirectoryView)}
                    />
            </div>
        )
    }
}

TaskBase.propTypes = {
    taskBase: React.PropTypes.object.isRequired,
    deleteTask: React.PropTypes.func.isRequired,
    deleteTaskDirectory: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
}

export default TaskBase