import React, {Component} from 'react'
import { Link } from 'react-router';
import {directoryTypes} from '../utils/constants';
import classnames from 'classnames';

class ClientBaseDirectoryView extends Component {
    render() {
        const {toggle, classname, node, handlers, getCountChildren, getCountThings, isDelete} = this.props;

        const thingsCount = node.things.length;

        return (
            <p onClick={toggle} className={classnames(classname, 'directory-hover') }>
                <i className='fa fa-folder padding-lr-1'></i>
                <span className='padding-r-1'>{node.name}</span>
                <span className='badge text-success' title='Количество экзаменуемых в директории'><i className='fa fa-graduation-cap'></i> {thingsCount} </span>
                {(getCountChildren() > 0) && <span className='badge' title='Количество поддиректорий'><i className='fa fa-folder'></i> {getCountChildren()}</span>}
                {(getCountThings() > 0) && <button title='Отправить Логины и Пароли экзаменуемых на Email' className='btn btn-link btn-sm'><i onClick={handlers.sendDirectoryOnEmail} id={node.id} className='fa fa-envelope-o'></i></button>}
                {(getCountThings() > 0) && <button title='Выгрузить Логины и Пароли экзаменуемых в файл'  className='btn btn-link btn-sm'><i onClick={handlers.printDirectoryInFile} id={node.id} className='fa fa-file-o'></i></button>}
                <Link to={`/organization/clientbase/mergedirectory/${node.id}`} query={{ type: directoryTypes.client }}
                    className='btn btn-link btn-sm'>Изменить
                </Link>
                {isDelete() && <button onClick={handlers.deleteDirectory} id={node.id} className='btn btn-link btn-sm'>Удалить</button>}
            </p>
        )
    }
}

ClientBaseDirectoryView.propTypes = {
    node: React.PropTypes.object.isRequired,
    classname: React.PropTypes.string.isRequired,
    toggle: React.PropTypes.func.isRequired,
    handlers: React.PropTypes.objectOf(React.PropTypes.func),
    getCountChildren: React.PropTypes.func.isRequired,
    getCountThings: React.PropTypes.func.isRequired,
    isDelete: React.PropTypes.func.isRequired,
}

export default ClientBaseDirectoryView