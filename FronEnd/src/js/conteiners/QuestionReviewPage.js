import React, {Component} from 'react'
/*import ReviewQuestion from '../components/ReviewQuestion';*/
import ReviewThing from '../components/ReviewThing';
import {connect} from 'react-redux';
import {reviewQuestion } from '../actions/questionsActions';
import {questionTypes } from '../utils/constants';
import AlertsCollection from '../components/AlertsCollection';

const properties ={
    name: 'Название',
    typeName: 'Тип вопроса', 
    point: 'Количество баллов', 
    isShuffleAnswer: 'Перемешивать ответы', 
    answers: 'Вопросы'
}

const AnswersView = ({type, answer, index}) => {
    if (type == questionTypes.full)
        return <AlertsCollection styles='alert alert-warning' header='Внимание' alerts={['Данный тип вопроса не предполагает ответов.']} />
    else
        return (<p>
                {index + 1}: {answer.body} {answer.conformity && `- ${answer.conformity}`} {answer.isRight && <i className='fa fa-lg text-success fa-check-circle' title='Правильный ответ'></i>}
            </p>)
        
};

class QuestionReviewPage extends Component {
    constructor(props) {
        super(props)

        this.changeIsShuffleAnswer = this.changeIsShuffleAnswer.bind(this)
    }
    componentDidMount() {
        this.props.reviewQuestion(this.props.params.id)
    }

    changeIsShuffleAnswer(prop){
        const {question} = this.props;

        if(prop === 'isShuffleAnswer')
            return question[prop] ? 'Да' : 'Нет'
        else 
            return question[prop]
    }

    render() {
        const { question } = this.props;
        return (
            <div>
                <h2>Просмотр вопроса</h2>
                <div className='row'>
                    <div className='col-md-12'>
                        {/*<ReviewQuestion question={question}/>*/}
                        <ReviewThing thing={question} ChangePropName={this.changeIsShuffleAnswer} properties={properties} children='answers' DynamicChildrenView={AnswersView} />
                    </div>
                </div>
            </div>

        )
    }
}

QuestionReviewPage.propTypes = {
    question: React.PropTypes.object.isRequired,
    reviewQuestion: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        question: state.question,
    }
}

export default connect(mapStateToProps, { reviewQuestion })(QuestionReviewPage)