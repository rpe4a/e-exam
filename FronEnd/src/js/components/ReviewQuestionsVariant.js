import React, {Component} from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';

class ReviewQuestionsVariant extends Component {
    render() {
        const {questions, isHidden} = this.props;
        return (
            <ul className={classnames('list-group', { 'hidden': isHidden }) }>
                {questions.map((question, index) =>
                    <li key={index} className='list-group-item'><strong>{index + 1}) </strong> <Link to={`/organization/questionbase/question/${question.id}`} className='btn btn-link'>{question.name}</Link></li>)
                }
            </ul>
        )
    }
}


ReviewQuestionsVariant.propTypes = {
    questions: React.PropTypes.array.isRequired,
    isHidden: React.PropTypes.bool.isRequired,
}

export default ReviewQuestionsVariant;