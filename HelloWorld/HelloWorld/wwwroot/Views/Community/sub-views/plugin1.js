import { transient } from 'aurelia-framework';

@transient()
export class PlugIn1 {
	doPlugInStuff() {
		console.log("PlugIn1 doing stuff");
	}
}