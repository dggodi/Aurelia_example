import { WebAPI } from '../services/web-api';
import { inject } from 'aurelia-framework';

@inject(WebAPI)
export class ContactList {
    constructor(api) {
        this.api = api;
        this.contacts = [];
        console.log("ContactList :: constructor");
    }

    //  gets called after both the view-model and the view are created
    //  get list of contacts and store in contacts property so we can bind it in the view
    created() {
        this.api.getContactList().then(contacts => this.contacts = contacts);
    }

    select(contact) {
        this.selectedId = contact.id;

        // allows the action to continue
        return true;
    }
}