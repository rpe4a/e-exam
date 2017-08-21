import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default (email) => {
    let errors = {}
    if (!validator.isEmail(email)) {
        errors.email = 'Введеный Вами email некорректен.';
    }
/*    if (validator.isNull(email)) {
        errors.email = 'Вы не ввели email получателя.';
    }*/
    return {
        errors,
        isValid: isEmpty(errors)
    }
};