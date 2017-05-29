import { transient } from 'aurelia-framework';

@transient()
export class HashSet {

    constructor() {
        this.data = {};
        this.count = 0;
    }

    size() {
        return this.count;
    }

    add(value) {
        if (this.contains(value) === false) {
            this.data[value] = true;
            this.count++;
        }
    }

    contains(value) {
        return this.data[value] === true;
    }

    remove(value) {
        if (this.contains(value) === true) {
            delete this.data[value];
            this.count--;
        }
    }
}