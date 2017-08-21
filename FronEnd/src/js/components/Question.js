import React, {Component} from 'react';
import Answers from './Answers';
import {some} from 'lodash/collection';
import {questionTypes } from '../utils/constants';

class Question extends Component {
    constructor(props) {
        super(props)

        this.checkAnswerButton = this.checkAnswerButton.bind(this);
    }

    checkAnswerButton() {
        const {userAnswers, answers, type} = this.props.question;

        return !((type == questionTypes.conformity) ? userAnswers.length == answers.length : some(userAnswers, 'value'));
    }

    rawMarkup(text) {
        return { __html: text };
    }

    render() {

        const {question, SkipQuestion, AnswerQuestion, PickAnswer, EditorChange} = this.props;

        return (
            <div className='panel panel-primary'>
                <div className='panel-heading'>{question.name}</div>
                <div className='panel-body' dangerouslySetInnerHTML={this.rawMarkup(question.body) }>
                </div>
                <div className='panel-footer'>
                    <Answers PickAnswer={question.answered ? null : PickAnswer}
                        EditorChange={question.answered ? null : EditorChange}
                        questionId={question.id}
                        questionType={question.type}
                        questionAnswered={question.answered}
                        answers={question.answers}
                        userAnswers={question.userAnswers}/>
                    <div>
                        <button disabled={this.checkAnswerButton() || question.answered}
                            className='btn btn-success btn-sm'
                            onClick={AnswerQuestion}
                            data-question-id={question.id}>Ответить</button>
                        <button disabled={question.answered || question.skiped}
                            className='btn btn-skiping btn-sm margin-lr-1'
                            onClick={SkipQuestion}
                            data-question-id={question.id}>Пропустить</button>
                    </div>
                </div>
            </div>
        );
    }
}

Question.propTypes = {
    question: React.PropTypes.object.isRequired,
    SkipQuestion: React.PropTypes.func.isRequired,
    AnswerQuestion: React.PropTypes.func.isRequired,
    PickAnswer: React.PropTypes.func.isRequired,
    EditorChange: React.PropTypes.func.isRequired,
};

export default Question;