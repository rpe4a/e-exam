'use strict';

require('bootstrap/dist/css/bootstrap.css');
require('eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css');
require('bootstrap/dist/js/bootstrap.js');
require('moment/min/moment.min.js');
require('eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js'); 
require('css/_site.scss');
require('tinymce/langs/ru');    

  
/*import 'babel-polyfill'*/
import React from 'react' 
import { render } from 'react-dom'
import {Router,  browserHistory} from 'react-router'; 
/*import {Router,  hashHistory} from 'react-router';*/ 
import routes from './utils/configureRoutes';  
import { Provider } from 'react-redux'  
import configureStore from './utils/configureStore'
import setAuthorizationToken from './utils/setAuthorizationToken';
import api from './utils/webApiConfigure';
import {setCurrentUser} from './actions/signinActions';
import LocalStorageManager from './managers/LocalStorageManager';

const store = configureStore();
const localStorageManager = new LocalStorageManager()

//если есть токен то авторизуем
if (localStorageManager.getData('token') && localStorageManager.getData('user')) {
    setAuthorizationToken(localStorageManager.getData('token'))
    store.dispatch(setCurrentUser(localStorageManager.getData('user')));
}
//пробрасываем store в api
api.setStore(store);

render(
    <Provider store={store}> 
        <Router history={browserHistory} routes={routes} />  
    </Provider>, document.getElementById('app')
)