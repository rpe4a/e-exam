import React, {Component} from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';

class UserLayout extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const {isAuto} = this.props.signin.user;

        if (isAuto)
             this.context.router.push('/fillinfo');
    }

    render() {
        return (
            <div className='row'>
                <div className='col-md-12 margin-b-1'>
                    <h2><Link to='/user'>Кабинет пользователя</Link></h2>
                    <p>
                        <i>
                            Добро пожаловать в кабинет пользователя.Здесь Вы можете заполнить Вашу анкету, подписаться на прохождения экзаменов, пройти экзамены,
                            посмотреть результаты и историю Ваших экзаменов.
                        </i>
                    </p>
                </div>
                <div className='col-md-12'>
                    <div className='btn-group btn-group-justified'>
                        <Link to='/user/info' activeClassName='active' className='btn btn-default '>Анкета</Link>
                        <Link to='/user/exams' activeClassName='active' className='btn btn-default'>Экзамены</Link>
                        <Link to='/user/subscription' activeClassName='active' className='btn btn-default'>Подписки</Link>
                    </div>
                </div>
                <div className='col-md-12'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

UserLayout.contextTypes = {
        router: React.PropTypes.object.isRequired
    };

function mapStateToProps(state) {
    return {
        signin: state.signin
    }
}

export default connect(mapStateToProps)(UserLayout);