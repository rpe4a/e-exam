import React from 'react'
import { Route, IndexRoute } from 'react-router';
import App from '../conteiners/App';
import MainPage from '../conteiners/MainPage';
import DemoTestPage from '../conteiners/DemoTestPage';
import OrganizationLayout from '../conteiners/OrganizationLayout';
import QuestionBasePage from '../conteiners/QuestionBasePage';
import OrganizationPage from '../conteiners/OrganizationPage';
import MergeDirectory from '../conteiners/MergeDirectory';
import MergeQuestion from '../conteiners/MergeQuestion';
import QuestionReviewPage from '../conteiners/QuestionReviewPage';
import TaskBasePage from '../conteiners/TaskBasePage';
import TaskReviewPage from '../conteiners/TaskReviewPage';
import MergeTask from '../conteiners/MergeTask';
import ExamBasePage from '../conteiners/ExamBasePage';
import MergeExam from '../conteiners/MergeExam';
import ClientBasePage from '../conteiners/ClientBasePage';
import MergeClient from '../conteiners/MergeClient';
import CreateClients from '../conteiners/CreateClients';
import UserRequestsPage from '../conteiners/UserRequestsPage';
import SigninPage from '../conteiners/SigninPage';
import UserLayout from '../conteiners/UserLayout';
import UserPage from '../conteiners/UserPage';
import UserInfoPage from '../conteiners/UserInfoPage';
import UserExamsPage from '../conteiners/UserExamsPage';
import UserSubscriptionPage from '../conteiners/UserSubscriptionPage';
import AddSubscriptionPage from '../conteiners/AddSubscriptionPage';
import ExamLayout from '../conteiners/ExamLayout';
import ExamPage from '../conteiners/ExamPage';
import TaskPage from '../conteiners/TaskPage';
import ExamReviewPage from '../conteiners/ExamReviewPage';
import OrgClientsPage from '../conteiners/OrgClientsPage';
import MergeUserGroups from '../conteiners/MergeUserGroups';
import FillInfoPage from '../conteiners/FillInfoPage';
import ExamInfoPage from '../conteiners/ExamInfoPage';

import requiredAuth from './requiredAuth';
import {roles} from './constants';

export default (
    <Route path='/' component={App}>
        <IndexRoute component={MainPage} />
        <Route path='demo' component={DemoTestPage} />
        <Route path='signin' component={SigninPage} />
        <Route path='fillinfo' component={FillInfoPage} />
        <Route path='exam/:id/info' component={ExamInfoPage} />
        {/*<Route component={requiredAuth(ExamLayout)}>
            <Route path='exam/:id' component={ExamPage} />
            <Route path='exam/:id/task/:taskid' component={TaskPage} />
        </Route>*/}
        <Route component={requiredAuth(ExamLayout) }>
            <Route path='exam'>
                <Route path=':id' component={ExamPage} />
                <Route path=':id/task/:taskid' component={TaskPage} />
            </Route>
        </Route>
        <Route component={requiredAuth(UserLayout) }>
            <Route path='user'>
                <IndexRoute component={UserPage}/>
                <Route path='info' component={UserInfoPage} />
                <Route path='exams' component={UserExamsPage} />
                <Route path='subscription' component={UserSubscriptionPage} />
                <Route path='addsubscription' component={AddSubscriptionPage} />
            </Route>
        </Route>
        <Route component={requiredAuth(OrganizationLayout, roles.Org) }>
            <Route path='organization'>
                <IndexRoute component={OrganizationPage} />
                <Route path='questionbase'>
                    <IndexRoute component={QuestionBasePage} />
                    <Route path='mergedirectory/:id' component={MergeDirectory} />
                    <Route path='mergequestion/:id' component={MergeQuestion} />
                    <Route path='question/:id' component={QuestionReviewPage} />
                </Route>
                <Route path='taskbase'>
                    <IndexRoute component={TaskBasePage} />
                    <Route path='mergedirectory/:id' component={MergeDirectory} />
                    <Route path='mergetask/:id' component={MergeTask} />
                    <Route path='task/:id' component={TaskReviewPage} />
                </Route>
                <Route path='exambase'>
                    <IndexRoute component={ExamBasePage} />
                    <Route path='mergedirectory/:id' component={MergeDirectory} />
                    <Route path='mergeexam/:id' component={MergeExam} />
                    <Route path='exam/:id' component={ExamReviewPage} />
                    <Route path='mergegroup/:id' component={MergeUserGroups} />
                </Route>
                <Route path='clientbase'>
                    <IndexRoute component={ClientBasePage} />
                    <Route path='mergedirectory/:id' component={MergeDirectory} />
                    <Route path='mergeclient/:id' component={MergeClient} />
                    <Route path='createclients' component={CreateClients} />
                    <Route path='userrequests' component={UserRequestsPage} />
                    <Route path='myclients' component={OrgClientsPage} />
                </Route>
            </Route>
        </Route>
    </Route>
) 
