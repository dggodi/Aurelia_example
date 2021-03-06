﻿import { transient } from 'aurelia-framework';

@transient()
export class HashSet {

    constructor() {
        this.set = {};
        this.count = 0;
    }

    size() {
        return this.count;
    }

    add(key) {
        if (this.contains(key) === false) {
            this.set[key] = true;
            this.count++;
        }
    }

    contains(key) {
        return this.set.hasOwnProperty(key);
    }

    clear() {
        this.set = {}
    }

    remove(value) {
        if (this.contains(value) === true) {
            delete this.set[value];
            this.count--;
        }
    }

    isEmpty() {
        return this.data.length === 0;
    }
};
