import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addFlashMessage } from '../actions/flashMessageActions';

export default (ComposedComponent, role = false) => {
    class Authenticate extends Component {
        constructor(props) {
            super(props);

            this.isUserAuthenticated = this.isUserAuthenticated.bind(this);
        }

        componentWillMount() {
            this.isUserAuthenticated()

            if (role)
                this.isUserRole(role)
        }

        isUserAuthenticated() {
            const {isAuthenticated} = this.props.signin;

            if (!isAuthenticated) {
                this.props.addFlashMessage({
                    type: 'danger',
                    text: 'Вы не авторизованы. Пожалуйста авторизуйтесь.'
                });
                this.context.router.replace('/signin');
            }
        }

        isUserRole(role) {
            const {roles} = this.props.signin.user;

            if (roles && !roles[role]) {
                this.props.addFlashMessage({
                    type: 'danger',
                    text: 'У Вас недостаточно прав. Доступ закрыт.'
                });
                this.context.router.push('/');
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.signin.isAuthenticated) {
                this.context.router.push('/');
            }
        }

        render() {

            return (
                <ComposedComponent {...this.props}/>
            )
        }
    }

    Authenticate.propTypes = {
        signin: React.PropTypes.object.isRequired,
        addFlashMessage: React.PropTypes.func.isRequired
    };

    Authenticate.contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    function mapStateToProps(state) {
        return {
            signin: state.signin
        }
    }

    return connect(mapStateToProps, { addFlashMessage })(Authenticate);
};



