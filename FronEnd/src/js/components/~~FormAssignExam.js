import React, {Component} from 'react'
import { Link } from 'react-router';
import Button from '../components/Button';
import Validation from '../validation/FormAssignExam';

const defaultState = {
    pickedClientDirectories: [],
    pickedExams: [],
    errors: {},
    isLoding: false,
    invalid: false,
}

class FormAssignExam extends Component {
    constructor(props) {
        super(props);

        this.state = {...defaultState, pickedExams: props.pickedExams, pickedClientDirectories: props.pickedClientDirectories };

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ pickedExams: nextProps.pickedExams, pickedClientDirectories: nextProps.pickedClientDirectories })
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
            this.props.addClients(this.state).then(() => {
                this.props.addFlashMessage({
                    type: 'success',
                    text: 'Экзаменуемыe успешно сгенерированы. Можете перейти к его назначению на экзамены.'
                })

                this.context.router.push('/organization/clientbase');
            })
        }
    }

    render() {
        const {unPickedExam, unPickedClientDirectory} = this.props;
        const {pickedClientDirectories, pickedExams, isLoding, invalid} = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <div className='row'>
                    <div className='col-md-6'>
                        <h4>Выбранные экзамены  <span title='Количество выбранных экзаменов' className='badge'>{pickedExams.length}</span></h4>
                        <ol>
                            {pickedExams.map((e, i) => {
                                return <li key={i}>{e.name} <i title='Убрать' onClick={unPickedExam.bind(null, i) } className='fa fa-times cursor-pointer'></i></li>
                            }) }
                        </ol>
                    </div>
                    <div className='col-md-6'>
                        <h4>Выбранные пользователи <span title='Количество выбранных экзаменуемых' className='badge'>{pickedClientDirectories.length}</span></h4>
                        <ol>
                            {pickedClientDirectories.map((c, i) => {
                                return <li key={i}>{c.name} <i title='Убрать' onClick={unPickedClientDirectory.bind(null, i) } className='fa fa-times cursor-pointer'></i></li>
                            }) }
                        </ol>
                    </div>
                </div>
                <div className='form-group margin-t-2'>
                    <Button
                        text='Назначить'
                        isLoding={isLoding}
                        invalid={invalid}
                        className='btn btn-primary'
                        />
                    <Link to={'/organization'} className='btn btn-default margin-l-1'>Назад</Link>
                </div>
            </form>
        )
    }
}

FormAssignExam.propTypes = {
    pickedExams: React.PropTypes.array.isRequired,
    pickedClientDirectories: React.PropTypes.array.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    unPickedExam: React.PropTypes.func.isRequired,
    unPickedClientDirectory: React.PropTypes.func.isRequired,
}

export default FormAssignExam