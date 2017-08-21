import axios from 'axios'
import ErrorHandlerManager from '../managers/ErrorHandlerManager';

function handingError(error) {
    const errorHandler = ErrorHandlerManager.Create(error.response)

    errorHandler.handle(this.getStore().dispatch);
    /*this.getStore().dispatch(addFlashMessage({ type: 'danger', text: errorHandler.GetErrorMessage()}))*/
    return window.Promise.reject(error);
}

function handingResponse(response) {
    return response;
}

export default (function () {
    if (process.env.NODE_ENV !== 'production') {
        axios.defaults.baseURL = 'http://srv-t-01:35561/';
    }else{
        axios.defaults.baseURL = 'http://srv-t-01:35561/'
    }
        /*axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';*/
    axios.interceptors.response.use(handingResponse, handingError.bind(axios));
 
    axios.setStore = function (store) {
        this.store = store;
    }

    axios.getStore = function () {
        return this.store;
    }
    
    return axios;  
})()
