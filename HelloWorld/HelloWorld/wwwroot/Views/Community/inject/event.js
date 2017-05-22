import { inject } from 'aurelia-framework'
import { DataCache } from './dataCache';

@inject(DataCache)
export class Event {

    constructor(cache) {
        cache.data.push('b');
    }

    // receives the context passed down in the compsoed element
	activate(bindingContext) {

        // defines a property to hold the passed context
        this.item = bindingContext;
	}
}