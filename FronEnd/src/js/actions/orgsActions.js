import {REQUEST_ORGS, SET_ORGS} from './actionTypes';
import api from '../utils/webApiConfigure';
import {WebApiRequests} from '../utils/constants';

export const _requestOrgs = () => {
    return {
        type: REQUEST_ORGS,
        isFetching: true
    }
}

export const _setOrgs = (orgs) => {
    return {
        type: SET_ORGS,
        orgs,
        isFetching: false
    }
};


export const getOrgs = () => {
    return (dispatch) => {
        dispatch(_requestOrgs())
        api.get(WebApiRequests.Orgs.GETALL).then((req) => {
            const orgs = req.data;
            dispatch(_setOrgs(orgs))
        })
    }
};
