import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserExams, deleteUserExam } from '../actions/userActions';
import UserExams from '../components/UserExams';
import AlertsCollection from '../components/AlertsCollection';
import {addFlashMessage } from '../actions/flashMessageActions';
import PreLoader from '../components/PreLoader';

class UserExamsPage extends Component {
    constructor(props){
        super(props)

        this._getView = this._getView.bind(this)
    }

    componentDidMount() {
        this.props.getUserExams();
    }

    _getView() {
        const {userExams, deleteUserExam, addFlashMessage} = this.props;

        if (userExams.isFetching)
            return <PreLoader />
        if (userExams.exams.length <= 0)
            return <AlertsCollection header='Внимание' alerts={['Вам еще не было назначено экзаменов']} styles='alert alert-warning' />

        return (<UserExams userExams={userExams.exams} deleteUserExam={deleteUserExam} addFlashMessage={addFlashMessage} />)
    }

    render() {
        const alerts = [
            'Здесь представлены все Ваши экзамены, как пройденные, так и нет.',
            'Вы можете пройти или посмотреть результат того или иного экзамена, так же доступна кнопка удаления экзамена.',
            'Доступен фильтр по названиям экзаменов.',
            'Все подробности и описание экзамена, Вы можете узнать по кнопке подробнее.',
        ]

        return (
            <div className='row margin-t-2'>
                <div className='col-md-12'>
                    <AlertsCollection alerts={alerts} styles='alert alert-info' />
                </div>
                <div className='col-md-12'>
                    {this._getView()}
                </div>
            </div>
        );
    }
}

UserExamsPage.propTypes = {
    userExams: React.PropTypes.object.isRequired,
    getUserExams: React.PropTypes.func.isRequired,
    deleteUserExam: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        userExams: { exams :state.user.exams, isFetching: state.user.isFetching},
    }
}

export default connect(mapStateToProps, { getUserExams, deleteUserExam, addFlashMessage })(UserExamsPage);
