import React, {Component} from 'react'
import { Link } from 'react-router';
import classnames from 'classnames';
/*import ExamBase from '../components/ExamBase';*/
import {connect} from 'react-redux';
/*import {getExamBase, deleteExamDirectory, deleteExam} from '../actions/examBaseActions';*/
import {addFlashMessage } from '../actions/flashMessageActions';
import {directoryTypes} from '../utils/constants';
import PreLoader from '../components/PreLoader';
import AlertsCollection from '../components/AlertsCollection';
import ExamBaseThing from '../components/ExamBaseThing';
import ExamBaseDirectoryView from '../components/ExamBaseDirectoryView';
import DirectoryView from '../components/DirectoryView';
import Base from '../components/Base';
import { bindActionCreators } from 'redux'
import BaseManager from '../actions/baseActions';

class ExamBasePage extends Component {
    constructor(props) {
        super(props)

        this.getExamBaseView = this.getExamBaseView.bind(this)
        this.isCanCreateExam = this.isCanCreateExam.bind(this)
    }


    componentDidMount() {
        this.props.getExamBase();
    }

    getExamBaseView() {
        const {isFetching, directories} = this.props.examBase;

        if (isFetching)
            return <PreLoader />
        if (directories.length <= 0)
            return <AlertsCollection header='Внимание' alerts={['Вы еще не создавали директорий и/или экзаменов.']} styles='alert alert-warning' />

        const {examBase, deleteExam, deleteExamDirectory, addFlashMessage} = this.props;

        return (/*<ExamBase examBase={examBase}
            deleteExam={deleteExam}
            deleteDirectory={deleteExamDirectory}
            addFlashMessage={addFlashMessage}
            />*/
            <Base base={{ directories: examBase.directories, elements: examBase.elements/*questionBase.questions*/ }}
                    handlers = {{ deleteThing: deleteExam, deleteDirectory: deleteExamDirectory }}
                    DynamicThingComponent={ExamBaseThing}
                    DynamicDirectoryViewComponent={DirectoryView(ExamBaseDirectoryView)}
                    addFlashMessage={addFlashMessage}
                    />
            )
    }

    isCanCreateExam() {
        return !(this.props.examBase.directories.length > 0);
    }

    render() {
        return (
            <div>
                <h2>База экзаменов</h2>
                <p>
                    <i>
                        На данной странице представлена база экзаменов, с которыми предстоит работать Вашим пользователям.
                        Для более удобного манипулирования ими, Вы можете сгруппировать их по разным директориям с произвольным уровнем вложенности.Создав необходимые экзамены,
                        Вы можете перейти к назначению пользователей на них.
                    </i>
                </p>
                <div id='links ' className='margin-b-2'>
                    <Link to='/organization/exambase/mergedirectory/0'
                        query={{ type: directoryTypes.exam }}
                        className='btn btn-primary'>Создать директорию
                    </Link>
                    <Link to='/organization/exambase/mergeexam/0'  className={classnames('btn btn-primary margin-l-1', { 'disabled': this.isCanCreateExam() }) }>Создать экзамен</Link>
                </div>
                {this.getExamBaseView() }
            </div>
        )
    }
}

ExamBasePage.propTypes = {
    examBase: React.PropTypes.object.isRequired,
    getExamBase: React.PropTypes.func.isRequired,
    deleteExam: React.PropTypes.func.isRequired,
    deleteExamDirectory: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        examBase: state.base,
    }
}

function mapDispatchToProps(dispatch) {
    const BaseActions = new BaseManager.Create(directoryTypes.exam);
    
    return bindActionCreators({
         getExamBase: BaseActions.getBase,
         deleteExam: BaseActions.deleteThing,
         deleteExamDirectory: BaseActions.delDirectory,
         addFlashMessage}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ExamBasePage);

/*export default connect(mapStateToProps, { getExamBase, deleteExam, deleteExamDirectory, addFlashMessage })(ExamBasePage);*/
