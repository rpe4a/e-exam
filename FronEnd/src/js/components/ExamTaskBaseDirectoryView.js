import React, {Component} from 'react'
import classnames from 'classnames';

class ExamTaskBaseDirectoryView extends Component {
   render () {
        const {toggle, classname, node, getCountChildren, getCountThings} = this.props;

        return (
            <p onClick={toggle} className={classnames(classname, 'directory-hover')}>
                <i className='fa fa-folder padding-r-1'></i>
                <span className='padding-r-1'>{node.name}</span>
                <span className='badge text-success' title='Количество заданий в директории'><i className='fa fa-tasks'></i> {getCountThings()} </span>
                {(getCountChildren() > 0) && <span className='badge' title='Количество поддиректорий'><i className='fa fa-folder'></i> {getCountChildren()}</span>}
            </p>
        )
    }
}

ExamTaskBaseDirectoryView.propTypes = {
    node: React.PropTypes.object.isRequired,
    classname: React.PropTypes.string.isRequired,
    toggle: React.PropTypes.func.isRequired,
    getCountChildren: React.PropTypes.func.isRequired,
    getCountThings: React.PropTypes.func.isRequired,
}


export default ExamTaskBaseDirectoryView