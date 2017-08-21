import React, {Component} from 'react';
import { Link } from 'react-router';
import {filter} from 'lodash/collection';

const breadcrumbs = {
    '/': 'Главная',
    'organization': 'Организация',
    'questionbase': 'База вопросов',
    'taskbase': 'База заданий',
    'mergequestion/:id': 'Работа с вопросом',
    'question/:id': 'Вопрос',
    'mergedirectory/:id': 'Работа с директорией',
    'mergetask/:id': 'Работа с заданием',
    'task/:id': 'Задание',
    'exambase': 'База экзаменов',
    'mergeexam/:id': 'Работа с экзаменом',
    'mergegroup/:id': 'Назначение групп',
    'exam/:id': 'Экзамен',
    'clientbase': 'База экзаменуемых',
    'mergeclient/:id': 'Работа с экзаменуемым',
    'createclients': 'Создание экзаменуемых',
    'createclientsfromfile': 'Добавление экзаменуемых из файла',
    'userrequests': 'Заявки пользователей',
    'myclients': 'Мои экзаменуемые',
    'assign': 'Назначение экзаменов',
};

class Breadcrumbs extends Component {
    render() {

        const routes = filter(this.props.routes, (r) => { return r.path }), //фильтруем пути имеющие название 
            lastRoutesIndex = routes.length - 1;
        let lastroute = '';

        const links = routes.map((r, i) => {
            const route = r.path;

            lastroute += `${route}/`;

            if (lastRoutesIndex === i) //последний путь делаем активным
                return <li key={i} className='active'>{breadcrumbs[route]}</li>

            return <li key={i}><Link to={`${lastroute}`.slice(1) }>{breadcrumbs[route]}</Link></li>
        })

        return (
            <ol className='breadcrumb'>
                {links}
            </ol>
        );
    }
}

Breadcrumbs.propTypes = {
    routes: React.PropTypes.array.isRequired
};

export default Breadcrumbs;