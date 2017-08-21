import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserInfo } from '../actions/userActions';
import UserInfo from '../components/UserInfo';
import PreLoader from '../components/PreLoader';

class UserPage extends Component {
    
    componentDidMount() {
        this.props.getUserInfo();
    }

    render() {
        const {isFetching, info} = this.props.userStatistics;
        
        if(isFetching)
            return <div className='margin-t-2'><PreLoader/></div>

        return (
            <UserInfo info={info}></UserInfo>
        );
    }
}

UserPage.propTypes = {
    userStatistics: React.PropTypes.object.isRequired,
    getUserInfo: React.PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        userStatistics: state.user,
    }
}

export default connect(mapStateToProps, {getUserInfo})(UserPage);