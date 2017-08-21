import React, {Component} from 'react'
import AlertsCollection from '../components/AlertsCollection';
import Base from '../components/Base';
import TaskQuestionBaseThing from './TaskQuestionBaseThing';
import TaskQuestionBaseDirectoryView from './TaskQuestionBaseDirectoryView';
import TaskQuestionsManager  from '../managers/TaskQuestionsManager';
import {some} from 'lodash/collection';
import DirectoryView from './DirectoryView';
import PreLoader from '../components/PreLoader';

class TaskQuestionBase extends Component {

    constructor(props){
        super(props)

        this.selectQuestion = this.selectQuestion.bind(this)
        this._getQuestions = this._getQuestions.bind(this)
        this._getBaseView = this._getBaseView.bind(this)
    }

    selectQuestion(q){
        q.checked = some(this.props.pickedQuestions, { id: q.id })
    }

    _getQuestions(){
        const {questionBase, taskType} = this.props;
        return new TaskQuestionsManager(questionBase.elements).GetQuestions(taskType);
    }

    _getBaseView() {
        const {questionBase, checkQuestion, uncheckQuestion} = this.props;

        if (questionBase.isFetching)
            return <PreLoader />
        if (questionBase.directories.length <= 0)
            return <AlertsCollection header='Внимание' alerts={['Вы еще не создавали директорий и/или заданий.']} styles='alert alert-warning' />

        return (<Base base={{ directories: questionBase.directories, elements: this._getQuestions() }}
                        handlers = {{ checkQuestion: checkQuestion, uncheckQuestion: uncheckQuestion }}
                        changeDirectoryThing={this.selectQuestion}
                        DynamicThingComponent={TaskQuestionBaseThing}
                        DynamicDirectoryViewComponent={DirectoryView(TaskQuestionBaseDirectoryView)}
                        />)
    }

    render() {
        const {error} = this.props,
        alerts = [
            'Здесь представлена база Ваших вопросов.',
            'Используя ее, Вы должны выбрать вопросы, которые будут использоваться для составления вариантов задания выбранного Вами типа.',
            'Вы можете использовать всю Вашу базу вопросов для сборки вариантов задания.',
        ]
        
        return (
            <div className='row'>
                <div className='col-md-12'>
                    <AlertsCollection styles='alert alert-info' alerts={alerts} />
                    <AlertsCollection styles='alert alert-danger' header='Ошибки' alerts={[error]} />
                </div>
                <div className='col-md-12 margin-b-1'>
                     {this._getBaseView()}
                </div>
            </div>
        )
    }
}

TaskQuestionBase.propTypes = {
    questionBase: React.PropTypes.object.isRequired,
    pickedQuestions: React.PropTypes.array.isRequired,
    checkQuestion: React.PropTypes.func.isRequired,
    uncheckQuestion: React.PropTypes.func.isRequired,
    taskType: React.PropTypes.number.isRequired,
    error: React.PropTypes.string,
}

export default TaskQuestionBase