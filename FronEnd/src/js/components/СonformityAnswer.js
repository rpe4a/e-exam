import React, {Component} from 'react';
import {find} from 'lodash/collection'

class ConformityAnswer extends Component {
    constructor(props) {
        super(props);
        
        this.getValue = this.getValue.bind(this);
    }
    
    getValue(){
        const {userAnswers, answer} = this.props;
        let userAnswer = find(userAnswers, {id: answer.id});

        return userAnswer ? userAnswer.value : '';

    }

    render() {
        const {answer, PickAnswer, questionId, questionAnswered} = this.props;

        return (
            <div className='row margin-tb-1'>
                <div className='col-md-6 padding-lr-0'>
                    <input type='text' className='form-control' readOnly='true' value={answer.body}/>
                </div>
                <div className='col-md-6 '>
                    <select id={answer.id} data-question-id={questionId} onChange={PickAnswer} value={this.getValue()} readOnly={questionAnswered} className='form-control'>
                        <option value='' disabled>{'Выберите ответ'}</option>   
                        {answer.conformity.map((c, i) => {
                            return <option key={i} value={c}>{c}</option>        
                        }) }
                    </select>
                </div>
            </div>
        );
    }
}


ConformityAnswer.propTypes = {
    answer: React.PropTypes.object.isRequired,
    PickAnswer: React.PropTypes.func,
    questionId: React.PropTypes.number.isRequired,
    questionAnswered: React.PropTypes.bool.isRequired,
    userAnswers: React.PropTypes.array.isRequired,
};

export default ConformityAnswer;
