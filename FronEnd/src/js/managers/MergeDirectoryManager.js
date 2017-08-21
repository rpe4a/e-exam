import {directoryTypes} from '../utils/constants';
import {getMergeDirectories} from '../actions/direcroriesActions';

class QuestionsDirectory {
    constructor() { }

    GetDirectories() {
        return getMergeDirectories.bind(null, directoryTypes.question);
    }

    GetBackWardLinkPath() {
        return '/organization/questionbase';
    }

    GetSuccessMessage() {
        return 'Можете перейти к созданию вопросов.';
    }
}

class TasksDirectory {

    GetDirectories() {
        return getMergeDirectories.bind(null, directoryTypes.task);
    }

    GetBackWardLinkPath() {
        return '/organization/taskbase';
    }

    GetSuccessMessage() {
        return 'Можете перейти к созданию заданий.';
    }
}

class ExamsDirectory {

    GetDirectories() {
        return getMergeDirectories.bind(null, directoryTypes.exam);
    }

    GetBackWardLinkPath() {
        return '/organization/exambase';
    }

    GetSuccessMessage() {
        return 'Можете перейти к регистрации пользователей.';
    }
}

class ClientsDirectory {

    GetDirectories() {
        return getMergeDirectories.bind(null, directoryTypes.client);
    }

    GetBackWardLinkPath() {
        return '/organization/clientbase';
    }

    GetSuccessMessage() {
        return 'Можете перейти к созданию и/или регистрации пользователей.';
    }
}

class MergeDirectoryManager {
    static Create(type) {
        switch (+type) {
            case directoryTypes.question:
                return new QuestionsDirectory();
            case directoryTypes.task: 
                return new TasksDirectory();
            case directoryTypes.exam: 
                return new ExamsDirectory();
            case directoryTypes.client: 
                return new ClientsDirectory();
            default:
                throw new Error(`MergeDirectoryManager - founded wrong type of directory @:${type}`)
        }
    }
}

export default MergeDirectoryManager;