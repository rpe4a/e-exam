import api from '../utils/webApiConfigure';
import {WebApiRequests} from '../utils/constants';
import { REQUEST_ORGCLIENTS, SET_ORGCLIENTS, DELETE_CLIENT} from './actionTypes';
import {reject} from 'lodash/collection';

export const getClient = (id) => {
    return () => {
        return api.get(`${WebApiRequests.OrgUsers.GETBYID}/${id}`)
    }
};

export const mergeClient = (data) => {
    return () => {
        if (data.id != 0) {
            return api.put(WebApiRequests.OrgUsers.PUT, data)
        } else {
            return api.post(WebApiRequests.OrgUsers.POST, data)
        }
    }
};

export const getClients = () => {
    return api.get(WebApiRequests.OrgUsers.GETALL);
}

export const generateClients = (data) =>  {
    return () => {
        return api.post(`${WebApiRequests.OrgUsers.GENERATEMANY}/?prefix=${data.prefix}&count=${data.count}&dir=${data.dir}`)
    }
};

function _requestOrgClients(){
    return{
        type: REQUEST_ORGCLIENTS,
        isFetching: true
    }
}

function _setOrgClients(clients){
    return{
        type: SET_ORGCLIENTS,
        clients
    }
}

export const getOrgClients = () =>  {
    return (dispatch) => {
        dispatch(_requestOrgClients())

        api.get(WebApiRequests.OrgUsers.GETORGCLIENTS).then((c) => {
            const clients = c.data;
            dispatch(_setOrgClients({clients, isFetching: false}))
        })
    }
};

function _deleteOrgClient(clients){
    return{
        type: DELETE_CLIENT,
        clients : {clients, isFetching: false}
    }
}

export const rejectOrgClient = (userRequest) =>  {
    return (dispatch, getState) =>{
        return api.post(WebApiRequests.Orgs.POSTREJECTREQUEST, userRequest).then(() =>{
            const {clients} = getState().orgclients;
            dispatch(_deleteOrgClient(reject(clients, (c) => { return c.id == userRequest[0].id})));
        })
    }
};


export const deleteOrgClient = (element) =>  {
    return (dispatch, getState) => {
        return api({ method: 'delete', url: WebApiRequests.OrgUsers.DELETEFROMORG, data: element })
                .then(() => {
                    let {clients} = getState().orgclients;
                    dispatch(_deleteOrgClient(reject(clients, (c) => { return c.id == element.id})));
                })
    }
};


