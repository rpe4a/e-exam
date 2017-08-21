import React, {Component} from 'react'
import {connect} from 'react-redux';
import {getAssignExamData} from '../actions/assignexamActions';
import {addFlashMessage } from '../actions/flashMessageActions';
import isEmpty from 'lodash/isEmpty';
import MultiSelect from '../components/MultiSelect';
import FormAssignExam from '../components/FormAssignExam';

const defaultState = {
    pickedExams: [],
    pickedClientDirectories: [],
}

class AssignExamPage extends Component {
    constructor(props) {
        super(props);

        this.state = {...defaultState }

        this.pickedExams = this.pickedExams.bind(this);
        this.pickedClientDirectories = this.pickedClientDirectories.bind(this);
        this.unPickedExam = this.unPickedExam.bind(this);
        this.unPickedClientDirectory = this.unPickedClientDirectory.bind(this);
    }

    componentDidMount() {
        this.props.getAssignExamData();
    }

    pickedExams(pickedExams) {
        this.setState({ pickedExams })
    }

    pickedClientDirectories(pickedClientDirectories) {
        this.setState({ pickedClientDirectories })
    }

    unPickedExam(index) {
        let pickedExams = this.state.pickedExams.slice()
        pickedExams.splice(index, 1)
        this.setState({ pickedExams })
    }

    unPickedClientDirectory(index) {
        let pickedClientDirectories = this.state.pickedClientDirectories.slice()
        pickedClientDirectories.splice(index, 1)
        this.setState({ pickedClientDirectories })
    }

    render() {

        const {clientBase, examBase, addFlashMessage} = this.props;
        const {pickedExams, pickedClientDirectories} = this.state;

        let examBaseView = null, clientBaseView = null;


        if (isEmpty(clientBase)) {
            clientBaseView = (<div>Loading...</div>)
        } else {
            clientBaseView = <MultiSelect options={clientBase.directories}
                buttonText='Добавить'
                selectedOptions={pickedClientDirectories}
                textProp='name'
                valueProp='id'
                handleSelectionChange={this.pickedClientDirectories}
                size='20'
                placeholder='Поиск по директориям пользователей'
                />
        }

        if (isEmpty(examBase)) {
            examBaseView = (<div>Loading...</div>)
        } else {
            examBaseView = <MultiSelect options={examBase.exams}
                buttonText='Добавить'
                selectedOptions={pickedExams}
                textProp='name'
                valueProp='id'
                handleSelectionChange={this.pickedExams}
                size='20'
                placeholder='Поиск по экзаменам'
                />
        }

        return (
            <div>
                <h2>Назначение экзаменов на директории Ваших экзаменуемых</h2>
                <p>
                    <i>
                        На данной странице представлена база экзаменуемых, которым в дальнейшем можно будет назначать экзамены.
                        Для более удобного манипулирования ими, Вы можете сгруппировать их по разным директориям с произвольным уровнем вложенности.
                        Добавив необходимых экзаменуемых, Вы можете перейти к их.
                    </i>
                </p>
                <div className='row'>
                    <div className='col-md-6'>
                        {examBaseView}
                    </div>
                    <div className='col-md-6'>
                        {clientBaseView}
                    </div>
                </div>
                <FormAssignExam pickedExams={pickedExams}
                    pickedClientDirectories={pickedClientDirectories}
                    addFlashMessage={addFlashMessage}
                    unPickedExam={this.unPickedExam}
                    unPickedClientDirectory={this.unPickedClientDirectory}/>
            </div>
        )
    }
}

AssignExamPage.propTypes = {
    clientBase: React.PropTypes.object.isRequired,
    examBase: React.PropTypes.object.isRequired,
    getAssignExamData: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        clientBase: state.clientBase,
        examBase: state.examBase,
    }
}

export default connect(mapStateToProps, { getAssignExamData, addFlashMessage })(AssignExamPage);