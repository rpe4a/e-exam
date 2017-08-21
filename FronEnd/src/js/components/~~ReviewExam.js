import React, {Component} from 'react';
import PreLoader from '../components/PreLoader';
import ReviewProperty from '../components/ReviewProperty';
import {taskTypes}  from '../utils/constants';
import { Link } from 'react-router';

const TaskView = ({task}) => {
    return <li className='list-group-item'>
        {(task.type == taskTypes.test) ? <i title='Тест' className='fa fa-align-justify'></i> : <i title='Свободная форма ответа' className='fa fa-pencil-square-o'></i>}
        <Link to={`/organization/taskbase/task/${task.id}`} className='btn btn-link'>{task.name}</Link>
    </li>
};

class ReviewExam extends Component {
    rawMarkup(text) {
        return { __html: text };
    }

    render() {
        const {isFetching, name, description, availableAt, availableFrom, time, dirName, tasks} = this.props.exam;

        if (isFetching)
            return <PreLoader />

        return (
            <div >
                <ReviewProperty label='Название' name={name}/>
                <ReviewProperty label='Доступен с' name={availableFrom}/>
                <ReviewProperty label='Доступен до' name={availableAt}/>
                <ReviewProperty label='Время экзамена' name={`${time} (мин.)`}/>
                <ReviewProperty label='Родительская директория' name={dirName}/>
                <hr/>
                <h4><strong>Описание: </strong></h4>
                <div dangerouslySetInnerHTML={this.rawMarkup(description) }></div>
                <hr/>
                <h4><strong>Задания: </strong></h4>
                <ul className='list-group'>
                    {tasks.map((t, index) => {
                        return <TaskView key={index} task={t}/>
                    })}
                </ul>
                <hr/>
                <button onClick={this.context.router.goBack} type='button' className='btn btn-default'>Назад</button>
            </div>
        );
    }
}

ReviewExam.propTypes = {
    exam: React.PropTypes.object.isRequired,
};

ReviewExam.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default ReviewExam;