import React, {Component} from 'react'
import Base from './Base';
import {find} from 'lodash/collection';
import ExamBaseThing from './ExamBaseThing';
import ExamBaseDirectoryView from './ExamBaseDirectoryView';
import DirectoryView from './DirectoryView';

class ExamBase extends Component {
    constructor(props) {
        super(props)

        this.DeleteExam = this.DeleteExam.bind(this)
        this.DeleteDirectory = this.DeleteDirectory.bind(this)
    }

    DeleteDirectory(e) {
        e.preventDefault();
        e.stopPropagation();

        if (confirm('Вы точно хотите удалить директорию и все ее содержимое?')) {
            const directory = find(this.props.examBase.directories, (d) => { return d.id == e.target.id })
            this.props.deleteDirectory(directory).then(() => {
                this.props.addFlashMessage({
                    type: 'success',
                    text: 'Директория успешно удалена.'
                })
            }).catch(() => { });
        }
    }

    DeleteExam(e) {
        e.preventDefault();
        e.stopPropagation();

        if (confirm('Вы точно хотите удалить экзамен?')) {
            this.props.deleteExam(e.target.id).then(() => {
                this.props.addFlashMessage({
                    type: 'success',
                    text: 'Экзамен успешно удален.'
                })
            }).catch(() => { });
        }
    }

    render () {
        const {examBase} = this.props;
        return (
            <div>
                <Base base={{ directories: examBase.directories, elements: examBase.exams }}
                        handlers = {{ deleteThing :this.DeleteExam, deleteDirectory: this.DeleteDirectory}}
                        DynamicThingComponent={ExamBaseThing}
                        DynamicDirectoryViewComponent={DirectoryView(ExamBaseDirectoryView)}
                        />   
            </div>
        )
    }
}

ExamBase.propTypes = {
    examBase: React.PropTypes.object.isRequired,
    deleteExam: React.PropTypes.func.isRequired,
    deleteDirectory: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
}

export default ExamBase