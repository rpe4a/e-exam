import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default (data) => {
    let errors = {}
    if (validator.isNull(data.message)) {
        errors.message = 'Поле - Сообщение должно быть заполнено';
    }
    if (validator.isNull(data.orgId)) {
        errors.orgId = 'Поле - Организация должно быть выбрано';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};