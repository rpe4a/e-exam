import React, {Component} from 'react';
import {find} from 'lodash/collection';
import Base from './Base';
import QuestionBaseThing from './QuestionBaseThing';
import QuestionBaseDirectoryView from './QuestionBaseDirectoryView';
import DirectoryView from './DirectoryView';

class QuestionsBase extends Component {
    constructor(props) {
        super(props)

        this.DeleteQuestion = this.DeleteQuestion.bind(this)
        this.DeleteDirectory = this.DeleteDirectory.bind(this)
    }

    /*DeleteDirectory(e) {
        e.preventDefault();
        e.stopPropagation();


        if (confirm('Вы точно хотите удалить директорию и все ее содержимое?')) {
            const directory = find(this.props.questionBase.directories, (d) => { return d.id == e.target.id })
            this.props.deleteQuestionDirectory(directory)
                .then(() => {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'Директория успешно удалена.'
                    })
                }).catch(() => { });
        }
    }

    DeleteQuestion(e) {
        e.preventDefault();
        e.stopPropagation();

        if (confirm('Вы точно хотите удалить вопрос?')) {
            const question = find(this.props.questionBase.questions, (q) => { return q.id == e.target.id })
            this.props.deleteQuestion(question).then(() => {
                this.props.addFlashMessage({
                    type: 'success',
                    text: 'Вопрос успешно удален.'
                })
            }).catch(() => { });
        }
    }*/

    render() {

        const {questionBase} = this.props;

        return (
            <div>
                <Base base={{ directories: questionBase.directories, elements: questionBase.things/*questionBase.questions*/ }}
                    handlers = {{ deleteThing: this.DeleteQuestion, deleteDirectory: this.DeleteDirectory }}
                    DynamicThingComponent={QuestionBaseThing}
                    DynamicDirectoryViewComponent={DirectoryView(QuestionBaseDirectoryView) }
                    />
            </div>
        );
    }
}

QuestionsBase.propTypes = {
    questionBase: React.PropTypes.object.isRequired,
    deleteQuestion: React.PropTypes.func.isRequired,
    deleteQuestionDirectory: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
}

export default QuestionsBase;