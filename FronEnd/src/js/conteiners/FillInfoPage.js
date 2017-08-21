import React, {Component} from 'react'
import FormUserInfo from '../components/FormUserInfo';
import {connect} from 'react-redux';
import {getUserInfo, saveUserInfo } from '../actions/userActions';
import {addFlashMessage } from '../actions/flashMessageActions';
import PreLoader from '../components/PreLoader';

class FillInfoPage extends Component {
     constructor(props) {
        super(props);
        
        this._getUserInfoView = this._getUserInfoView.bind(this)
    }   

    componentDidMount() {
        this.props.getUserInfo();
    }

    _getUserInfoView() {
        const {isFetching, info } = this.props.user;

        if (isFetching)
            return <PreLoader />

        const {addFlashMessage, saveUserInfo} = this.props;
        return <FormUserInfo userStatistics={info} addFlashMessage={addFlashMessage} saveUserInfo={saveUserInfo} backwardButton={false}/>
    }

    render() {
        return (
            <div className='margin-t-3'>
                <h2 className='text-center'>Мы рады приветствовать Вас, на нашем сайте!</h2>
                <h4 className='text-center'>Постойте, Мы ничего не знаем о Вас. Пожалуйста, заполните анкету экзаменуемого, приведенную ниже.</h4>
                <div  className='row margin-t-2'>
                    <div className='col-md-4 col-md-offset-4'>
                        {this._getUserInfoView()}
                    </div>
                </div>
            </div>

        )
    }
}

FillInfoPage.propTypes = {
    user: React.PropTypes.object.isRequired,
    getUserInfo: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    saveUserInfo: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps, { getUserInfo, addFlashMessage, saveUserInfo })(FillInfoPage)