import { REQUEST_BASE, SET_BASE, DELETE_ELEMENT, DELETE_DIRECTORY } from './actionTypes';
import api from '../utils/webApiConfigure';
import {getDirectories, deleteDirectory } from '../actions/direcroriesActions';
import {directoryTypes, WebApiRequests } from '../utils/constants';
import {getQuestions } from '../actions/questionsActions';
import {reject} from 'lodash/collection';
import {getTasks } from '../actions/taskActions';
import {getExams } from '../actions/examActions';
import {getClients } from '../actions/clientsActions';

class BaseActions{
    constructor(types, deleteUrl, getElements){
        this.directoryTypes = types;
        this.getElements =  getElements;
        this.deleteUrl =  deleteUrl;

        this._requestBase = this._requestBase.bind(this);
        this._getBase = this._getBase.bind(this);
        this._deleteThing = this._deleteThing.bind(this);
        this._deleteDirectory = this._deleteDirectory.bind(this);
        this.getBase = this.getBase.bind(this);
        this.delDirectory = this.delDirectory.bind(this);
        this.deleteThing = this.deleteThing.bind(this);
    }

    _requestBase(){
        return {
            type: REQUEST_BASE,
            isFetching: true
        }
    }

    _getBase(base){
        return {
            type: SET_BASE,
            base,
        }
    }

    _deleteThing(elements) {
        return {
            type: DELETE_ELEMENT,
            elements
        }   
    }

    _deleteDirectory(directories) {
        return {
            type: DELETE_DIRECTORY,
            directories
        }
    }

    getBase(){
        return (dispatch) => {
            dispatch(this._requestBase());

            api.all([getDirectories(this.directoryTypes), this.getElements()])
                .then(api.spread((dirs, els) => {
                    const directories = dirs.data;
                    const elements = els.data;
                    dispatch(this._getBase({ directories, elements, isFetching: false }))
                }));
        }
    }

    delDirectory(directory){
        return (dispatch, getState) => {
            return deleteDirectory(directory).then(() => {
                let {directories} = getState().base;
                dispatch(this._deleteDirectory(reject(directories, (d) => { return d.id == directory.id })));
            })
        }
    }

    deleteThing(element){
        return (dispatch, getState) => {
            return api({ method: 'delete', url: this.deleteUrl, data: element })
                .then(() => {
                    let {elements} = getState().base;
                    dispatch(this._deleteThing(reject(elements, (el) => { return el.id == element.id && el.dir == element.dir})));
                })
        }
    }
}

class QuestionBaseActions extends BaseActions {
  constructor(types, deleteUrl, getElements){
    super(types, deleteUrl, getElements);
  }
}

class TaskBaseActions extends BaseActions {
  constructor(types, deleteUrl, getElements){
    super(types, deleteUrl, getElements);
  }
}

class ExamBaseActions extends BaseActions {
  constructor(types, deleteUrl, getElements){
    super(types, deleteUrl, getElements);
  }
}

class ClientBaseActions extends BaseActions {
  constructor(types, deleteUrl, getElements){
    super(types, deleteUrl, getElements);

    this.sendClientOnEmail = this.sendClientOnEmail.bind(this);
    this.sendDirectoryOnEmail = this.sendDirectoryOnEmail.bind(this);
    this.printClientInFile = this.printClientInFile.bind(this);
    this.printDirectoryInFile = this.printDirectoryInFile.bind(this);
  }

  sendDirectoryOnEmail(data){
     return () => {
        return new window.Promise((resolve) => {
            console.log(data);
            resolve();
        })
    }   
  }

  sendClientOnEmail(data){
     return () => {
        return new window.Promise((resolve) => {
            console.log(data);
            resolve();
        })
    }   
  }

  printClientInFile(data){
     return () => {
        return new window.Promise((resolve) => {
            console.log(data);
            resolve();
        })
    }   
  }

  printDirectoryInFile(data){
     return () => {
        return new window.Promise((resolve) => {
            console.log(data);
            resolve();
        })
    }   
  }
}

class BaseManager {
    static Create(type) {
        switch (+type) {
            case directoryTypes.question:
                return new QuestionBaseActions(directoryTypes.question, WebApiRequests.Issues.DELETE, getQuestions);
            case directoryTypes.task:  
                return new TaskBaseActions(directoryTypes.task, WebApiRequests.Task.DELETE, getTasks);
            case directoryTypes.exam: 
                return new ExamBaseActions(directoryTypes.exam , WebApiRequests.Exam.DELETE , getExams);
            case directoryTypes.client: 
                return new ClientBaseActions(directoryTypes.client , WebApiRequests.OrgUsers.DELETEFROMGROUP , getClients);
            default:
                throw new Error(`BaseManager - founded wrong type of directory @:${type}`)
        }
    }
}

export default BaseManager;