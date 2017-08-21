import React, {Component} from 'react';
/*import { Link } from 'react-router';*/
import {connect} from 'react-redux';
import {getUserExam, finishExam, timeOut} from '../actions/examActions';
import TestTimer from '../components/TestTimer';
import isEmpty from 'lodash/isEmpty';
import {some} from 'lodash/collection'
import {addFlashMessage } from '../actions/flashMessageActions';
class ExamLayout extends Component {
    constructor(props) {
        super(props);

        this.TimeOut = this.TimeOut.bind(this);
        this.checkIsFinishExam = this.checkIsFinishExam.bind(this);
        this.FinishExam = this.FinishExam.bind(this);
    }

    componentDidMount() {
        this.props.getUserExam(this.props.params.id);
    }

    checkIsFinishExam() {
        return some(this.props.exam.tasks, ['finish', false])
    }

    FinishExam() {
        this.props.finishExam(this.props.exam)
            .then(() => {
                this.props.addFlashMessage({
                    type: 'success',
                    text: 'Вы закончили экзамен. Можете перейти к просмотру результатов.'
                })
                this.context.router.push('/user/exams')
            })
    }

    TimeOut() {
        this.props.timeOut(this.props.exam)
            .then(() => {
                this.props.addFlashMessage({
                    type: 'warning',
                    text: 'К сожалению выделенное время Вашего экзамена истекло.'
                })

                this.FinishExam();
            })
    }


    render() {
        const {exam} = this.props;

        if (isEmpty(exam))
            return <div>Идет загрузка данных...</div>

        return (
            <div className='row'>
                <div className='col-md-12 margin-b-1'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <h3><strong>{exam.name}</strong></h3>
                        </div>
                        <div className='col-md-6 text-right margin-tb-2'>
                            <span className='margin-r-2'>Оставщееся время:
                                <TestTimer ref='timer' timeTestInterval={exam.time * 60000}
                                    startTestTime={exam.startTime}
                                    TimeOut ={this.TimeOut}
                                    />
                            </span>
                            <button className='btn btn-primary' disabled={this.checkIsFinishExam() } onClick={this.FinishExam}>Завершить экзамен</button>
                        </div>
                    </div>
                </div>
                <div className='col-md-12'>
                    <hr className='margin-t-0'/>
                    {this.props.children}
                </div>
            </div>
        );
    }
}


ExamLayout.propTypes = {
    exam: React.PropTypes.object.isRequired,
    getExam: React.PropTypes.func.isRequired,
}

ExamLayout.contextTypes = {
    router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        exam: state.exam,
    }
}

export default connect(mapStateToProps, { getUserExam, addFlashMessage, finishExam, timeOut })(ExamLayout);