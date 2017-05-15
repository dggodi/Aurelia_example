import {inject} from "aurelia-framework";
import {UserData} from "../../DataHandlers/userData";

@inject(UserData)
export class List {

    users = [];

    constructor(userData) {        
        this.userData = userData;
    }

    static inject() { return [UserData] }

    activate() {
        //alert("List :: getAll");
        return this.userData
            .getAll()
            .then(users => this.users = users)
            .catch(error => {
                alert("----- error getting userdata -------------");
            });;
    }

}


