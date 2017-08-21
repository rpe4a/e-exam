import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default (data) => {
    let errors = {}

    if (validator.isNull(data.prefix)) {
        errors.prefix = 'Поле - Шаблон должно быть заполнено';
    }
    if (data.count > 100) {
        errors.count = 'Поле - Количество должно быть меньше заданного лимита';
    }
    if (!validator.isNumeric(data.count)) {
        errors.count = 'Поле - Количество должно содержать только цифры';
    }
    if (validator.isNull(data.count)) {
        errors.count = 'Поле - Количество должно быть заполнено';
    }
    if (validator.isNull(data.dir)) {
        errors.dir = 'Поле - Директория должно быть заполнено';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};