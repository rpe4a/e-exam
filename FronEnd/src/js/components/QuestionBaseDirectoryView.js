import React, {Component} from 'react'
import { Link } from 'react-router';
import {directoryTypes} from '../utils/constants';
import classnames from 'classnames';

class QuestionBaseDirectoryView extends Component {
    render () {

        const {toggle, classname, node, handlers, getCountChildren, getCountThings, isDelete} = this.props;

        return (
            <p onClick={toggle} className={classnames(classname, 'directory-hover')}>
                <i className='fa fa-folder padding-lr-1'></i>
                <span className='padding-r-1'>{node.name}</span>
                <span className='badge text-success' title='Количество вопросов в директории'><i className='fa fa-question-circle'></i> {getCountThings()} </span>
                {(getCountChildren() > 0) && <span className='badge' title='Количество поддиректорий'><i className='fa fa-folder'></i> {getCountChildren()}</span>}
                <Link to={`/organization/questionbase/mergedirectory/${node.id}`} query={{ type: directoryTypes.question }}
                    className='btn btn-link'>Изменить
                </Link>
                {isDelete() && <button onClick={handlers.deleteDirectory} id={node.id} className='btn btn-link'>Удалить</button>}
            </p>
        )
    }
}

QuestionBaseDirectoryView.propTypes = {
    node: React.PropTypes.object.isRequired,
    classname: React.PropTypes.string.isRequired,
    toggle: React.PropTypes.func.isRequired,
    getCountChildren: React.PropTypes.func.isRequired,
    getCountThings: React.PropTypes.func.isRequired,
    isDelete: React.PropTypes.func.isRequired,
    handlers: React.PropTypes.objectOf(React.PropTypes.func),
}

export default QuestionBaseDirectoryView