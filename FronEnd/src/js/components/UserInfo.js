import React, {Component} from 'react';
import {filter} from 'lodash/collection';
import {examStatus} from '../utils/constants';
import classnames from 'classnames';

class UserInfo extends Component {
    constructor(props) {
        super(props)

        this._getSpecificStatusCountExams = this._getSpecificStatusCountExams.bind(this)
    }

    _getSpecificStatusCountExams(status) {
        const {exams} = this.props.info;
        return (exams.length < 0) ? 0 : filter(exams, (e) => { return e.status == status }).length;
    }


    render() {
        const {lastname, patronymic, phone, email, summury, exams, requests} = this.props.info, waitExams = this._getSpecificStatusCountExams(examStatus.wait);

        return (
            <div className='margin-tb-2'>
                <h3><strong>{lastname} {patronymic}</strong></h3>
                <p>
                    <label>Email: </label><span> {email}</span>
                </p>
                <p>
                    <label>Телефон: </label><span> {phone}</span>
                </p>
                <p>
                    <label>О себе: </label><span> {summury}</span>
                </p>
                <hr/>
                {<div className='row'>
                    <div className='col-md-6'>
                        <h4><strong>Мои экзамены: </strong></h4>

                        <ul className='list-group'>
                            <li className='list-group-item'>
                                <span className='badge'>{exams.length}</span>
                                Общее количество экзаменов.
                            </li>
                            <li className='list-group-item'>
                                <span className='badge'>{this._getSpecificStatusCountExams(examStatus.done)}</span>
                                Количество пройденных экзаменов.
                            </li>
                            <li className={classnames('list-group-item', {'active': waitExams > 0})}>
                                <span className='badge'>{waitExams}</span>
                                Количество экзаменов в ожидании.
                            </li>
                        </ul>
                        <h4><strong>Мои подписки: </strong></h4>
                        <ul className='list-group '>
                            <li className='list-group-item'>
                                <span className='badge'>{requests.length}</span>
                                Количество подписок на организации.
                            </li>
                        </ul>
                    </div>
                </div>}
            </div>
        );
    }
}

UserInfo.propTypes = {
    info: React.PropTypes.object.isRequired,
}

export default UserInfo;