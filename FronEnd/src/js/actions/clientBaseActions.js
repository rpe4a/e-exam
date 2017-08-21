import { REQUEST_CLIENTBASE, SET_CLIENTBASE, DELETE_CLIENT, DELETE_DIRECTORY } from './actionTypes';
import {reject} from 'lodash/collection';
import api from '../utils/webApiConfigure';
import {directoryTypes } from '../utils/constants';
import {getClients } from '../actions/clientsActions';
import {getDirectories, /*deleteDirectory*/} from '../actions/direcroriesActions';

export const _requestClientBase = () => {
    return {
        type: REQUEST_CLIENTBASE,
        isFetching: true
    }
};


export const _getClientBase = (clientBase) => {
    return {
        type: SET_CLIENTBASE, 
        clientBase,
        isFetching: false
    }
};

export const getClientBase = () => {
    return (dispatch) => {
        dispatch(_requestClientBase());

        api.all([getDirectories(directoryTypes.client), getClients()])
            .then(api.spread(function (dirs, cs) {
                const directories = dirs.data;
                const clients = cs.data;
                dispatch(_getClientBase({ directories, clients }))
            }));
    }
};

function _deleteClient(clients) {
    return {
        type: DELETE_CLIENT,
        clients
    }
}

function _deleteDirectory(directories) {
    return {
        type: DELETE_DIRECTORY,
        directories
    }
}

export const deleteDirectory = (id) => {
    return (dispatch, getState) => {
        return new window.Promise((resolve) => {
            console.log(id);
            let directories = getState().clientBase.directories;
            let dir = reject(directories, (d) => { return d.id == id })
            dispatch(_deleteDirectory(dir));
            resolve();
        })
    }
};


export const deleteClient = (id) => {
    return (dispatch, getState) => {
        return new window.Promise((resolve) => {
            let clients = getState().clientBase.clients;
            dispatch(_deleteClient(reject(clients, (c) => { return c.id == id })));
            resolve();
        })
    }
};

export const sendDirectoryOnEmail = (data) => {
    return () => {
        return new window.Promise((resolve) => {
            console.log(data);
            resolve();
        })
    }
};

export const sendClientOnEmail = (data) => {
    return () => {
        return new window.Promise((resolve) => {
            console.log(data);
            resolve();
        })
    }
};

export const printClientInFile = (data) => {
    return () => {
        return new window.Promise((resolve) => {
            console.log(data);
            resolve();
        })
    }
};

export const printDirectoryInFile = (data) => {
    return () => {
        return new window.Promise((resolve) => {
            console.log(data);
            resolve();
        })
    }
};