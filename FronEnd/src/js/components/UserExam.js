import React, {Component} from 'react';
import { examStatus } from '../utils/constants';
import { getDateFromValue } from '../utils/dateHelper';
import { Link } from 'react-router';
import moment from 'moment';

class WaitExam extends React.Component {
    constructor(props) {
        super(props)

        this.canStart = this.canStart.bind(this)
        this.isFinished = this.isFinished.bind(this)
    }

    canStart() {
        const {availableFrom} = this.props.userExam;
        const date = getDateFromValue(availableFrom);
        return moment().isSameOrAfter(date);
    }

    isFinished() {
        const {availableAt} = this.props.userExam;
        const date = getDateFromValue(availableAt);
        return moment().isSameOrAfter(date);
    }

    render() {
        const { id, name, time, availableFrom, availableAt} = this.props.userExam;

        return (
            <div className='row'>
                <div className='col-md-8'>
                    <strong>{name} </strong>({time} мин.)
                </div>
                <div className='col-md-4'>
                    {this.isFinished() && <button type='button' onClick={this.props.DeleteExam} className='btn btn-sm btn-default '>Удалить</button>}
                    {(this.isFinished()) ? <span className='pull-right text-danger'>Закончен <strong>{availableAt}</strong></span> :
                        (this.canStart()) ? <Link to={`/exam/${id}`} className='btn btn-sm btn-success pull-right'>Начать экзамен</Link> :
                            <span className='pull-right text-warning'>Будет доступен с <strong>{availableFrom}</strong></span> }
                </div>

            </div>
        )
    }
}

class DoneExam extends React.Component {
    render() {
        const { id, name, time} = this.props.userExam;
        
        return (
            <div className='row'>
                <div className='col-md-8'>
                    <strong>{name} </strong>({time} мин.)
                </div>
                <div className='col-md-4'>
                    <button type='button' onClick={this.props.DeleteExam} className='btn btn-sm btn-default'>Удалить</button>
                    <Link to={`/user/exam/${id}`} className='margin-r-1 btn btn-sm btn-info pull-right'>Посмотреть результат</Link>
                </div>
            </div>
        )
    }
}

class UserExam extends Component {
    constructor(props) {
        super(props)

        this.getView = this.getView.bind(this)
        this.DeleteExam = this.DeleteExam.bind(this)
    }

    DeleteExam(e) {
        e.preventDefault();

        if (confirm('Вы точно хотите удалить экзамен или его историю?')) {
            const {id} = this.props.userExam;
            this.props.deleteUserExam(id).then(() => {
                this.props.addFlashMessage({
                    type: 'success',
                    text: 'Экзамен успешно удален.'
                })
            });
        }
    }

    rawMarkup(text) {
        return { __html: text };
    }

    getView() {
        switch (this.props.userExam.status) {
            case examStatus.done:
                return <DoneExam  userExam={this.props.userExam} DeleteExam={this.DeleteExam}/>
            case examStatus.wait:
                return <WaitExam  userExam={this.props.userExam} DeleteExam={this.DeleteExam}/>
        }
    }

    render() {
        const {id} = this.props.userExam;
        return (
            <li className='list-group-item padding-2'>
                {this.getView() }
                <Link to={`/exam/${id}/info`}><small>Подробнее...</small></Link>         
            </li>
        );
    }
}

UserExam.propTypes = {
    userExam: React.PropTypes.object.isRequired,
    deleteUserExam: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
}

export default UserExam;