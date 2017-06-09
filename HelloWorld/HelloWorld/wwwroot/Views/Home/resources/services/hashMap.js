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

    isEmpty() {
        return this.data.length === 0;
    }
};
