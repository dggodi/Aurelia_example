export class Event {
    // receives the context passed down in the compsoed element
	activate(bindingContext) {
        // defines a property to hold the passed context
        this.item = bindingContext;
	}
}