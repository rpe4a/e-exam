import React, {Component} from 'react';
import { Link } from 'react-router';

class OrganizationPage extends Component {
    render() {
        return (
            <div>
                <h2>Кабинет организации - Начало работы</h2>
                <p className='margin-b-4'>
                    <i>
                        Добро пожаловать в кабинет организации. Здесь Вы можете заполнить вашу базу вопросов, тeстов, свободных ответов и экзаменов, настроить Вашу организацию, управлять пользователями и экзаменами.
                        Для Вас доступно множество разнообразных параметров и настроек, с помощью которых Вы можете создать систему экзаменирования серьезного уровня.
                    </i>
                </p>
                <h4>Для дальнейшей работы с системой тестирования вам потрубуется: </h4>
                <div className='list-group margin-tb-2'>
                    <Link to='/organization/questionbase' className='list-group-item active'>
                        <h3 className='list-group-item-heading'>1. Настроить базу вопросов</h3>
                        <p className='list-group-item-text'>Для создания доступны вопросы различных типов, из которых затем можно будет составить задание для проверки знаний.</p>
                        <p className='margin-tb-2'>
                            <b>Добавьте вопросы, из которых будут состоять Ваши задания.</b>
                        </p>
                        <p className='list-group-item-text'>Разделите и сгруппируйте вопросы по директориям, чтобы было удобнее в дальнейшем использовать их в заданиях.</p>
                    </Link>
                </div>
                <div className='list-group margin-tb-2'>
                    <Link to='/organization/taskbase' className='list-group-item active'>
                        <h3 className='list-group-item-heading'>2. Настроить базу заданий</h3>
                        <p className='list-group-item-text'>
                            Обязательными для задания являются его название и список вопросов, которые оно будет включать в себя.
                            Остальные настройки Вы можете не изменять и оставить значения по умолчанию.
                        </p>
                        <p className='margin-t-2'>
                            <b>Создайте задание со своими уникальными настройками.</b>
                        </p>
                    </Link>
                </div>
               <div className='list-group margin-tb-2'>
                    <Link to='/organization/clientbase' className='list-group-item active'>
                        <h3 className='list-group-item-heading'>3. Настроить базу экзаменуемых</h3>
                        <p className='list-group-item-text'>
                            Для того чтобы провести экзамен, одного его не достаточно. Вам необходимо добавить пользователей.
                        </p>
                        <p className='margin-tb-2'>
                            <b>Добавляйте или создавайте пользователей, чтобы в последствие назначить им необходимые экзамены.</b>
                        </p>
                    </Link>
                </div>
                <div className='list-group margin-tb-2'>
                    <Link to='/organization/exambase' className='list-group-item active'>
                        <h3 className='list-group-item-heading'>4. Настроить базу экзаменов</h3>
                        <p className='list-group-item-text'>
                            Данные вопросы Вы можете использовать в ваших экзаменах.
                        </p>
                        <p className='margin-t-2'>
                            <b>Создавайте уникальные вопросы, на которые тестируемому придется ответить в писменной форме.</b>
                        </p>
                        <p className='list-group-item-text'>
                            Свободные вопросы требуют ручной проверки. Поэтому Вы получаете полный контроль над тестируемым.
                        </p>
                    </Link>
                </div>
                <h4>Обрати те внимание: </h4>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='list-group '>
                            <Link to='/' className='list-group-item '>
                                <h4 className='list-group-item-heading'>Общая информация об организации</h4>
                                <p className='list-group-item-text'>Настройка различных параметров Вашей организации.</p>
                            </Link>
                        </div>
                        <div className='list-group '>
                            <Link to='/' className='list-group-item '>
                                <h4 className='list-group-item-heading'>Штат организации</h4>
                                <p className='list-group-item-text'>Управление персоналом Вашей организации.</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default OrganizationPage;