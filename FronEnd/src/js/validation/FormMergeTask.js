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
    if (validator.isNull(data.dir)) {
        errors.dir = 'Поле - Директория должно быть заполнено';
    }
    if (data.pickedQuestions.length < 1) {
        errors.pickedQuestions = 'Должен быть выбран минимум 1 вопрос.';
    }
    if (data.variants.length < 1) {
        errors.variants = 'Должен быть добавлен хотя бы один вариант.';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};