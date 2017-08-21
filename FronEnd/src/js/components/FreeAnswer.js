import React, {Component} from 'react';

class FreeAnswer extends Component {
    render() {
        const {answer, questionId, questionAnswered, PickAnswer, userAnswers} = this.props;
        return (
            <div className='form-group'>
                <input type='text'
                    className='form-control'
                    name='answer'
                    id={answer.id}
                    value={userAnswers[0] ? userAnswers[0].value : ''}
                    readOnly={questionAnswered}
                    data-question-id={questionId}
                    placeholder='Ваш ответ'
                    onChange={PickAnswer}/>
            </div>

        )
    }
}

FreeAnswer.propTypes = {
    answer: React.PropTypes.object.isRequired,
    PickAnswer: React.PropTypes.func,
    questionId: React.PropTypes.number.isRequired,
    questionAnswered: React.PropTypes.bool.isRequired,
    userAnswers: React.PropTypes.array.isRequired,
};

export default FreeAnswer;