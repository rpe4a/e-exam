import React, {Component} from 'react';
import SingleAnswer from './SingleAnswer';
import MultipleAnswer from './MultipleAnswer';
import FreeAnswer from './FreeAnswer';
import FullAnswer from './FullAnswer';
import СonformityAnswer from './СonformityAnswer';
import {questionTypes } from '../utils/constants';

class Answers extends Component {
    constructor(props) {
        super(props)

        this._getAnswerView = this._getAnswerView.bind(this);
    }

    _getAnswerView() {
        const {questionType} = this.props;

        switch (questionType) {
            case questionTypes.multiple:
                return MultipleAnswer
            case questionTypes.conformity:
                return СonformityAnswer
            case questionTypes.free:
                return FreeAnswer
            case questionTypes.full:
                return FullAnswer
            default:
                return SingleAnswer
        }

    }

    render() {
        const {answers, questionId, questionAnswered, userAnswers, PickAnswer, EditorChange} = this.props;
        return (
            <div id='answers'>
                {answers.map((answer) => {
                    const ConcreteAnswer = this._getAnswerView();
                    return <ConcreteAnswer key={answer.id}
                        questionId={questionId}
                        questionAnswered={questionAnswered}
                        PickAnswer={PickAnswer}
                        EditorChange={EditorChange}
                        answer={answer}
                        userAnswers={userAnswers}
                        />
                }) }
            </div>
        )
    }
}

Answers.propTypes = {
    answers: React.PropTypes.array.isRequired,
    userAnswers: React.PropTypes.array.isRequired,
    questionId: React.PropTypes.number.isRequired,
    questionType: React.PropTypes.number.isRequired,
    questionAnswered: React.PropTypes.bool.isRequired,
    PickAnswer: React.PropTypes.func,
    EditorChange: React.PropTypes.func,
};
export default Answers;