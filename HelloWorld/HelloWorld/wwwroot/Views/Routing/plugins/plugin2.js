import {transient} from 'aurelia-framework';

@transient()
export class PlugIn2 {
	doPlugInStuff() {
		console.log("PlugIn2 doing stuff");
	}
}