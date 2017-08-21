import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default (data) => {
    let errors = {}

    if (validator.isNull(data.name)) {
        errors.name = 'Поле - Название должно быть заполнено';
    }
    if (validator.isNull(data.description)) {
        errors.description = 'Поле - Описание должно быть заполнено';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};