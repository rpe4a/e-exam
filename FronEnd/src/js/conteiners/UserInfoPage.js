import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserInfo, saveUserInfo } from '../actions/userActions';
import AlertsCollection from '../components/AlertsCollection';
import FormUserInfo from '../components/FormUserInfo';
import {addFlashMessage } from '../actions/flashMessageActions';
/*import isEmpty from 'lodash/isEmpty';*/
import PreLoader from '../components/PreLoader';

class UserInfoPage extends Component {

    componentDidMount() {
        this.props.getUserInfo();
    }

    render() {
        const {saveUserInfo, addFlashMessage} = this.props, {info, isFetching} = this.props.userStatistics;

        const alerts = [
            'Данная вкладка предоставляет Вам возможности, отредактировать свои персональные данные.',
            'Пожалуйста укажите Ваш Email, тогда Мы сможем отправлять вам уведомления, о проверке ваших экзаменов и результатов.',
            'В графе "О себе", вы можете написать все, что за хотети, например вашу должность или образование.'
        ]

        return (
            <div className='row margin-t-2'>
                <div className='col-md-6'>
                    {(isFetching) ? <PreLoader/> : <FormUserInfo userStatistics={info} addFlashMessage={addFlashMessage} saveUserInfo={saveUserInfo} backwardButton={true}/>}
                </div>
                <div className='col-md-5 col-md-offset-1 '>
                    <AlertsCollection alerts={alerts} styles='alert alert-info' />
                </div>
            </div>
        );
    }
}

UserInfoPage.propTypes = {
    userStatistics: React.PropTypes.object.isRequired,
    getUserInfo: React.PropTypes.func.isRequired,
    saveUserInfo: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        userStatistics: state.user,
    }
}

export default connect(mapStateToProps, { getUserInfo, addFlashMessage, saveUserInfo })(UserInfoPage);