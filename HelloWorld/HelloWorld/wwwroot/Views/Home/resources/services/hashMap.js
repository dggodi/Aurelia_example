import { transient } from 'aurelia-framework';

@transient()
export class HashMap {

    constructor() {
        this.set = {};
        this.count = 0;
    }

    size() {
        return this.count;
    }

    add(key, value) {
        if (this.contains(key) === false) {
            this.set[key] = value;
            this.count++;
        }
    }

    put(key, value) {
        this.set[key] = value;
    }

    contains(key) {
        return this.set.hasOwnProperty(key);
    }

    clear() {
        this.set = {}
    }

    remove(key) {
        if (this.contains(key) === true) {
            delete this.set[key];
            this.count--;
        }
    }

    getValue(obj) {
        return this.set[obj];
    }

    update(key, value) {
        if (this.contains(key) === true) {
            set.obj = value;
        }
    }

    isEmpty() {
        return this.data.length === 0;
    }
};
