import {addFlashMessage } from '../actions/flashMessageActions';
import {logoutUser} from '../actions/signinActions';
import {browserHistory } from 'react-router';

const StatusCode = {
    ServerError: 500,
    NotFound: 404,
    Unauthorized: 401,
}

class ErrorHandlerManager {
    static Create(error) {

        switch (error.status) {
            case StatusCode.ServerError:
                return new ServerErrorHandler(error);
            case StatusCode.NotFound:
                return new NotFoundHandler(error);
            case StatusCode.Unauthorized:
                return new UnauthorizedHandler(error);
            default:
                return new ErrorHandler(error)
        }
    }
}

export default ErrorHandlerManager;

class ErrorHandler {
    constructor(error) {
        this.message = error.data.error_description || error.data.message;
        this.status = error.status;
    }

    GetErrorMessage() {
        return this.message;
    }

    handle(dispatch){
        dispatch(addFlashMessage({ type: 'danger', text: this.GetErrorMessage()}))
    }
}

class ServerErrorHandler extends ErrorHandler {
    constructor(error) {
        super(error);
    }

    GetErrorMessage() {
        return 'Внутренняя ошибка сервера. Обратитесь к администратору.';
    }
}

class NotFoundHandler extends ErrorHandler {
    constructor(error) {
        super(error);
    }

    GetErrorMessage() {
        return 'Ошибка данных сервера. Обратитесь к администратору.';
    }
}

class UnauthorizedHandler extends ErrorHandler {
    constructor(error) {
        super(error);
    }

    GetErrorMessage() {
        return 'Ключ вашей авторизации истек.';
    }

    handle(dispatch){
        super.handle(dispatch);
        logoutUser().call(null, dispatch);
        browserHistory.replace('/signin');
    }
}

