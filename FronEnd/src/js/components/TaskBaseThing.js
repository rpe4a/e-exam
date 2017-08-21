import React, {Component} from 'react'
import { Link } from 'react-router';
import {taskTypes}  from '../utils/constants';

class TaskBaseThing extends Component {
    render () {
        const { style, thing, handlers} = this.props;

        return (
             <p style={style} className='padding-l-3'>
                {(thing.type == taskTypes.test) ? <i title='Тест' className='fa fa-align-justify padding-lr-1'></i> :
                                                  <i title='Свободная форма ответа' className='fa fa-pencil-square-o padding-lr-1'></i>}<Link to={`/organization/taskbase/task/${thing.id}`} className='btn btn-link '>{thing.name}</Link>
                <Link to={`/organization/taskbase/mergetask/${thing.id}`}
                    className='btn btn-link '>Изменить
                </Link>
                <button onClick={handlers.deleteThing} id={thing.id} data-dir={thing.dir} className='btn btn-link'>Удалить</button>
             </p>    
        )
    }
}

TaskBaseThing.propTypes = {
    thing: React.PropTypes.object.isRequired,
    style: React.PropTypes.object,
    handlers: React.PropTypes.objectOf(React.PropTypes.func),
}

export default TaskBaseThing