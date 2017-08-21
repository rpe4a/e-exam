import React, {Component} from 'react'
import { Link } from 'react-router';

class ExamBaseThing extends Component {
    render () {
        const { style, thing, handlers} = this.props;

        return (
             <p style={style} className='padding-l-3'>
               <i title='Экзамен' className='fa fa-university padding-lr-1'></i><Link to={`/organization/exambase/exam/${thing.id}`} className='btn btn-link '>{thing.name}</Link>
                <Link to={`/organization/exambase/mergeexam/${thing.id}`}
                    className='btn btn-link '>Изменить
                </Link>
                <button onClick={handlers.deleteThing}  id={thing.id} data-dir={thing.dir} className='btn btn-link'>Удалить</button>
               <Link  to={`/organization/exambase/mergegroup/${thing.id}`} title='Назначить группы на экзамен' className='btn btn-primary btn-sm'><i className='fa fa-users fa-lg'></i></Link>
             </p>    
        )
    }
}

ExamBaseThing.propTypes = {
    thing: React.PropTypes.object.isRequired,
    style: React.PropTypes.object,
    handlers: React.PropTypes.objectOf(React.PropTypes.func),
}

export default ExamBaseThing