import React, {Component} from 'react'
import FormSignin from '../components/FormSignin';
import {connect} from 'react-redux';
import { loginUser } from '../actions/signinActions';
import {addFlashMessage } from '../actions/flashMessageActions';

class SigninPage extends Component {
    render() {
        const { loginUser, addFlashMessage } = this.props;
        return (
            <div  className='row'>
                <div className='col-md-4 col-md-offset-4'>
                    <FormSignin  loginUser={loginUser} addFlashMessage={addFlashMessage} />
                </div>
            </div>

        )
    }
}

SigninPage.propTypes = {
    loginUser: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
};

export default connect(null, { loginUser, addFlashMessage })(SigninPage)