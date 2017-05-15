import { bindable } from 'aurelia-framework';
import { inject } from "aurelia-framework";
import { UserData } from "../services/userData";

@inject(UserData)
export class Users {
    authors = []
    selectedAuthors = []
    @bindable finalAuthors = []
    @bindable DowId;

    constructor(userData) {
        this.userData = userData; 
    }

    search() {
        console.log("search " + this.DowId);
        this.userData.search(this.DowId)
            .then(authors => this.authors = authors)
            .catch(error => {
                alert("----- error getting user info -------------");
            });
    }

    add(obj) {
        this.finalAuthors.push(obj)
    }

    DowIdChanged(newValue) {
       if (newValue.length >= 3)
           this.search();
    }
}