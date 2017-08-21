import React, {Component} from 'react'
import { Link } from 'react-router';

class ClientBaseThing extends Component {
    render() {
        const { style, thing, handlers} = this.props;

        return (
            <p style={style} className='padding-l-3'>
                <i title='Экзаменуемый' className='fa fa-graduation-cap padding-lr-1'></i><span>{thing.name}</span>
                {thing.isAuto && <button title='Отправить Логин и Пароль экзаменуемого на Email'  className='btn btn-link  btn-sm'><i onClick={handlers.sendClientOnEmail} id={thing.id} className='fa fa-envelope-o'></i></button>}
                {thing.isAuto && <button title='Выгрузить Логин и Пароль экзаменуемого в файл'  className='btn btn-link  btn-sm'><i onClick={handlers.printClientInFile} id={thing.id} className='fa fa-file-o'></i></button>}
                <Link to={`/organization/clientbase/mergeclient/${thing.id}`}
                    className='btn btn-link  btn-sm'>Изменить
                </Link>
                <button onClick={handlers.deleteThing} id={thing.id} data-dir={thing.dir} className='btn btn-link  btn-sm'>Убрать</button>
            </p>
        )
    }
}

ClientBaseThing.propTypes = {
    thing: React.PropTypes.object.isRequired,
    style: React.PropTypes.object,
    handlers: React.PropTypes.objectOf(React.PropTypes.func),
}

export default ClientBaseThing