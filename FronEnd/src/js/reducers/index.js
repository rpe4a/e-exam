import { combineReducers } from 'redux'
import flashMessages from './flashMessages';
/*import demoTest from './demoTest';*/
import mergedirectories from './mergedirectories';
import questions from './questions';
/*import questionBase from './questionBase';*/
/*import taskBase from './taskBase';*/
/*import examBase from './examBase';*/
/*import clientBase from './clientBase';*/
import userRequests from './userRequests';
import signin from './signin';
import user from './user';
import orgs from './orgs';
import exam from './exam';
import question from './question';
import task from './task';
import base from './base';
import orgclients from './orgclients';

export default combineReducers({
    flashMessages,
/*    demoTest,*/
    mergedirectories,
    questions,
    /*questionBase,*/
   /* taskBase,*/
    /*examBase,*/
   /* clientBase,*/
    orgclients,
    userRequests,
    signin,
    user,
    orgs,
    exam,
    question,
    task,
    base
})
