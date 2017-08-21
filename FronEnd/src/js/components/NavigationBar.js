import React, {Component} from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import { logoutUser } from '../actions/signinActions';

class NavigationBar extends Component {
    constructor(props) {
        super(props)

        this.Logout = this.Logout.bind(this)
    }

    Logout(e) {
        e.preventDefault();
        this.props.logoutUser().then(() => {
            this.context.router.push('/')
        });
    }

    render() {
        const { isAuthenticated, user } = this.props.signin;
        const {roles} = user;

        const userLinks = (
            <ul className='nav navbar-nav navbar-right'>
                <li className='dropdown'>
                    <a href='#' className='dropdown-toggle' data-toggle='dropdown'>{user.name} <b className='caret'></b></a>
                    <ul className='dropdown-menu'>
                        <li><Link to='/user'>Кабинет пользователя</Link></li>
                        {(roles && roles.isOrg) && <li><Link to='/organization'>Кабинет организации</Link></li>}
                        {(roles && roles.isAdmin) && <li><Link to='/administrator'>Кабинет администратора</Link></li>}
                        <li className='divider'></li>
                        <li><a href='#'>Настройка учетной записи</a></li>
                        <li><a href='#'>Смена пароля</a></li>
                        <li className='divider'></li>
                        <li><a href='#' onClick={this.Logout}>Выйти</a></li>
                    </ul>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className='nav navbar-nav navbar-right'>
                <li><Link to='/signin'>Войти</Link></li>
                <li><Link to='/signup'>Регистрация</Link></li>
            </ul>
        );

        return (
            <nav className='navbar navbar-default' role='navigation'>
                <div className='container-fluid'>
                    <div className='navbar-header'>
                        <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1'>
                            <span className='sr-only'>Toggle navigation</span>
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                        </button>
                        <Link className='navbar-brand' to='/'>PermTestingSystem</Link>
                    </div>
                    <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
                        <ul className='nav navbar-nav'>
                        </ul>
                        { isAuthenticated ? userLinks : guestLinks}
                    </div>
                </div>
            </nav>
        );
    }
}

NavigationBar.propTypes = {
    signin: React.PropTypes.object.isRequired,
    logoutUser: React.PropTypes.func.isRequired,
}

NavigationBar.contextTypes = {
    router: React.PropTypes.object.isRequired,
}

function mapStateToProps(state) {
    return {
        signin: state.signin
    };
}

export default connect(mapStateToProps, { logoutUser })(NavigationBar);