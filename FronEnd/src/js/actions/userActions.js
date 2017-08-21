import { REQUEST_USERINFO, SET_USERSTATISTICS, REQUEST_USEREXAMS, SET_USEREXAMS, REQUEST_USERSUBSCRIPTIONS, SET_USERSUBSCRIPTION, DELETE_USEREXAM } from './actionTypes';
import {reject} from 'lodash/collection';
import api from '../utils/webApiConfigure';
import {WebApiRequests } from '../utils/constants';
import {setCurrentUser, saveToLocalStorage } from '../actions/signinActions';

function _requestUserInfo() {
    return {
        type: REQUEST_USERINFO,
        isFetching: true
    }
}

function _requestUserExams() {
    return {
        type: REQUEST_USEREXAMS,
        isFetching: true
    }
}

function _requestUserRequests() {
    return {
        type: REQUEST_USERSUBSCRIPTIONS,
        isFetching: true
    }
}

function _setUserInfo(info) {
    return {
        type: SET_USERSTATISTICS,
        info,
        isFetching: false
    }
}

function _setUserSubscription(requests) {
    return {
        type: SET_USERSUBSCRIPTION,
        requests,
        isFetching: false
    }
}

function _setUserExams(exams) {
    return {
        type: SET_USEREXAMS,
        exams,
        isFetching: false
    }
}

export const getUserInfo = () => {
    return (dispatch) => {
        dispatch(_requestUserInfo())
        api.get(WebApiRequests.Account.GET).then((res) => {
            const info = res.data
            dispatch(_setUserInfo(info))
        })
    };
};

export const saveUserInfo = (data) => {
    return (dispatch, getState) => {
        return api.put(WebApiRequests.Account.PUT, data).then(() => {
            let user = getState().signin.user;

            user.isAuto = false;
            
            saveToLocalStorage(user)
            dispatch(setCurrentUser(user))
        });
    }
};

export const unSubscription = (id) => {
    return (dispatch, getState) => {
        return api.post(WebApiRequests.Account.POSTREJECTREQUEST, {org: id}).then(() => {
            const requests = reject(getState().user.subscription, ['id', id]);
            dispatch(_setUserSubscription(requests))
        })
    }
};

export const deleteSubscription = (id) => {
    return (dispatch, getState) => {
        return api({method: 'delete', url: WebApiRequests.Account.DELETEREQUEST, data: {org: id}}).then(() => {
            const requests = reject(getState().user.subscription, ['id', id]);
            dispatch(_setUserSubscription(requests))
        })
    }
};


export const addSubscription = (subscription) => {
    return () => {
        const req = {org: subscription.orgId, msg: subscription.message}
        return api.post(WebApiRequests.Account.POSTAPPLYREQUEST, req)
    }
};

export const getUserSubscription = () => {
    return (dispatch) => {
        dispatch(_requestUserRequests())
        api.get(WebApiRequests.Account.GETSUBSCRIPTIONS).then((res) => {
            const requests = res.data
            dispatch(_setUserSubscription(requests))
        })
    }
};

export const deleteUserExam = (id) => {
    console.log(id);
    return (dispatch, getState) => {
        const exams = reject(getState().user.exams, { 'id': +id })
        return new window.Promise((resolve) => {
            dispatch({
                type: DELETE_USEREXAM,
                exams
            })
            resolve()
        })
    }
};

export const getUserExams = () => {
    return (dispatch) => {
        dispatch(_requestUserExams())
        api.get(WebApiRequests.Account.GETEXAMS).then((res) => {
            const exams = res.data
            dispatch(_setUserExams(exams))
        })
    }
};