//import {singleton} from 'aurelia-framework';
//import {transient} from 'aurelia-framework';

//@singleton()  single static instance
//@transient()  new instances
export class DataCache {
	constructor() {
		this.data = [];
		console.log("DataCache constructor");
	}
}