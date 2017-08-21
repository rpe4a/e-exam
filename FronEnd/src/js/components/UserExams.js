import React, {Component} from 'react';
import UserExam from '../components/UserExam';
import FiltratingInput from '../components/FiltratingInput';

class UserExams extends Component {
    constructor (props) {
        super(props)

        this.state = {
            exams: props.userExams
        }
        this.FilterExams = this.FilterExams.bind(this)
    }

    componentWillReceiveProps(nextProps){
        this.setState({exams: nextProps.userExams})
    }

    FilterExams(exams){
        this.setState({exams: exams})
    }
    
    render() {
        const {exams} = this.state;

        return (
            <div className='panel panel-default'>
                <div className='panel-heading'>
                    <form className='form-inline'>
                        <FiltratingInput items={this.props.userExams} field='name' placeholder='Поиск по экзаменам' onChange={this.FilterExams}/>
                    </form>
                </div>
                <ul className='list-group'>
                    {exams.map((e, i) => {
                        return <UserExam key={i} userExam={e} deleteUserExam={this.props.deleteUserExam} addFlashMessage={this.props.addFlashMessage} />
                    }) }
                </ul>
            </div>
        );
    }
}

UserExams.propTypes = {
    userExams: React.PropTypes.array.isRequired,
    deleteUserExam: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
}

export default UserExams;