import React, {Component} from 'react'
import ReviewThing from '../components/ReviewThing';
/*import ReviewExam from '../components/ReviewExam';*/
import {connect} from 'react-redux';
import {reviewExam } from '../actions/examActions';
import { Link } from 'react-router';
import {taskTypes}  from '../utils/constants';

const properties ={
    name: 'Название',
    availableAt: 'Доступен до', 
    availableFrom: 'Доступен с', 
    time: 'Время экзамена', 
    dirName: 'Родительская директория', 
    tasks: 'Задания'
}

const TaskView = ({task}) => {
    return <li className='list-group-item'>
        {(task.type == taskTypes.test) ? <i title='Тест' className='fa fa-align-justify'></i> : <i title='Свободная форма ответа' className='fa fa-pencil-square-o'></i>}
        <Link to={`/organization/taskbase/task/${task.id}`} className='btn btn-link'>{task.name}</Link>
    </li>
};

class ExamReviewPage extends Component {
    constructor (props) {
        super(props)
        
        this.changeTime = this.changeTime.bind(this)
    }
    
    
    componentDidMount() {
        this.props.reviewExam(this.props.params.id) 
    }

    changeTime(prop){
        const {exam} = this.props;

        if(prop === 'time')
            return `${exam[prop]} мин.`
        else 
            return exam[prop]
    }

    render() {
        const { exam } = this.props;
        return (
            <div>
                <h2>Просмотр экзамена</h2>
                <div className='row'>
                    <div className='col-md-12'>
                        <ReviewThing thing={exam} ChangePropName={this.changeTime} properties={properties} children='tasks' DynamicChildrenView={TaskView} />
                    </div>
                </div>
            </div>

        )
    }
}

ExamReviewPage.propTypes = {
    exam: React.PropTypes.object.isRequired,
    reviewExam: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        exam: state.exam,
    }
}

export default connect(mapStateToProps, { reviewExam })(ExamReviewPage)