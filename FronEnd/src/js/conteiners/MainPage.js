import React, {Component} from 'react';
import { Link } from 'react-router';

class MainPage extends Component {
    render() {
        return (
            <div>
                <h1>Добро пожаловать на сайт тестирования пермского образования</h1>
                <h3>Здесь вы можете: </h3>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='list-group'>
                            <a href='#' className='list-group-item'>
                                <h4 className='list-group-item-heading'>Создать тестирование</h4>
                                <p className='list-group-item-text'>Хотя не всегда необходимо, но иногда нужно во что-то упаковать DOM.Для таких случаев, попробуйте компонент панели.</p>
                            </a>
                        </div>
                        <div className='list-group'>
                            <a href='#' className='list-group-item'>
                                <h4 className='list-group-item-heading'>Пройти тестирование</h4>
                                <p className='list-group-item-text'>Хотя не всегда необходимо, но иногда нужно во что-то упаковать DOM.Для таких случаев, попробуйте компонент панели.</p>
                            </a>
                        </div>
                        <div className='list-group'>
                            <a href='#' className='list-group-item '>
                                <h4 className='list-group-item-heading'>Посмотреть результаты</h4>
                                <p className='list-group-item-text'>Хотя не всегда необходимо, но иногда нужно во что-то упаковать DOM.Для таких случаев, попробуйте компонент панели.</p>
                            </a>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='list-group '>
                            <Link to='/demo' className='list-group-item active'>
                                <h4 className='list-group-item-heading'>Пройти демотестирование</h4>
                                <p className='list-group-item-text'>Хотя не всегда необходимо, но иногда нужно во что-то упаковать DOM.Для таких случаев, попробуйте компонент панели.</p>
                            </Link>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='list-group '>
                            <Link to='/organization' className='list-group-item'>
                                <h4 className='list-group-item-heading'>Зайти в организацию</h4>
                                <p className='list-group-item-text'>Предназначена для работы с организацией</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainPage;