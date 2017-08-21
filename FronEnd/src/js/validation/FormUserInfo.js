import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default (data) => {
    let errors = {}

    if (validator.isNull(data.lastname)) {
        errors.lastname = 'Поле - Имя должно быть заполнено';
    }
    if (validator.isNull(data.patronymic)) {
        errors.patronymic = 'Поле - Отчество должно быть заполнено';
    }
    if (!validator.matches(data.email, /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)) {
        errors.email = 'Поле - Email введено не корректно';
    }
    if (!validator.isNumeric(data.phone)) {
        errors.phone = 'Поле - Телефон должно содержать только цифры';
    }
    if (validator.isNull(data.email)) {
        errors.email = 'Поле - Email должно быть заполнено';
    }
    if (validator.isNull(data.phone)) {
        errors.phone = 'Поле - Телефон должно быть заполнено';
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
};