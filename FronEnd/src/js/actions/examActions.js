/*import {unionBy} from 'lodash/array'*/
import {REQUEST_EXAM,SET_EXAM, CHANGE_EXAM} from './actionTypes';
/*import {getTaskBase} from '../actions/taskBaseActions';*/
import {getMergeDirectories, getDirectories } from '../actions/direcroriesActions';
import {questionTypes } from '../utils/constants';
import {taskTypes} from '../utils/constants';
import api from '../utils/webApiConfigure';
import {directoryTypes, WebApiRequests} from '../utils/constants';
import {find} from 'lodash/collection';
import BaseManager from '../actions/baseActions';

export const getExams = () => {
    return api.get(WebApiRequests.Exam.GETALL);
}

function _changeExam(exam) {
    return {
        type: CHANGE_EXAM,
        exam
    }
}

export const getExamWithUserGroup = (id) => {
    return () => { 
        return api.get(`${WebApiRequests.Permission.GETBYID}/${id}`)
    }
}

export const getExamOptions = () => {
    return (dispatch) => {
        return new window.Promise((resolve) => {
            getMergeDirectories(directoryTypes.exam).call(null, dispatch)
            resolve()
        }).then(() => {
            const TaskBaseActions = BaseManager.Create(directoryTypes.task);
            TaskBaseActions.getBase().call(null, dispatch)
        })
    }
};

export const getExamInfo = (id) => {
    return (dispatch) => {
        dispatch(_requestExam())
        
        api.get(`${WebApiRequests.Exam.GETBYIDWITHTASKS}/${id}`).then((req) => {
            const exam = req.data;
            dispatch(_setExam(exam))
        });
    }
};

export const getExam = (id) => {
    return () => {
        return api.get(`${WebApiRequests.Exam.GETBYID}/${id}`)
    }
};

export const finishExam = (exam) => {
    return (/*dispatch*/) => {
        return new window.Promise((resolve) => {
            exam.finish = true;
            console.log(exam);
            /*dispatch(changeTest(test))*/
            resolve();
        })
    }
};

export const timeOut = (exam) => {
    return (dispatch) => {
        return new window.Promise((resolve) => {
            const {tasks} = exam

            tasks.forEach(t => t.finish = true);

            dispatch(_changeExam(exam));
            resolve();
        })
    }
}

export const mergeExam = (data) => {
    return () => {
        if (data.id != 0) {
            return api.put(WebApiRequests.Exam.PUT, data)
        } else {
            return api.post(WebApiRequests.Exam.POST, data)
        }
    }
}

export const mergeUserGroup = (data) => {
    return () => {
        return api.post(WebApiRequests.Permission.POST, {examId: data.id, roles: [...data.groups]})
    }
}

function _requestExam(){
    return {
        type: REQUEST_EXAM,
        isFetching: true
    }
}

function _setExam(exam){
    return {
        type: SET_EXAM,
        isFetching: false,
        exam
    }
}

export const reviewExam = (id) =>  {
    return (dispatch) => {
        dispatch(_requestExam());

        api.all([getDirectories(directoryTypes.exam), getExam(id).call(null)])
            .then(api.spread(function (dirs, e) {
                const directories = dirs.data;
                const exam = {...e.data, dirName: find(directories, ['id', e.data.dir]).name };
                dispatch(_setExam(exam))
            }));

    }
};

