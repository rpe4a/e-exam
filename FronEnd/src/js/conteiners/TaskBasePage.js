import React, {Component} from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
/*import TaskBase from '../components/TaskBase';*/
import {connect} from 'react-redux';
/*import {getTaskBase, deleteTaskDirectory, deleteTask} from '../actions/taskBaseActions';*/
import {addFlashMessage } from '../actions/flashMessageActions';
import {directoryTypes} from '../utils/constants';
import PreLoader from '../components/PreLoader';
import AlertsCollection from '../components/AlertsCollection';
import { bindActionCreators } from 'redux'
import BaseManager from '../actions/baseActions';
import TaskBaseThing from '../components/TaskBaseThing';
import TaskBaseDirectoryView from '../components/TaskBaseDirectoryView';
import DirectoryView from '../components/DirectoryView';
import Base from '../components/Base';


class TaskBasePage extends Component {
    constructor(props) {
        super(props);
        
        this.getTaskBaseView = this.getTaskBaseView.bind(this)
        this.isCanCreateTask = this.isCanCreateTask.bind(this)
    }
    

    componentDidMount() {
        this.props.getTaskBase();
    }

    getTaskBaseView() {
        const {isFetching, directories} = this.props.taskBase;

        if (isFetching)
            return <PreLoader />
        if (directories.length <= 0)
            return <AlertsCollection header='Внимание' alerts={['Вы еще не создавали директорий и/или заданий.']} styles='alert alert-warning' />

        const {taskBase, deleteTask, deleteTaskDirectory, addFlashMessage} = this.props;

        return (/*<TaskBase taskBase={taskBase}
            deleteTask={deleteTask}
            deleteTaskDirectory={deleteTaskDirectory}
            addFlashMessage={addFlashMessage}
            />*/
                <Base base={{ directories: taskBase.directories, elements: taskBase.elements/*questionBase.questions*/ }}
                    handlers = {{ deleteThing: deleteTask, deleteDirectory: deleteTaskDirectory }}
                    DynamicThingComponent={TaskBaseThing}
                    DynamicDirectoryViewComponent={DirectoryView(TaskBaseDirectoryView)}
                    addFlashMessage={addFlashMessage}
                    />
            )
    }

    isCanCreateTask() {
        return !(this.props.taskBase.directories.length > 0);
    }

    render() {
        return (
            <div>
                <h2>База заданий</h2>
                <p>
                    <i>
                        На данной странице представлена база заданий, которые могут быть использованы в экзаменах.
                        Для более удобного манипулирования ими, Вы можете сгруппировать их по разным директориям с произвольным уровнем вложенности.Создав необходимые задания,
                        Вы можете перейти к <Link to='/organization/exambase'><b>созданию экзамена</b></Link>.
                    </i>
                </p>
                <div id='links ' className='margin-b-2'>
                    <Link to='/organization/taskbase/mergedirectory/0'
                        query={{ type: directoryTypes.task }}
                        className='btn btn-primary'>Создать директорию
                    </Link>
                    <Link to='/organization/taskbase/mergetask/0'  className={classnames('btn btn-primary margin-l-1', { 'disabled': this.isCanCreateTask() }) }>Создать задание</Link>
                </div>
                {this.getTaskBaseView()}
            </div>
        );
    }
}

TaskBasePage.propTypes = {
    taskBase: React.PropTypes.object.isRequired,
    getTaskBase: React.PropTypes.func.isRequired,
    deleteTask: React.PropTypes.func.isRequired,
    deleteTaskDirectory: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        taskBase: state.base,
    }
}

function mapDispatchToProps(dispatch) {
    const BaseActions = new BaseManager.Create(directoryTypes.task);
    
    return bindActionCreators({
         getTaskBase: BaseActions.getBase,
         deleteTask: BaseActions.deleteThing,
         deleteTaskDirectory: BaseActions.delDirectory,
         addFlashMessage}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskBasePage);

/*export default connect(mapStateToProps, { getTaskBase, deleteTask, deleteTaskDirectory, addFlashMessage })(TaskBasePage);*/ 