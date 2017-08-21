import isString from 'lodash/isString';

function _toString(obj) {
    return JSON.stringify(obj);
}

function _verifyKey(key) {
    return key || isString(key);
}

function _verifyObj(obj) {
    return !!obj;
}

class LocalStorageManager {
    constructor() {
        this.storage = window.localStorage;
    }

    removeData(key) {
        if (!_verifyKey(key))
            throw new Error(`The parameter - key is incorrect for localStorage. The key is @:${key}`)

        this.storage.removeItem(key);
    }

    setData(key, obj) {
        if (!_verifyKey(key) || !_verifyObj(obj))
            throw new Error(`The parameters is incorrect for localStorage. The obj is @:${obj} and key is @:${key}`)

        this.storage.setItem(key, _toString(obj));
    }

    getData(key){
        if (!_verifyKey(key))
            throw new Error(`The parameter - key is incorrect for localStorage. The key is @:${key}`)
        
        return JSON.parse(this.storage.getItem(key))
    }

    clearData(){
        this.storage.clear()
    }

}

export default LocalStorageManager;