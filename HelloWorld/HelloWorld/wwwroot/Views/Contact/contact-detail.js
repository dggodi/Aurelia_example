import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { WebAPI } from './resources/services/web-api';
import { areEqual } from './resources/services/utility';

// syncs selection and the contact details
import { ContactUpdated, ContactViewed } from './messages';

@inject(WebAPI, EventAggregator)
export class ContactDetail {
    constructor(api, ea) {
        this.api = api;
        this.ea = ea;
    }

    // gets invoked right before the router is about to activate the component
    // params       - object passed
    // routeConfig  - same configuration object that you created to configure the router itself
    activate(params, routeConfig) {
        this.routeConfig = routeConfig;

        // returns a Promise and then store the loaded contact in a contact property 
        return this.api.getContactDetails(params.id).then(contact => {
            this.contact = contact;

            // dynamically set the title of the document for this route
            this.routeConfig.navModel.setTitle(contact.firstName);

            this.originalContact = JSON.parse(JSON.stringify(contact));

            this.ea.publish(new ContactViewed(this.contact));
        });
    }

    //  user won't be able to save if the API is in the middle of a request or if there is missing contact information
    get canSave() {
        return this.contact.firstName && this.contact.lastName && !this.api.isRequesting;
    }

    save() {
        this.api.saveContact(this.contact).then(contact => {
            this.contact = contact;
            this.routeConfig.navModel.setTitle(contact.firstName);
            this.originalContact = JSON.parse(JSON.stringify(contact));
            this.ea.publish(new ContactUpdated(this.contact));
        });
    }


    //  called before navigating away from the current component
    //  gives your component an opportunity to cancel navigation, if it desires
    //     determine whether or not the user has made any changes to the data
    //     if changes are made when changing the route display message
    canDeactivate() {
        if (!areEqual(this.originalContact, this.contact)) {
            let result = confirm('You have unsaved changes. Are you sure you wish to leave?');

            if (!result) {
                this.ea.publish(new ContactViewed(this.contact));
            }

            return result;
        }

        return true;
    }
}
