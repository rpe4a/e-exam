import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default (data) => {
    let errors = {}

    if (validator.isNull(data.name)) {
        errors.name = 'Поле - Название должно быть заполнено';
    }
    if (data.questions.length < 1) {
        errors.questions = 'Вы должны выбрать минимум 1 вопрос';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};