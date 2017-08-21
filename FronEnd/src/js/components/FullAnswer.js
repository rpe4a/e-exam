import React, {Component} from 'react';
import TextEditor from '../components/TextEditor';

class FullAnswer extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this)
    }
    
    onChange(e){
        const {questionId, answer} = this.props;

        this.props.EditorChange(answer.id, questionId, e.target.getContent())
    }


    render() {
        const {questionId, userAnswers} = this.props;
        return (
            <div className='form-group'>
                <TextEditor data-question-id={questionId} type='small' content={userAnswers[0] ? userAnswers[0].value : ''} onChange={this.onChange}></TextEditor>
            </div>

        )
    }
}

FullAnswer.propTypes = {
    answer: React.PropTypes.object.isRequired,
    EditorChange: React.PropTypes.func,
    questionId: React.PropTypes.number.isRequired,
    questionAnswered: React.PropTypes.bool.isRequired,
    userAnswers: React.PropTypes.array.isRequired,
};

export default FullAnswer;