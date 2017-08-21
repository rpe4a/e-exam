import {ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE} from '../actions/actionTypes';
import shortid from 'shortid';
import {without} from 'lodash/array'

export default (state = [], action = {}) => {
    switch (action.type) {
        case ADD_FLASH_MESSAGE:
            return [
                ...state,
                {
                    id: shortid.generate(),
                    type: action.message.type,
                    text: action.message.text,
                }
            ]
        case DELETE_FLASH_MESSAGE:
            return without(state, action.message)
        default: 
            return state;
    }
};
