import React, {Component} from 'react'

class UserRequest extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }


    onChange(e) {
        const {userRequest, checkRequest, unCheckRequest} = this.props;

        if (e.target.checked) {
            checkRequest(userRequest)
        } else {
            unCheckRequest(userRequest)
        }
    }

    render() {
        const {userRequest, checked} = this.props;

        return (
            <li className='list-group-item userrequest-padding'>
                <div className='checkbox'>
                    <label>
                        <input type='checkbox' checked={checked} onChange={this.onChange} /><i className='fa fa-user'></i> {`${userRequest.name} ${userRequest.patronymic} (${userRequest.login})`}
                    </label> 
                    {userRequest.msg && <i> -  {userRequest.msg}</i>}
                </div>
            </li>
        )
    }
}

UserRequest.propTypes = {
    userRequest: React.PropTypes.object.isRequired,
    checkRequest: React.PropTypes.func.isRequired,
    unCheckRequest: React.PropTypes.func.isRequired,
    checked: React.PropTypes.bool.isRequired,
}


export default UserRequest