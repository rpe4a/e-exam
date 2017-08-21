import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import { getDateFromValue } from '../utils/dateHelper';

export default (data) => {
    let errors = {}

    if (validator.isNull(data.name)) {
        errors.name = 'Поле - Название должно быть заполнено';
    }
    if (validator.isNull(data.description)) {
        errors.description = 'Поле - Описание экзамена должно быть заполнено';
    }
    if (validator.isNull(data.dir+'')) {
        errors.dir = 'Поле - Директория должно быть заполнено';
    }
    if (validator.isNull(data.availableFrom)) {
        errors.availableFrom = 'Поле - Доступен с должно быть заполнено';
    }
    if (validator.isNull(data.availableAt)) {
        errors.availableAt = 'Поле - Доступен до должно быть заполнено';
    }
    if (getDateFromValue(data.availableFrom).isAfter(getDateFromValue(data.availableAt))) {
        errors.availableFrom = 'Поле - Доступен с должно быть меньше, чем Поле - Доступен до';
    }
    if (getDateFromValue(data.availableFrom) >= (getDateFromValue(data.availableAt))) {
        errors.availableAt = 'Поле - Доступен до должно быть больше, чем Поле - Доступен с';
    }
    if (+data.time <= 0) { 
        errors.time = 'Поле - Продолжительность экзамена должно быть больше 0';
    }
    if (!validator.isNumeric(data.time+'')) {
        errors.time = 'Поле - Продолжительность экзамена должно содержать только цифры';
    }
    if (validator.isNull(data.time+'')) {
        errors.time = 'Поле - Продолжительность экзамена должно быть заполнено';
    }
    if (data.tasks.length < 1) {
        errors.tasks = 'Должено быть выбрано минимум 1 задание.';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};