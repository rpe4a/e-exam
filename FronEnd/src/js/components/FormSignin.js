import React, {Component} from 'react'
import InputFieldGroup from '../components/InputFieldGroup';
import Button from '../components/Button';
import Validation from '../validation/FormSignin';

class FormSignin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            grant_type: 'password',
            errors: {},
            isLoding: false,
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.RedirectUser = this.RedirectUser.bind(this);
    }

    isValid() {
        const { errors, isValid } = Validation(this.state);

        if (!isValid) {
            this.setState({ errors });
        }

        return isValid;

    }

    processingError(error) {
        let inputs = error.response.data;
        let errors = {}

        inputs.map((input) => {
            errors[input.field] = input.message;
        });

        return errors;
    }

    onChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.isValid()) {
            this.setState({ errors: {}, isLoding: true })
            this.props.loginUser(this.state)
                .then((user) => {
                    this.RedirectUser(user)
                })
                .catch(() => {
                    this.setState({ isLoding: false })
                })
        }
    }

    RedirectUser(user){
        let location = '/fillinfo';
        
        if(!user.isAuto && user.roles['isUser'])
             location = '/user'

        if(!user.isAuto && user.roles['isOrg'])
             location = '/organization'

        if(!user.isAuto && user.roles['isAdmin'])
             location = '/admin'
            
        this.context.router.push(location)
    }

    render() {
        const {errors, username, password, isLoding} = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <h1>Авторизация</h1>
                {/* (errors.invalid_auth) ? <div className='alert alert-danger'>{errors.invalid_auth}</div> : ''*/}
                <InputFieldGroup
                    label='Логин'
                    type='text'
                    name='username'
                    value={username}
                    onChange={this.onChange}
                    placeholder='Ваш логин'
                    error={errors.username}
                    />
                <InputFieldGroup
                    label='Пароль'
                    type='password'
                    name='password'
                    value={password}
                    onChange={this.onChange}
                    placeholder='Ваш пароль'
                    error={errors.password}
                    />
                <div className='form-group'>
                    <Button
                        text='Войти'
                        isLoding={isLoding}
                        className='btn btn-primary' 
                        />
                    <button onClick={this.context.router.goBack} type='button' className='btn btn-default margin-l-1'>Назад</button>
                </div>
            </form>
        )
    }
}

FormSignin.propTypes = {
    loginUser: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
}

FormSignin.contextTypes = {
    router: React.PropTypes.object.isRequired,
}

export default FormSignin