import {REQUEST_DIRECTORIES, SET_DIRECTORIES, ADD_DIRECTORY} from './actionTypes';
import api from '../utils/webApiConfigure';
import {WebApiRequests } from '../utils/constants';

export const getDirectories = (type) => {
    return api.get(`${WebApiRequests.Directive.GETALL}/${type}`);
}

export const _requestMergeirectories = () => {
    return {
        type: REQUEST_DIRECTORIES,
        isFetching: true
    }
};

export const _getMergeirectories = (directories) => {
    return {
        type: SET_DIRECTORIES,
        directories,
        isFetching: false
    }
};

export const getMergeDirectories = (type) => {
    return (dispatch) => {
        dispatch(_requestMergeirectories());

        getDirectories(type).then((dirs) => {
            dispatch(_getMergeirectories(dirs.data))
        })
    }
};

export const getDirectory = (id, type) => {
    return () => {
        return api.get(`${WebApiRequests.Directive.GETBYID}/${type}/${id}`)
    }
};

export const deleteDirectory = (directory) => {
    return api({ method: 'delete', url: WebApiRequests.Directive.DELETE , data: directory })
};


export const _addDirectory = (directoty) => {
    return {
        type: ADD_DIRECTORY,
        directoty
    }
};



export const mergeDirectory = (data, isModify) => {
    return (dispatch) => {

        const directory = {
            id: data.id || '',
            name: data.name,
            parentId: data.parentId,
            description: data.description,
            type: data.type,
        }

        if (isModify) {
            return api.put(WebApiRequests.Directive.PUT, directory)
        } else {
            return api.post(WebApiRequests.Directive.POST, directory)
                .then((dir) => {
                    dispatch(_addDirectory(dir.data));
                })
        }
    }
};


