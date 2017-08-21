import React, {Component} from 'react';
import PreLoader from '../components/PreLoader';
import {questionTypes } from '../utils/constants';
import AlertsCollection from '../components/AlertsCollection';
import ReviewProperty from '../components/ReviewProperty';

class ReviewQuestion extends Component {
    rawMarkup(text) {
        return { __html: text };
    }

    _getAnswersView() {
        const {type, answers} = this.props.question;
        if (type == questionTypes.full)
            return <AlertsCollection styles='alert alert-warning' header='Внимание' alerts={['Данный тип вопроса не предполагает ответов.']} />
        else
            return (answers.map((a, index) => {
                return <p key={index}>
                    {index + 1}: {a.body} {a.conformity && `- ${a.conformity}`} {a.isRight && <i className='fa fa-lg text-success fa-check-circle' title='Правильный ответ'></i>}
                </p>
            }))

    }

    render() {
        const {isFetching, name, description, typeName, point, dirName, isShuffleAnswer } = this.props.question;

        if (isFetching)
            return <PreLoader />

        return (
            <div >
                <ReviewProperty label='Название' name={name}/>
                <ReviewProperty label='Тип вопроса' name={typeName}/>
                <ReviewProperty label='Родительская директория' name={dirName}/>
                <ReviewProperty label='Количество баллов' name={point}/>
                <ReviewProperty label='Перемешивать ответы' name={isShuffleAnswer ? 'Да' : 'Нет'}/>
                <hr/>
                <h4><strong>Описание: </strong></h4>
                <div dangerouslySetInnerHTML={this.rawMarkup(description) }></div>
                <hr/>
                <h4><strong>Ответы:</strong></h4>
                <div>
                    { this._getAnswersView()}
                </div>
                <hr/>
                <button onClick={this.context.router.goBack} type='button' className='btn btn-default'>Назад</button>
            </div>
        );
    }
}

ReviewQuestion.propTypes = {
    question: React.PropTypes.object.isRequired,
};

ReviewQuestion.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default ReviewQuestion;