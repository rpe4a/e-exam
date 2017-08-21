import React, {Component} from 'react'
import {taskTypes}  from '../utils/constants';
import AlertsCollection from '../components/AlertsCollection';

class TaskInfo extends Component {
    constructor (props) {
        super(props)

        this.state = {
            showDescription: false
        }

        this.ShowDescription = this.ShowDescription.bind(this);
    }

    ShowDescription(){
        this.setState({showDescription: !this.state.showDescription})
    }

    rawMarkup(text) {
        return { __html: text };
    }

    render () {
        const {name, description, type} = this.props.task;
        let {showDescription} = this.state;

        return (
            <li className='list-group-item'>
                <div className='row'>
                    <div className='col-md-12'>
                        <span> {(type == taskTypes.test) ? <i title='Тест' className='fa fa-align-justify'></i> : <i title='Свободная форма ответа' className='fa fa-pencil-square-o'></i>} <strong> {name}</strong></span>
                    </div>
                </div>
                <small className='btn btn-link padding-l-0' onClick={this.ShowDescription}>Подробнее</small>
                {showDescription && <div className='row'>
                    <div className='col-md-12'>
                        <p dangerouslySetInnerHTML={this.rawMarkup(description) }></p>
                    </div>
                </div>}
            </li>
        )
    }
}

TaskInfo.propTypes = {
    task: React.PropTypes.object.isRequired,
}



export default TaskInfo

class ExamInfo extends Component {


    rawMarkup(text) {
        return { __html: text };
    }

    render() {
        const {name, description, availableFrom, availableAt, time, tasks} = this.props.exam;

        const examalers = [
            'На данной странице собрана вся необходимая Вам информация об экзамене;',
            'Глубина информации и описание экзамена зависит от Лица, который проводит экзаменирование;',
            'Данная информация может помочь Вам в подготовке к этому экзамену или освежить память по теме данного экзамена;',
            'Возникающие вопросы по данному экзамену Вы должны адресовать Лицу, которое проводит экзаменирование;',
        ]

        const tasksalers = [
            'Каждый экзамен включает в себя определенное количество заданий, которые регламентирует Лицо, которое проводит экзаменирование;',
            'Информацию по каждому заданию Вы можете уточнить нажав на кнопку "Подробнее";',
        ]

        return (
            <div>
                <div className='row'>
                    <div className='col-md-8'>
                        <h3><strong>{name}</strong></h3>
                        <p dangerouslySetInnerHTML={this.rawMarkup(description) }></p> 
                    </div>
                    <div className='col-md-4'>
                        <h3><strong>Описание</strong></h3>
                        <p><strong>Доступен с: </strong><span>{availableFrom}</span></p>
                        <p><strong>Доступен до: </strong><span>{availableAt}</span></p>
                        <p><strong>Время экзамена: </strong><span>{time} мин.</span></p>
                        <hr/>
                        <AlertsCollection alerts={examalers} styles='alert alert-info' />
                    </div>
                </div>
                <hr/>
                <div className='row'>
                    <div className='col-md-12'>
                        <AlertsCollection alerts={tasksalers} styles='alert alert-info' />
                        <h4>Данный экзамен включает задания:</h4>
                        <ul className='list-group'>
                            {tasks.map((t, i) => {
                                return <TaskInfo key={i} task={t} />
                            })}
                        </ul>
                        <button onClick={this.context.router.goBack} type='button' className='btn btn-default'>Назад</button>
                    </div>
                </div>
            </div>
        )
    }
}

ExamInfo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

ExamInfo.propTypes = {
    exam: React.PropTypes.object.isRequired,
}

export default ExamInfo