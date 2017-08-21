import React, {Component} from 'react';
import TextAreaGroup from '../components/TextAreaGroup';
import InputFieldGroup from '../components/InputFieldGroup';
import Button from '../components/Button';
import Validation from '../validation/FormUserInfo';

class FormUserInfo extends Component {
    constructor(props) {
        super(props);

        const {id, username, lastname, patronymic, phone, email, summury} = this.props.userStatistics;

        this.state = {
            id: id || 0,
            username: username || '',
            lastname: lastname || '',
            patronymic: patronymic || '',
            email: email || '',
            phone: phone || '',
            summury: summury || '',
            errors: {},
            isLoding: false,
            invalid: false,
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    isValid() {
        const { errors, isValid } = Validation(this.state);

        if (!isValid) {
            this.setState({ errors });
        }
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.isValid()) {
            this.setState({ errors: {}, isLoding: true })
            this.props.saveUserInfo(this.state)
                .then(() => {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'Анкета успешно сохранена.'
                    })

                    this.context.router.push('/user')
                })
                .catch(() => {
/*                    this.props.addFlashMessage({
                        type: 'danger',
                        text: error.response.data.error_description
                    })*/
                    this.setState({ isLoding: false })
                })
        }
    }


    render() {

        const {lastname, patronymic, phone, email, summury, errors, isLoding} = this.state, {backwardButton} = this.props;

        return (
            <form onSubmit={this.onSubmit}>
                <InputFieldGroup
                    label='Имя'
                    type='text'
                    name='lastname'
                    value={lastname}
                    onChange={this.onChange}
                    placeholder='Ваше имя'
                    error={errors.lastname}
                    />
                <InputFieldGroup
                    label='Отчество'
                    type='text'
                    name='patronymic'
                    value={patronymic}
                    onChange={this.onChange}
                    placeholder='Ваше отчество'
                    error={errors.patronymic}
                    />
                <InputFieldGroup
                    label='Email'
                    type='text'
                    name='email'
                    value={email}
                    onChange={this.onChange}
                    placeholder='Ваш Email'
                    error={errors.email}
                    />
                <InputFieldGroup
                    label='Телефон'
                    type='text'
                    name='phone'
                    value={phone}
                    onChange={this.onChange}
                    placeholder='Ваш телефон'
                    error={errors.phone}
                    />
                <TextAreaGroup
                    label='О себе'
                    type='text'
                    name='summury'
                    value={summury}
                    onChange={this.onChange}
                    placeholder='О себе...'
                    error={errors.summury}
                    rows='5'
                    />
                <div className='form-group'>
                    <Button
                        text='Сохранить'
                        isLoding={isLoding}
                        className='btn btn-primary'
                        />
                    {backwardButton && <button onClick={this.context.router.goBack} type='button' className='btn btn-default margin-l-1'>Назад</button>}
                </div>
            </form>
        );
    }
}

FormUserInfo.propTypes = {
    userStatistics: React.PropTypes.object.isRequired,
    saveUserInfo: React.PropTypes.func.isRequired,
    backwardButton: React.PropTypes.bool.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
}

FormUserInfo.contextTypes = {
    router: React.PropTypes.object.isRequired,
}

export default FormUserInfo;
