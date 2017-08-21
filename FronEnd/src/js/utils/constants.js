export const WebApiRequests = {
    //Вопросы
    Issues: {
        DELETE: '/api/issues', //Удалить выбранный вопрос
        GETALL: '/api/issues', //Получить все вопросы оранизаций
        POST: '/api/issues', //Создать новый ворос
        PUT: '/api/issues', //Редактировать выбраный ворос
        GETBYID: '/api/issues/item' //Получить вопрос по Id
    },
    //Директивы
    Directive: {
        DELETE: '/api/directives', //Удаляет директиву
        GETALL: '/api/directives', //Получаем список всех директив по указаному разделу
        POST: '/api/directives', //Создать новую директиву
        PUT: '/api/directives', //Редактирование директивы
        GETBYID: '/api/directives/item' //Получаем директорию по Id
    },
    //Экзамены
    Exam: {
        DELETE: '/api/exams', //Удаление экзамена 
        GETALL: '/api/exams', //Получить все экзамены в организации
        POST: '/api/exams', //Создание экзамена
        PUT: '/api/exams', //Редактирование экзамена
        GETBYID: '/api/exams/item', //Получаем экзамен по Id
        GETBYIDWITHTASKS: '/api/exams/tasks' //Получаем экзамен по Id
    },
    //Задания
    Task: {
        DELETE: '/api/tasks', //Удаление задание 
        GETALL: '/api/tasks', //Получить все задания в организации
        POST: '/api/tasks', //Создание задачу
        PUT: '/api/tasks', //Редактирование задачи
        GETBYID: '/api/tasks/item' //Получаем задание по Id
    },
    //Пользователи организации
    OrgUsers: {
        DELETEFROMORG: '/api/users', //Удаление пользователя 
        DELETEFROMGROUP: '/api/users/remove/role', //Удаление пользователя из группы организации
        GETALL: '/api/users', //Получить всех пользователей в организации
        POST: '/api/users', //Создание нового пользователя организации
        PUT: '/api/users', //Редактирование пользователя в организации
        GETBYID: '/api/users/items', //Получаем пользователя по Id в организации
        GENERATEMANY: '/api/users/generate', //Генерация случайных пользователей организации
        GETORGCLIENTS: '/api/organizations/users', //Получение всех экзаменуемых организации c их группами
    },
    //Экзамен/группы
    Permission: {
        POST: '/api/permission', //Привязываем экзамен к группа пользователей
        GETBYID: '/api/permission' //Получаем группы пользователей назначеные для экзамена 
    },
    //Пользователь
    Account: {
        GET: '/api/account/about', //Получить всю информацию о владельце аккаунта
        GETEXAMS: '/api/account/exams', //Возращает все экзамены пользователя
        GETSUBSCRIPTIONS: '/api/account/organizations', //Возращает все подписки пользователя
        PUT: '/api/account', //Изменить данные о пользователе
        POSTAPPLYREQUEST: '/api/account/request/apply', //Подать заявку в организацию
        POSTREJECTREQUEST: '/api/account/request/reject', //Отменить поданую заявку
        DELETEREQUEST: '/api/account/request/remove', //Удалить поданую заявку
    },
    //Организации
    Orgs: {
        GETALL: '/api/organizations', //Получить всe организации на сайте
        GETREQUESTBYUSER: '/api/organizations/request', // Выдает все заявки которые подали пользователи
        POSTAPPLYREQUEST: '/api/organizations/request/apply', //Принять заявки отпользователя
        POSTREJECTREQUEST: '/api/organizations/request/reject', //Отклонить заявки от пользователей
    },
}


export const taskTypes = {
    test: 1,
    freeform: 2,
}

export const typeTaskName = {
    1: 'Тест',
    2: 'Свободная форма ответа',
}

export const questionTypes = {
    single: 1,
    multiple: 2,
    conformity: 3,
    free: 4,
    full: 5,
}

export const typeQuestionName = {
    1: 'Выбор одного правильного ответа',
    2: 'Выбор нескольких правильных ответов',
    3: 'Установка соответствия',
    4: 'Ввод текстового ответа',
    5: 'Свободный ответ',
}

export const directoryTypes = {
    question: 1,
    task: 2,
    exam: 3,
    client: 4,
}

export const roles = {
    Admin: 'isAdmin',
    User: 'isUser',
    Org: 'isOrg',
}

export const examStatus = {
    done: 'done',
    wait: 'wait',
}

export const subscriptionStatus = {
    accepted: 1,
    processing: 2,
    rejected: 3,
}