import { REQUEST_USERREQUESTS, SET_USERREQUESTS, DELETE_USERREQUESTS } from './actionTypes';
import {xor} from 'lodash/array';
import api from '../utils/webApiConfigure';
import {WebApiRequests, subscriptionStatus} from '../utils/constants';

export const _requestUserRequests = () =>  {
    return {
        type: REQUEST_USERREQUESTS,
        isFetching: true
    }
};


export const _setUserRequests = (userRequests) => {
    return {
        type: SET_USERREQUESTS,
        userRequests,
        isFetching: false
    }
};

export const _deleteUserRequest = (userRequests) => {
    return {
        type: DELETE_USERREQUESTS,
        userRequests
    }
}

export const getUserRequests = () => {
    return (dispatch) => {
        dispatch(_requestUserRequests())

        api.get(WebApiRequests.Orgs.GETREQUESTBYUSER).then((res) => {
            dispatch(_setUserRequests(res.data));
        })
    }
};

export const handleUserRequests = (userRequestType, userRequests) => {
    return (dispatch, getState) => {
        const {dir, pickedUserRequests} = userRequests;
        let url = ''
        const data = pickedUserRequests.map((req) => {
            return {id: req.id, dir: dir};
        });

        switch (userRequestType) {
            case subscriptionStatus.accepted:
                url = WebApiRequests.Orgs.POSTAPPLYREQUEST
                break;
            case subscriptionStatus.rejected:
                url = WebApiRequests.Orgs.POSTREJECTREQUEST
                break;
        }

        return api.post(url, data).then(() =>{
            const {userRequests} = getState().userRequests;
            dispatch(_deleteUserRequest(xor(userRequests, pickedUserRequests)));
        })
    }
};
