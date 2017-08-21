import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import {some, filter} from 'lodash/collection'
import {questionTypes} from '../utils/constants';

export default (data) => {
    let errors = {}

    if (validator.isNull(data.name)) {
        errors.name = 'Поле - Название должно быть заполнено';
    }
    if (validator.isNull(data.description)) {
        errors.description = 'Поле - Тело вопроса должно быть заполнено';
    }
    if (validator.isNull(data.dir)) {
        errors.dir = 'Поле - Директория должно быть заполнено';
    }
    if (!validator.isNumeric(data.point + '')) {
        errors.point = 'Поле - Количество баллов должно содержать только цифры';
    }
    if (validator.isNull(data.point + '')) {
        errors.point = 'Поле - Количество баллов должно быть заполнено';
    }
    if (!some(data.answers, ['isRight', true])) {
        errors.answers = 'Должен присутствовать хотя бы один правильный ответ';
    }
    if (data.type != questionTypes.free) {
        if (data.answers.length < 2) {
            errors.answers = 'Для данного типа вопроса, необходимо минимум два ответа';
        }
    }
    if (data.type == questionTypes.single) {
        if (filter(data.answers, 'isRight').length > 1) {
            errors.answers = 'Для данного типа вопроса, необходим один правильный ответ';
        }
    }
    if (data.type == questionTypes.multiple) {
        if (filter(data.answers, 'isRight').length < 2) {
            errors.answers = 'Для данного типа вопроса, необходимо минимум два правильных ответа';
        }
    }
    if (data.type == questionTypes.conformity || data.type == questionTypes.free) {
        if (some(data.answers, ['isRight', false])) {
            errors.answers = 'Для данного типа вопроса, все ответы должны быть правильными';
        }
    }
    if (data.type == questionTypes.full) {
        delete errors.answers;
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};