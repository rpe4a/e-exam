import React, {Component} from 'react';
import { Link } from 'react-router';
import TextAreaGroup from '../components/TextAreaGroup';
import SelectFieldGroup from '../components/SelectFieldGroup';
import Button from '../components/Button';
import Validation from '../validation/FormAddSubscription';
import {find} from 'lodash/collection';
import {connect} from 'react-redux';
import {addFlashMessage } from '../actions/flashMessageActions';
import {addSubscription} from '../actions/userActions';
import {getOrgs} from '../actions/orgsActions';


const defaultState = {
    description: '',
    message: '',
    orgId: '',
    errors: {},
    isLoding: false,
    invalid: false,
}

class FormAddSubscription extends Component {
    constructor(params) {
        super(params)

        this.state = {...defaultState };

        this.onChange = this.onChange.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.isValid = this.isValid.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentDidMount() {
        this.props.getOrgs();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({invalid: nextProps.orgs.orgs.length == 0})
    }
    onChange(e) {
        e.preventDefault();

        const {orgs} = this.props.orgs;
        this.setState({ [e.target.name]: e.target.value, description: find(orgs, ['id', e.target.value]).description || '' });
    }

    onChangeText(e) {
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
            this.props.addSubscription(this.state).then(() => {
                this.props.addFlashMessage({
                    type: 'success',
                    text: 'Заявка на подписку отправлена. Ждет рассмотрения.'
                })

                this.setState({ isLoding: false })
            })
                .catch(() => {
                    this.setState({ isLoding: false })
                })
        }
    }

    render() {
        const {description, message, orgId, errors, isLoding, invalid} = this.state;
        const {orgs, isFetching} = this.props.orgs;

        return (
            <form onSubmit={this.onSubmit}>
                <div className='row'>
                    <div className='col-md-6'>
                        <SelectFieldGroup
                            name='orgId'
                            label='Организация'
                            onChange = {this.onChange}
                            disabledValue='Выберите организацию'
                            value={orgId}
                            options={orgs}
                            error={errors.orgId}
                            isFetching={isFetching}
                            EmptyText='Нет организаций для подписки'
                            />
                        <TextAreaGroup
                            name='message'
                            label='Сообщение'
                            placeholder='Введите текст сообщения'
                            cols='3'
                            rows='5'
                            value={message}
                            onChange={this.onChangeText}
                            error={errors.message}
                            />

                        <div className='form-group'>
                            <Button
                                text='Подписаться'
                                isLoding={isLoding}
                                invalid={invalid}
                                className='btn btn-primary'
                                />
                            <Link to={'/user/subscription'} className='btn btn-default margin-l-1'>Назад</Link>
                        </div>
                    </div>
                    {description && <div className='col-md-offset-1 col-md-5'>
                        <h3><strong>Описание организации</strong></h3>
                        <hr/>
                        <p>{description}</p>
                    </div>}
                </div>

            </form>
        );
    }
}


FormAddSubscription.propTypes = {
    orgs: React.PropTypes.object.isRequired,
    getOrgs: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    addSubscription: React.PropTypes.func.isRequired,
}


function mapStateToProps(state) {
    return {
        orgs: state.orgs,
    }
}

export default connect(mapStateToProps, { getOrgs, addFlashMessage, addSubscription })(FormAddSubscription);