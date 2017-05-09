export class Welcome{
    //message = "Hi";
    heading = "Welcome to Home";
	firstName = "John";
	lastName = "Smith";
	
	get fullName(){
		return `${this.firstName} ${this.lastName}`;
	}
	
	submit(){
		alert(`Welcome, ${this.fullName}!`);
	}
}