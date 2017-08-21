import React, {Component} from 'react';
import {some} from 'lodash/collection'

class SingleAnswer extends Component {
    constructor(props) {
        super(props)

        this.onChange = this.onChange.bind(this)
        this.isPicked = this.isPicked.bind(this)
    }

    isPicked() {
        const {answer, userAnswers} = this.props;
        return some(userAnswers, { id: answer.id })
    }
    onChange(e) {
        e.target.value = e.target.checked;
        this.props.PickAnswer(e);
    }

    render() {
        const {answer, questionId} = this.props;

        return (
            <div className='radio'>
                <label>
                    <input type='radio'
                        name='answer'
                        checked={this.isPicked() }
                        readOnly={this.isPicked() }
                        id={answer.id}
                        data-question-id={questionId}
                        onChange={this.onChange}/>
                    {answer.body}
                </label>
            </div>
        )
    }
}

SingleAnswer.propTypes = {
    answer: React.PropTypes.object.isRequired,
    PickAnswer: React.PropTypes.func,
    isPicked: React.PropTypes.func,
    questionId: React.PropTypes.number.isRequired,
    questionAnswered: React.PropTypes.bool.isRequired,
    userAnswers: React.PropTypes.array.isRequired,
};

export default SingleAnswer;