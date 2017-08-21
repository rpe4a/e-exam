import React, {Component} from 'react'
import { Link } from 'react-router';

class QuestionBaseThing extends Component {
    render () {
        const { style, thing, handlers} = this.props;

        return (
             <p style={style} className='padding-l-3'>
                <i className='fa fa-question-circle padding-r-1'></i><Link to={`/organization/questionbase/question/${thing.id}`} className='btn btn-link '>{thing.name}</Link>
                <Link to={`/organization/questionbase/mergequestion/${thing.id}`}
                    className='btn btn-link '>Изменить
                </Link>
                <button onClick={handlers.deleteThing} id={thing.id} data-dir={thing.dir} className='btn btn-link'>Удалить</button>
             </p>    
        )
    }
}

QuestionBaseThing.propTypes = {
    thing: React.PropTypes.object.isRequired,
    style: React.PropTypes.object,
    handlers: React.PropTypes.objectOf(React.PropTypes.func),
}

export default QuestionBaseThing