export const getUserExam = (id) => {
    console.log(id);
    return (dispatch) => {
        const exam = {
            id: 2,
            name: 'Демо экзамен',
            description: 'Дату можно создать, используя компоненты в местной временной зоне. Для этого формата обязательны только первые два аргумента. Отсутствующие параметры, начиная с hours считаются равными нулю, а date – единице.',
            time: 0.2,
            dir: '1',
            availableFrom: '11.10.2016',
            availableAt: '22.10.2016',
            startTime: Date.now(),
            finish: false,
            tasks: [
                {
                    id: 1,
                    name: 'Тест 1',
                    description: 'бла-бла-бла',
                    dir: 1,
                    type: taskTypes.test,
                    finish: false,
                    questions: [
                        {
                            id: 1,
                            name: 'Вопрос 1',
                            body: `
<p>На 92-м году жизни скончался известный скульптор Эрнст Неизвестный. Одной из последних работ мастера стал памятник Сергею Дягилеву, установленный в пермской гимназии №11 в 2007 году.<br />
Скульптура высотой 4,5 метра и весом около 8 тонн была отлита из цветной патинированной бронзы, которая не устойчива к атмосферным воздействиям. Она была загружена в гимназию через крышу учебного заведения.<br />
Первоначально предполагалось, что статуя будет стоять на перекрестке улиц Сибирской и Луначарского. На этом месте даже установили памятный камень. Но великолепная фигура организатора &laquo;Русских сезонов&raquo; была выполнена из бронзы и покрыта патиной. Эрнст Неизвестный сказал, что ее ни в коем случае нельзя ставить на улицу, где льют кислотные дожди.<br />
Среди вариантов размещения памятника было фойе нового здания Пермского театра оперы и балета - после завершения его строительства (так и не начатого до сих пор). Предлагалось также поставить статую под открытым небом, но закрыть стеклянной капсулой. И все же остановились на установке памятника в гимназии - родовом особняке семьи Дягилевых.</p>

<p>Памятник был торжественно открыт в марте 2007 года, во время фестиваля &laquo;Дягилевские сезоны: Пермь-Петербург-Париж&raquo;.</p>

<p>- И мы тогда сказали: &laquo;Дягилев вернулся домой&raquo;, - говорит директор &laquo;дягилевки&raquo;. &ndash; Правда, тяжелая фигура, весом в 8,5 тонн перевернула нам весь пол, и все лето 2007 года мы укрепляли фундамент под актовым залом. И, конечно, хотелось бы, чтобы такой замечательный памятник был на виду у жителей Перми. Мы надеялись, что после строительства нового здания гимназии сможем установить его в фойе, под колоннами, чтобы фигуру было видно с улицы. Но проект был изменен, и, похоже, наш Дягилев так и останется на своем месте.</p>

<p><u><span style="background-color:rgb(254, 254, 254); font-size:16px"><a href="https://infodiaghilev.wordpress.com/2016/08/11/%D0%BF%D0%B0%D0%BC%D1%8F%D1%82%D0%B8-%D1%8D%D1%80%D0%BD%D1%81%D1%82%D0%B0-%D0%BD%D0%B5%D0%B8%D0%B7%D0%B2%D0%B5%D1%81%D1%82%D0%BD%D0%BE%D0%B3%D0%BE/">Подробнее</a>&nbsp;</span></u></p>

<p>&nbsp;</p>
`,
                            isShuffleAnswer: true,
                            type: questionTypes.single,
                            picked: false,
                            skiped: false,
                            answered: false,
                            answers: [
                                {
                                    id: 1,
                                    body: 'Ответ 1',
                                    isRight: true,
                                    value: false
                                },
                                {
                                    id: 2,
                                    body: 'Ответ 2',
                                    isRight: false,
                                    value: false

                                },
                                {
                                    id: 3,
                                    body: 'Ответ 3',
                                    isRight: false,
                                    value: false

                                }
                            ],
                            userAnswers: []
                        },
                        {
                            id: 2,
                            name: 'Вопрос 2',
                            body: 'какой-то вопрос 2',
                            isShuffleAnswer: false,
                            type: questionTypes.single,
                            picked: false,
                            skiped: false,
                            answered: false,

                            answers: [
                                {
                                    id: 4,
                                    body: 'Ответ 1',
                                    isRight: true,
                                    value: false

                                },
                                {
                                    id: 5,
                                    body: 'Ответ 2',
                                    isRight: false,
                                    value: false

                                },
                                {
                                    id: 6,
                                    body: 'Ответ 3',
                                    isRight: false,
                                    value: false

                                }
                            ],
                            userAnswers: []

                        },
                        {
                            id: 3,
                            name: 'Вопрос 3',
                            body: 'какой-то вопрос 3',
                            isShuffleAnswer: true,
                            type: questionTypes.single,
                            picked: false,
                            skiped: false,
                            answered: false,

                            answers: [
                                {
                                    id: 7,
                                    body: 'Ответ 1',
                                    isRight: true,
                                    value: false

                                },
                                {
                                    id: 8,
                                    body: 'Ответ 2',
                                    isRight: false,
                                    value: false

                                },
                                {
                                    id: 9,
                                    body: 'Ответ 3',
                                    isRight: false,
                                    value: false

                                }
                            ],
                            userAnswers: []

                        },
                        {
                            id: 4,
                            name: 'Вопрос 4',
                            body: 'какой-то вопрос 4',
                            isShuffleAnswer: false,
                            type: questionTypes.single,
                            picked: false,
                            skiped: false,
                            answered: false,
                            answers: [
                                {
                                    id: 10,
                                    body: 'Ответ 1',
                                    isRight: true,
                                    value: false

                                },
                                {
                                    id: 11,
                                    body: 'Ответ 2',
                                    isRight: false,
                                    value: false

                                },
                                {
                                    id: 12,
                                    body: 'Ответ 3',
                                    isRight: false,
                                    value: false

                                }
                            ],
                            userAnswers: []
                        },
                        {
                            id: 5,
                            name: 'Вопрос 5',
                            body: 'какой-то вопрос 5',
                            isShuffleAnswer: false,
                            type: questionTypes.multiple,
                            picked: false,
                            skiped: false,
                            answered: false,
                            answers: [
                                {
                                    id: 13,
                                    body: 'Ответ 1',
                                    isRight: true,
                                    value: false

                                },
                                {
                                    id: 14,
                                    body: 'Ответ 2',
                                    isRight: false,
                                    value: false

                                },
                                {
                                    id: 15,
                                    body: 'Ответ 3',
                                    isRight: false,
                                    value: false

                                }
                            ],
                            userAnswers: []
                        },
                        {
                            id: 6,
                            name: 'Вопрос 6',
                            body: 'какой-то вопрос 6',
                            isShuffleAnswer: false,
                            type: questionTypes.multiple,
                            picked: false,
                            skiped: false,
                            answered: false,
                            answers: [
                                {
                                    id: 16,
                                    body: 'Ответ 1',
                                    isRight: true,
                                    value: false

                                },
                                {
                                    id: 17,
                                    body: 'Ответ 2',
                                    isRight: false,
                                    value: false

                                },
                                {
                                    id: 18,
                                    body: 'Ответ 3',
                                    isRight: false,
                                    value: false

                                }
                            ],
                            userAnswers: []
                        },
                        {
                            id: 7,
                            name: 'Вопрос 7',
                            body: 'какой-то вопрос 7',
                            isShuffleAnswer: false,
                            type: questionTypes.free,
                            picked: false,
                            skiped: false,
                            answered: false,
                            answers: [
                                {
                                    id: 19,
                                    body: 'Ваш ответ',
                                    isRight: true,
                                    value: ''

                                },
                            ],
                            userAnswers: []
                        },
                        {
                            id: 8,
                            name: 'Вопрос 8',
                            body: 'какой-то вопрос 8',
                            isShuffleAnswer: false,
                            type: questionTypes.free,
                            picked: false,
                            skiped: false,
                            answered: false,
                            answers: [
                                {
                                    id: 22,
                                    body: 'Ваш ответ',
                                    isRight: true,
                                    value: ''
                                },
                            ],
                            userAnswers: []
                        },
                        {
                            id: 9,
                            name: 'Вопрос 9',
                            body: 'какой-то вопрос 9',
                            isShuffleAnswer: false,
                            type: questionTypes.conformity,
                            picked: false,
                            skiped: false,
                            answered: false,
                            answers: [
                                {
                                    id: 23,
                                    body: 'Кот',
                                    conformity: ['Животное', 'Насекомое', 'Рыба', 'Птица'],
                                    isRight: true,
                                    value: ''
                                },
                                {
                                    id: 24,
                                    body: 'Жук',
                                    conformity: ['Животное', 'Насекомое', 'Рыба', 'Птица'],
                                    isRight: true,
                                    value: ''
                                },
                                {
                                    id: 25,
                                    body: 'Акула',
                                    conformity: ['Животное', 'Насекомое', 'Рыба', 'Птица'],
                                    isRight: true,
                                    value: ''
                                },
                                {
                                    id: 26,
                                    body: 'Воробей',
                                    conformity: ['Животное', 'Насекомое', 'Рыба', 'Птица'],
                                    isRight: true,
                                    value: ''
                                },
                            ],
                            userAnswers: []
                        },
                        {
                            id: 10,
                            name: 'Вопрос 10',
                            body: 'какой-то вопрос 10',
                            isShuffleAnswer: false,
                            type: questionTypes.conformity,
                            picked: false,
                            skiped: false,
                            answered: false,
                            answers: [
                                {
                                    id: 27,
                                    body: 'Россия',
                                    conformity: ['Евразия', 'Северная америка', 'Южная америка', 'Австралия'],
                                    isRight: true,
                                    value: ''
                                },
                                {
                                    id: 28,
                                    body: 'США',
                                    conformity: ['Евразия', 'Северная америка', 'Южная америка', 'Австралия'],
                                    isRight: true,
                                    value: ''
                                },
                                {
                                    id: 29,
                                    body: 'Бразилия',
                                    conformity: ['Евразия', 'Северная америка', 'Южная америка', 'Австралия'],
                                    isRight: true,
                                    value: ''
                                },
                                {
                                    id: 30,
                                    body: 'Австралия',
                                    conformity: ['Евразия', 'Северная америка', 'Южная америка', 'Австралия'],
                                    isRight: true,
                                    value: ''
                                },
                            ],
                            userAnswers: []
                        },
                    ]
                },
                {
                    id: 2,
                    name: 'Свободный ответ 1',
                    description: 'бла-бла-бла',
                    dir: 2,
                    type: taskTypes.freeform,
                    finish: true,
                    questions: [
                        {
                            id: 1,
                            name: 'Вопрос 1',
                            body: `
<p>На 92-м году жизни скончался известный скульптор Эрнст Неизвестный. Одной из последних работ мастера стал памятник Сергею Дягилеву, установленный в пермской гимназии №11 в 2007 году.<br />
Скульптура высотой 4,5 метра и весом около 8 тонн была отлита из цветной патинированной бронзы, которая не устойчива к атмосферным воздействиям. Она была загружена в гимназию через крышу учебного заведения.<br />
Первоначально предполагалось, что статуя будет стоять на перекрестке улиц Сибирской и Луначарского. На этом месте даже установили памятный камень. Но великолепная фигура организатора &laquo;Русских сезонов&raquo; была выполнена из бронзы и покрыта патиной. Эрнст Неизвестный сказал, что ее ни в коем случае нельзя ставить на улицу, где льют кислотные дожди.<br />
Среди вариантов размещения памятника было фойе нового здания Пермского театра оперы и балета - после завершения его строительства (так и не начатого до сих пор). Предлагалось также поставить статую под открытым небом, но закрыть стеклянной капсулой. И все же остановились на установке памятника в гимназии - родовом особняке семьи Дягилевых.</p>

<p>Памятник был торжественно открыт в марте 2007 года, во время фестиваля &laquo;Дягилевские сезоны: Пермь-Петербург-Париж&raquo;.</p>

<p>- И мы тогда сказали: &laquo;Дягилев вернулся домой&raquo;, - говорит директор &laquo;дягилевки&raquo;. &ndash; Правда, тяжелая фигура, весом в 8,5 тонн перевернула нам весь пол, и все лето 2007 года мы укрепляли фундамент под актовым залом. И, конечно, хотелось бы, чтобы такой замечательный памятник был на виду у жителей Перми. Мы надеялись, что после строительства нового здания гимназии сможем установить его в фойе, под колоннами, чтобы фигуру было видно с улицы. Но проект был изменен, и, похоже, наш Дягилев так и останется на своем месте.</p>

<p><u><span style="background-color:rgb(254, 254, 254); font-size:16px"><a href="https://infodiaghilev.wordpress.com/2016/08/11/%D0%BF%D0%B0%D0%BC%D1%8F%D1%82%D0%B8-%D1%8D%D1%80%D0%BD%D1%81%D1%82%D0%B0-%D0%BD%D0%B5%D0%B8%D0%B7%D0%B2%D0%B5%D1%81%D1%82%D0%BD%D0%BE%D0%B3%D0%BE/">Подробнее</a>&nbsp;</span></u></p>

<p>&nbsp;</p>
`,
                            isShuffleAnswer: true,
                            type: questionTypes.full,
                            picked: false,
                            skiped: false,
                            answered: false,
                            answers: [
                                {
                                    id: 30,
                                    body: '',
                                    conformity: '',
                                    isRight: true,
                                    value: ''
                                }
                            ],
                            userAnswers: []
                        },
                        {
                            id: 2,
                            name: 'Вопрос 2',
                            body: 'какой-то вопрос 2',
                            isShuffleAnswer: false,
                            type: questionTypes.full,
                            picked: false,
                            skiped: false,
                            answered: false,
                            answers: [
                                {
                                    id: 31,
                                    body: '',
                                    conformity: '',
                                    isRight: true,
                                    value: ''
                                }
                            ],
                            userAnswers: []
                        },
                    ]
                },
            ]
        }

        dispatch(_setExam(exam))
    }
};