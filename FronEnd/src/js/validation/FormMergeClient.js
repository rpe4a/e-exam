import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default (data) => {
    let errors = {}

    if (validator.isNull(data.name)) {
        errors.name = 'Поле - Имя экзаменуемого должно быть заполнено';
    }
    //если создаем нового экзаменуемого
    if(data.id == 0){
        if (validator.isNull(data.password)) {
            errors.password = 'Поле - Пароль экзаменуемого должно быть заполнено';
        }
        if (validator.isNull(data.confirmpassword)) {
            errors.confirmpassword = 'Поле - Повторите пароль должно быть заполнено';
        }
        if (!validator.equals(data.password, data.confirmpassword)) {
            errors.confirmpassword = 'Вводимые пароли должны совпадать';
        }
    }
    if (data.dirs.length <= 0) {
        errors.dirs = 'Должна быть выбрана, хотя бы одна диреткория';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};