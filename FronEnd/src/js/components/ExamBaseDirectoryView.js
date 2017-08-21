import React, {Component} from 'react'
import { Link } from 'react-router';
import {directoryTypes} from '../utils/constants';
import classnames from 'classnames';

class ExamBaseDirectoryView extends Component {
    render () {
        const {toggle, classname, node, handlers, getCountChildren, getCountThings, isDelete} = this.props;

        return (
            <p onClick={toggle} className={classnames(classname, 'directory-hover')}>
                <i className='fa fa-folder padding-lr-1'></i>
                <span className='padding-r-1'>{node.name}</span>
                <span className='badge text-success' title='Количество экзаменов в директории'><i className='fa fa-university'></i> {getCountThings()} </span>
                {(getCountChildren() > 0) && <span className='badge' title='Количество поддиректорий'><i className='fa fa-folder'></i> {getCountChildren()}</span>}
                <Link to={`/organization/exambase/mergedirectory/${node.id}`} query={{ type: directoryTypes.exam }}
                    className='btn btn-link'>Изменить
                </Link>
                {isDelete() && <button onClick={handlers.deleteDirectory} id={node.id} className='btn btn-link'>Удалить</button>}
            </p>
        )
    }
}

ExamBaseDirectoryView.propTypes = {
    node: React.PropTypes.object.isRequired,
    classname: React.PropTypes.string.isRequired,
    toggle: React.PropTypes.func.isRequired,
    handlers: React.PropTypes.objectOf(React.PropTypes.func),
    getCountChildren: React.PropTypes.func.isRequired,
    getCountThings: React.PropTypes.func.isRequired,
    isDelete: React.PropTypes.func.isRequired,
}

export default ExamBaseDirectoryView