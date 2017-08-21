import {SET_CURRENT_USER} from './actionTypes';
import api from '../utils/webApiConfigure';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import LocalStorageManager from '../managers/LocalStorageManager';
import queryString from 'query-string'
import validator from 'validator';

export const saveToLocalStorage = (user, access_token) => {
    const localStorageManager = new LocalStorageManager();

    if(user)
        localStorageManager.setData('user', user)
    if(access_token)
        localStorageManager.setData('token', access_token)
}

function _removeFromLocalStorage(){
    const localStorageManager = new LocalStorageManager();

    localStorageManager.removeData('user')
    localStorageManager.removeData('token')
}

export const loginUser = (userData) => {
    return (dispatch) => {
        return api.post('/token', userData, {
            transformRequest: [
                function (data) {
                    return queryString.stringify(data);
                }
            ]
        }).then((res) => {
            const {access_token, userName, isAdmin, isOrg, isUser, isAuto, uid} = res.data;
            const user = { uid: uid, name: userName, roles: { isAdmin: validator.toBoolean(isAdmin), isOrg: validator.toBoolean(isOrg), isUser: validator.toBoolean(isUser)}, isAuto: validator.toBoolean(isAuto) }

            saveToLocalStorage(user, access_token)
            setAuthorizationToken(access_token);
            dispatch(setCurrentUser(user));
            return user;
        });
    };
};

export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        user
    };
};

export const logoutUser = () => {
    return (dispatch) => {
        return new window.Promise((resolve) => {
            _removeFromLocalStorage();
            setAuthorizationToken(false);
            dispatch(setCurrentUser({}))
            resolve();
        })
    };
};
