import React, {Component} from 'react';
import { Link } from 'react-router';
import classname from 'classnames';

class OrgClientView extends Component {
    constructor(props) {
        super(props);
        
        this.isDirsNull = this.isDirsNull.bind(this);
    }

    isDirsNull(){
        const {dirs} = this.props.element;

        return dirs.length > 0 ;
    }

    render() {
        const {name, dirs, id, isAuto} = this.props.element, {handlers} = this.props;

        return (
            <li className={classname('list-group-item padding-2', {'warning': !this.isDirsNull()})}>
                <div className='row'>
                    <div className='col-md-3'>
                        {isAuto && <i onClick={handlers.deleteElement} title='Удалить экзаменуемого' id={id} className='fa fa-user-times cursor-pointer'></i>}
                        <Link to={`/organization/clientbase/mergeclient/${id}`} title='Редактировать' className='btn btn-link'><strong>{name}</strong></Link>
                    </div>
                    <div className='col-md-6 padding-tb-1'>
                        <i>{this.isDirsNull() ? dirs.map((d) => {return d.name}).join(', '): 'Не привязан'}</i> 
                    </div>
                    <div className='col-md-3'>
                        <button onClick={handlers.rejectElement} id={id} className='btn btn-danger btn-sm'>Отписать</button>
                        <Link to='' className='btn btn-success btn-sm margin-l-1'>Посмотреть экзамены</Link>
                    </div>
                </div>
            </li>
        );
    }
}

OrgClientView.propTypes = {
    element: React.PropTypes.object.isRequired,
    handlers: React.PropTypes.objectOf(React.PropTypes.func),
}

export default OrgClientView;