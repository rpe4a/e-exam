import React, {Component} from 'react';
import { Link } from 'react-router';
/*import QuestionsBase from '../components/QuestionsBase';*/
import PreLoader from '../components/PreLoader';
import {connect} from 'react-redux';
/*import {getQuestionBase, deleteQuestionDirectory, deleteQuestion} from '../actions/questionBaseActions';*/
import BaseManager from '../actions/baseActions';
import {addFlashMessage } from '../actions/flashMessageActions';
import classnames from 'classnames';
import {directoryTypes} from '../utils/constants';
import AlertsCollection from '../components/AlertsCollection';
import { bindActionCreators } from 'redux'
import QuestionBaseThing from '../components/QuestionBaseThing';
import QuestionBaseDirectoryView from '../components/QuestionBaseDirectoryView';
import DirectoryView from '../components/DirectoryView';
import Base from '../components/Base';

class QuestionBasePage extends Component {
    constructor(props) {
        super(props);

        this.getQuestionBaseView = this.getQuestionBaseView.bind(this)
        this.isCanCreateQuestion = this.isCanCreateQuestion.bind(this)
    }

    componentDidMount() {
        this.props.getQuestionBase();
    }

    getQuestionBaseView() {
        const {isFetching, directories} = this.props.questionBase;

        if (isFetching)
            return <PreLoader />
        if (directories.length <= 0)
            return <AlertsCollection header='Внимание' alerts={['Вы еще не создавали директорий и/или вопросов.']} styles='alert alert-warning' />

        const {questionBase, deleteQuestion, deleteQuestionDirectory, addFlashMessage} = this.props;
        return (/*<QuestionsBase questionBase={questionBase}
                    deleteQuestion={deleteQuestion}
                    deleteQuestionDirectory={deleteQuestionDirectory}
                    addFlashMessage={addFlashMessage}
            />*/
            <Base base={{ directories: questionBase.directories, elements: questionBase.elements/*questionBase.questions*/ }}
                    handlers = {{ deleteThing: deleteQuestion, deleteDirectory: deleteQuestionDirectory }}
                    DynamicThingComponent={QuestionBaseThing}
                    DynamicDirectoryViewComponent={DirectoryView(QuestionBaseDirectoryView)}
                    addFlashMessage={addFlashMessage}
                    />)
    }

    isCanCreateQuestion() {
        return !(this.props.questionBase.directories.length > 0);
    }

    render() {
        return (
            <div>
                <h2>База вопросов</h2>
                <p>
                    <i>
                        На данной странице представлена база вопросов, которые могут быть использованы в Ваших заданиях.
                        Для более удобного манипулирования ими, Вы можете сгруппировать их по разным директориям с произвольным уровнем вложенности.Создав необходимые вопросы,
                        Вы можете перейти к <Link to='/organization/taskbase'><b>созданию задания</b></Link>.
                    </i>
                </p>
                <div id='links ' className='margin-b-2'>
                    <Link to='/organization/questionbase/mergedirectory/0'
                        query={Object.assign({}, this.props.location.query, { type: directoryTypes.question }) }
                        className='btn btn-primary'>Создать директорию
                    </Link>
                    <Link to='/organization/questionbase/mergequestion/0' className={classnames('btn btn-primary margin-l-1', { 'disabled': this.isCanCreateQuestion() }) }>Создать вопрос</Link>
                </div>
                {this.getQuestionBaseView() }
            </div>
        );
    }
}

QuestionBasePage.propTypes = {
    questionBase: React.PropTypes.object.isRequired,
    getQuestionBase: React.PropTypes.func.isRequired,
    deleteQuestion: React.PropTypes.func.isRequired,
    deleteQuestionDirectory: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        questionBase: state.base,
    }
}

function mapDispatchToProps(dispatch) {
    const BaseActions = new BaseManager.Create(directoryTypes.question);
    
    return bindActionCreators({
         getQuestionBase: BaseActions.getBase,
         deleteQuestion: BaseActions.deleteThing,
         deleteQuestionDirectory: BaseActions.delDirectory,
         addFlashMessage}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionBasePage);

/*export default connect(mapStateToProps, { getQuestionBase, deleteQuestion, deleteQuestionDirectory, addFlashMessage })(QuestionBasePage); */