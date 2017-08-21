import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers/index'
import thunk from 'redux-thunk'
/*import api from './webApiConfigure';*/

export default (initialState) => {
    const store = createStore(rootReducer, initialState,
        compose(
            applyMiddleware(thunk),
            window.devToolsExtension ? window.devToolsExtension() : f => f 
        ));

    return store;
};